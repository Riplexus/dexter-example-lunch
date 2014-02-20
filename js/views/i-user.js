define([
    'views/dXItem',
    'libs/md5'
], function(
    dXItemView,
    md5
) {

    /**
     *
     *
     * @class UserItemView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXItemView.extend(/** @lends UserItemView.prototype */{
        dXName: 'i-user',

        /**
         * 
         */

        bindings: {
            '.firstName': 'text:firstName',
            '.lastName': 'text:lastName',
            '.avatar': 'attr:{style:background(gravatar)}'
        },

        /**
         * 
         */
        
        bindingFilters: {
            background: function(gravatar) {
                return 'background-image: url(http://www.gravatar.com/avatar/'+
                    md5(gravatar.toLowerCase())+')';
            }
        },

        /**
         * 
         */

        events: {
            'click button': 'removeUser'
        },

        /**
         * 
         */

        removeUser: function() {
            this.dXPipe.emit('users/remove', this.model);
        }
    });
});