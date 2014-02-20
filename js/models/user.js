define([
    'models/dXModel'
], function(
    dXModel
) {

    /**
     *
     *
     * @class User
     */

    return dXModel.extend(/** @lends User.prototype */{
        defaults: {
            firstName: '',
            lastName: '',
            gravatar: ''
        }
    });
});