define([
    'views/dXView',
    'collections/notifications',
    'shim!Function.prototype.bind'
], function(
    dXView,
    NotificationsCollection
) {

    /**
     * 
     *  
     * @class NotificationsView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXView.extend(/** @lends NotificationsView.prototype */{
        dXName: 'notifications',
        collection: new NotificationsCollection(),

        /**
         * 
         */
        
        bindings: {
            '.notifications': 'collection:$collection'    
        }
    });
});