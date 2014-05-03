define([
    'dX/Model'
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