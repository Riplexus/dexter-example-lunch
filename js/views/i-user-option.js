define([
    'dX/ItemView'
], function(
    dXItemView
) {

    /**
     *
     *
     * @class UserOptionItemView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXItemView.extend(/** @lends UserOptionItemView.prototype */{
        dXName: 'i-user-option',

        /**
         * 
         */
        
        bindings: {
            'option': 'text:fullName,attr:{value:id}'
        },

        /**
         * 
         */
        
        computeds: {
            fullName: function() {
                var firstName = this.getBinding('firstName'),
                    lastName = this.getBinding('lastName');
                
                return firstName+' '+lastName;
            }
        }
    });
});