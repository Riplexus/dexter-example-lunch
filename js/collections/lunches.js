define([
    'collections/dXCollection',
    'models/lunch',
    'views/i-lunch',
    'shim!Function.prototype.bind'
], function(
    dXCollection,
    LunchModel,
    LunchView
) {

    /**
     * 
     * 
     * @class Lunches
     */
    
    return dXCollection.extend(/** @lends Lunches.prototype */{
        model: LunchModel,
        view: LunchView,

        /**
         * 
         */
        
        initialize: function() {
            dXCollection.prototype.initialize.call(this);
            
            this.dXPipe.on('lunches/add', this.add.bind(this));
            this.dXPipe.on('lunches/remove', this.remove.bind(this));
        }
    });
});