define([
    'models/dXModel'
], function(
    dXModel
) {

    /**
     *
     *
     * @class State
     */

    return dXModel.extend(/** @lends State.prototype */{
        defaults: {
            isOpen: ''
        }
    });
});