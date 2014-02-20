define([
    'views/dXView',
    'models/state'
], function(
    dXView,
    State
) {

    /**
     * 
     *  
     * @class UsersCreateView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXView.extend(/** @lends UsersCreateView.prototype */{
        dXName: 'users__create',
        
        model: new State(),

        /**
         * 
         */
        
        bindings: {
            'input, button span': 'toggle:isOpen'
        },

        /**
         * 
         */
        
        events: {
            'click button': 'add'
        },

        /**
         * 
         */
        
        add: function() {
            var $firstName = this.$el.find('.firstName'),
                $lastName = this.$el.find('.lastName'),
                $gravatar = this.$el.find('.gravatar');
            
            if (!this.model.get('isOpen')) {
                this.model.set('isOpen', true);
                $firstName[0].focus();
                return;
            }
            
            var firstName = $firstName.val(),
                lastName = $lastName.val(),
                gravatar = $gravatar.val();
            
            if (!firstName) {
                this.dXPipe.emit('error', 'Please enter at least the first name');
                $firstName[0].focus();
                return;
            }
            
            this.dXPipe.emit('users/add', {
                id: new Date().getTime(),
                firstName: firstName,
                lastName: lastName || '',
                gravatar: gravatar || ''
            });
             
            this.model.set('isOpen', false);
            $firstName.val('');
            $lastName.val('');
            $gravatar.val('');
        }
    });
});