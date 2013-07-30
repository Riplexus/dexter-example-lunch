/**
 *
 */

define([
    'libs/debug',
    'jquery',
    'backbone',
    'configs/routes.conf',
    'viewLoader!',
    'libs/applyMaybe',
    'libs/intersect',
    'libs/debugBar',
    'libs/getUrlVars',
    'shim!Object.keys',
], function(debug, $, Backbone, routes, viewList, applyMaybe, intersect, debugBar) {
    debug = debug('DX');

    var AppRouter = Backbone.Router.extend({
        routes: routes
    });

    return {

        /**
         * Stores the Backbone.Router object.
         */
        obj: null,

        /**
         * Stores the current, route-linked view.
         */
        currentView: null,

        viewCache: null,

        viewList: null,

        /**
         *
         */
        init: function() {
            var view, viewName, self, params, path;

            self = this;
            self.obj = new AppRouter;
            self.viewCache = {};
            self.viewList = viewList;

            /*
             * Match the route to his corresponding view and
             * render it dynamically.
             */

            for (viewName in self.viewList) {
                if (self.viewList.hasOwnProperty(viewName)) {
                    (function(viewName) {

                        self.obj.on('route:'+viewName, function() {

                            params = Array.prototype.slice.call(arguments);
                            path = Backbone.history.fragment;
                            self.currentPath = path;

                            debug.colored('navigate to /'+path+' \n    #'+viewName+' ['+params+']', '#7dd');

                            if (self.currentView !== null) {
                                debug.colored('leave #'+self.currentView.dXName, '#aaddaa');
                                applyMaybe(self.currentView, 'leave');
                            }

                            if (!(viewName in self.viewCache)) {
                                view = new self.viewList[viewName]();
                                view.router = self;
                                self.viewCache[viewName] = view;
                            } else {
                                view = self.viewCache[viewName];
                            }

                            view.dXParameters = params;

                            /*
                             * Render desired view with his subviews afterwards.
                             */

                            view.render.call(view, function routerRender() {
                                self.currentView = view;
                            });
                        });

                    })(viewName);
                }
            }

            /*
             * Start backbone navigation.
             */

            if (Modernizr.history) {
                Backbone.history.start({ pushState: true });
            } else {
                Backbone.history.start();
            }

            /*
             * Prevent page reload on link click.
             */

            $(document).on('click', 'a[href^="/"]', function(event) {
                var href, url;

                href = $(event.currentTarget).attr('href');
                if (!event.altKey && !event.ctrlKey &&
                    !event.metaKey && !event.shiftKey) {

                    event.preventDefault();
                    url = href.replace(/^\//,'').replace(/#!/, '');
                    self.obj.navigate(url, { trigger: true });
                }
            });

            /*
             * Debugging tool
             */

            if ($.getUrlVar('debug')) {
                debugBar(self.viewCache);
            }
        },

        /**
         * todo: move to view prototype
         *
         * @param viewList
         * @param list
         */
        getSubViewList: function(viewList, list) {
            var remaining, i, subView;

            remaining = [];

            for (i=viewList.length; i--;) {
                subView = this.viewCache[viewList[i]];
                if (!subView) {
                    subView = new this.viewList[viewList[i]]();
                    subView.router = this;
                    this.viewCache[viewList[i]] = subView;
                }

                list[viewList[i]] = subView;
                remaining = remaining.concat(subView.dXSubViews);
            }

            if (remaining.length > 0) {
                this.getSubViewList(remaining, list);
            }
        },

        /**
         *
         * @param view
         * @param [callback]
         */
        loadSubViews: function(view, callback) {
            debug.colored('load subviews of #'+view.dXName+' via router', '#9394cc');

            var i, lastSubViews, subViews, keys,
                intersection, remainingViews, leavingViews, enteringViews;

            lastSubViews = {};
            subViews = {};
            callback = callback || function() {};

            if (this.currentView) {
                this.getSubViewList(this.currentView.dXSubViews, lastSubViews);
            }
            this.getSubViewList(view.dXSubViews, subViews);

            /*
             * Figure out, which subview is new, will be obsolete or remains in the application.
             */

            intersection = intersect(lastSubViews, subViews);

            remainingViews = intersection[0];
            leavingViews = intersection[1];
            enteringViews = intersection[2];

            /*
             * Move html from remaining subviews to new container.
             */

            if (Object.keys(remainingViews).length > 0) {
                debug.colored('remaining subviews: '+Object.keys(remainingViews), '#9394cc');
            }

            for (i in remainingViews) {
                if (remainingViews.hasOwnProperty(i)) {
                    remainingViews[i].$el = $('#'+remainingViews[i].dXName);

                    debug.colored('get cached html for #'+remainingViews[i].dXName, 'lightgray');

                    remainingViews[i].$el.html(remainingViews[i].$cachedEl);

                }
            }

            /*
             * Trigger leave function.
             */

            if (Object.keys(leavingViews).length > 0) {
                debug.colored('leaving subviews: '+Object.keys(leavingViews), '#9394cc');
            }

            for (i in leavingViews) {
                if (leavingViews.hasOwnProperty(i)) {
                    applyMaybe(leavingViews[i], 'leave');
                }
            }

            /*
             * Render new subviews. This has to be synchronous, because of the possible dependency
             * on DOM nodes. Trigger enter function afterwards.
             */

            if (Object.keys(enteringViews).length === 0) {
                callback();

            } else {
                debug.colored('new subviews: '+Object.keys(enteringViews), '#9394cc');

                this.renderViewsSync(jQuery.extend({}, enteringViews), function() {
                    keys = Object.keys(enteringViews);

                    for (i=keys.length; i--;) {
                        applyMaybe(enteringViews[keys[i]], 'enter');
                    }

                    callback();
                });
            }
        },

        /**
         *
         * @param views
         * @param callback
         */
        renderViewsSync: function renderViewsSync(views, callback) {
            var view, keys, self;

            keys = Object.keys(views);
            self = this;

            if (keys.length === 0) {
                callback();
                return;
            }

            view = views[keys[0]];

            view.$el = $('#'+view.dXName);

            view.render.call(view, function subViewRendered() {
                delete views[keys[0]];
                self.renderViewsSync(views, callback);
            });
        }
    };

});