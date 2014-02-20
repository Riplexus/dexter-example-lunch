define([
    'models/dXModel'
], function(
    dXModel
) {

    /**
     *
     *
     * @class Lunch
     */

    return dXModel.extend(/** @lends Lunch.prototype */{
        defaults: {
            user: null,
            amount: 0
        }
    });
});