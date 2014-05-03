define([
    'dX/View',
    'collections/users'
], function(
    dXView,
    UsersCollection
) {

    /**
     * 
     *  
     * @class UsersView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXView.extend(/** @lends UsersView.prototype */{
        dXName: 'users',
        collection: new UsersCollection(),

        /**
         * 
         */
        
        dXSubViews: [
            'users__create'
        ],

        /**
         * 
         */
        
        bindings: {
            '.list': 'collection:$collection',
            '.empty': 'toggle:not(length($collection))'
        }
    });
});