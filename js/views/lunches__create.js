define([
    'views/dXView',
    'models/state',
    'collections/users-option'
], function(
    dXView,
    State,
    UsersOption
) {

    /**
     * 
     * 
     * @class LunchesCreateView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXView.extend(/** @lends LunchesCreateView.prototype */{
        dXName: 'lunches__create',
        
        model: new State(),
        collection: new UsersOption(),

        /**
         * 
         */
        
        bindings: {
            'select': 'collection:$collection',
            '.selectwrapper, input, button span': 'toggle:isOpen'
        },

        /**
         * 
         */
        
        initialize: function() {
            dXView.prototype.initialize.call(this);

            // SELECT style hack
            var $select = this.$el.find('select'),
                $p = $select.parent().find('p'),
                update = function() {
                    var text = $select.find('option:selected').text();
                    $p.html(text? text+' <i class="fa fa-sort-down"></i>':'No buyer');
                };

            update();
            $select.change(update);
            this.dXPipe.on('users/add', update);
            this.dXPipe.on('users/remove', update);
            // SELECT style hack end
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
            var $amount = this.$el.find('input'),
                $select = this.$el.find('select');
            
            if (!this.model.get('isOpen')) {
                this.model.set('isOpen', true);
                $amount[0].focus();
                return;
            }
            
            var amount = $amount.val(),
                userId = $select.val(),
                user = this.collection.get(userId);
            
            if (!amount) {
                this.dXPipe.emit('error', 'Please enter the cash value for today\'s lunch');
                $amount[0].focus();
                return; 
            }
            if (!user) {
                this.dXPipe.emit('error', 'Please create a buyer first');
                return;
            }
             
            this.dXPipe.emit('lunches/add', {
                user: user,
                amount: amount
            });
            
            this.model.set('isOpen', false);
            $amount.val('');
        }
    });
});