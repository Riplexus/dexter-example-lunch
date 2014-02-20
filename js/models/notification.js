define([
    'models/dXModel'
], function(
    dXModel
) {

    /**
     *
     *
     * @class Notification
     */

    return dXModel.extend(/** @lends Notification.prototype */{
        defaults: {
            message: ''
        }
    });
});