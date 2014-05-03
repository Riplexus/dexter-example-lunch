define([
    'dX/ItemView'
], function(
    dXItemView
) {

    /**
     *
     *
     * @class NotificationItemView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXItemView.extend(/** @lends NotificationItemView.prototype */{
        dXName: 'i-notification',

        /**
         * 
         */

        bindings: {
            'span': 'text:message'
        }
    });
});