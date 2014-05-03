define([
    'dX/ItemView',
    'libs/md5'
], function(
    dXItemView,
    md5
) {

    /**
     * 
     *  
     * @class LunchItemView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXItemView.extend(/** @lends LunchItemView.prototype */{
        dXName: 'i-lunch',

        /**
         * 
         */
        
        bindings: {
            '.amount': 'text:amount',
            '.userName': 'text:userName',
            '.avatar': 'attr:{style:background(gravatar)}'
        },

        /**
         * 
         */
        
        computeds: {
            userName: function() {
                var user = this.getBinding('user');
                return user? user.get('firstName')+' '+user.get('lastName') : '';
            },
            gravatar: function() {
                var user = this.getBinding('user');
                return user? user.get('gravatar') : '';
            }
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
            'click button': 'removeLunch'
        },

        /**
         * 
         */
        
        removeLunch: function() {
            this.dXPipe.emit('lunches/remove', this.model);
        }
    });
});