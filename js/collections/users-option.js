define([
    'collections/users',
    'views/i-user-option'
], function(
    UsersCollection,
    UserOptionView
) {

    /**
     * 
     * 
     * @class UsersOption
     */
    
    return UsersCollection.extend(/** @lends UsersOption.prototype */{
        view: UserOptionView
    });
});