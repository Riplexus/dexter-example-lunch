define([
    'dX/Collection',
    'models/notification',
    'views/i-notification',
    'dX/Shim!Function.prototype.bind'
], function(
    dXCollection,
    NotificationModel,
    NotificationView
) {

    /**
     * 
     * 
     * @class Notifications
     */
    
    return dXCollection.extend(/** @lends Notifications.prototype */{
        model: NotificationModel,
        view: NotificationView,

        /**
         * 
         */
        
        initialize: function() {
            dXCollection.prototype.initialize.call(this);
            
            /*
             *
             */
            
            this.dXPipe.on('error', function(message) {
                this.add({ message: message });
            }.bind(this));
            
            /*
             *
             */
            
            this.on('add', function(model) {
                setTimeout(function() {
                    this.remove(model);
                }.bind(this), 3000);
            });
        }
    });
});