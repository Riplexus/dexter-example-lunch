define([
    'views/dXView',
    'collections/lunches'
], function(
    dXView,
    LunchesCollection
) {

    /**
     * 
     *  
     * @class LunchesView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXView.extend(/** @lends LunchesView.prototype */{
        dXName: 'lunches',
        collection: new LunchesCollection(),

        /**
         * 
         */
        
        dXSubViews: [
            'lunches__create'
        ],

        /**
         * 
         */
        
        bindings: {
            '.list': 'collection:$collection',
            '.empty': 'toggle:not(length($collection))'
        }
    });
});