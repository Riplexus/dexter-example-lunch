define([
    'dX/Model'
], function(
    dXModel
) {

    /**
     *
     *
     * @class Lunch
     */

    return dXModel.extend(/** @lends Lunch.prototype */{
        defaults: {
            userId: null,
            user: null,
            amount: 0
        },
        
        initialize: function() {
            dXModel.prototype.initialize.call(this);
            this.set('userId', this.get('user').get('id'));
            
            console.log(this);
        }
    });
});