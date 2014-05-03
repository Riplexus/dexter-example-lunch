define(function() {

    return {
        preLoad: {
            views: [
                'i-lunch',
                'i-user',
                'i-user-option',
                'i-notification'
            ],
            templates: [
                'loading'
            ]
        },

        global: [
            'notifications',
            'users'
        ]
    };

});