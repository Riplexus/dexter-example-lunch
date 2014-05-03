define([
    'dX/Model'
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
        },
        urlRoot: 'http://euve21281.vserver.de/lunchies/user/'
    });
});