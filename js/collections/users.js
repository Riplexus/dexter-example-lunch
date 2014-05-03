define([
    'dX/Collection',
    'models/user',
    'views/i-user'
], function(
    dXCollection,
    UserModel,
    UserView
) {

    /**
     * 
     * 
     * @class Users
     */
    
    return dXCollection.extend(/** @lends Users.prototype */{
        model: UserModel,
        view: UserView,

        /**
         * 
         */

        initialize: function() {
            dXCollection.prototype.initialize.call(this);
            
            this.dXPipe.on('users/add', this.add.bind(this));
            this.dXPipe.on('users/remove', this.remove.bind(this));
        },
        
        urlRoot: 'http://euve21281.vserver.de/lunchies/users'
    });
});