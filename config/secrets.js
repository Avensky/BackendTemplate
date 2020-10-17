// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '893727407775672', // your App ID
        'clientSecret'  : 'a3fe93b0b189f4d3170121aa51400926', // your App Secret
        'callbackURL'   : 'http://localhost:5000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v3.2/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : 'ysjvxmJGDCqtbgWrUOUPngt1s',
        'consumerSecret'    : 'jDqHbJOQRtCOzJN9hTwILnpf4Im9hHNgnKO4D8a8XZjeNWoZVH',
        'callbackURL'       : 'http://localhost:5000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '767117075379-gocbqackf3c6pgri2562rg2bu5mk32he.apps.googleusercontent.com',
        'clientSecret'  : 'quQROJiCOQLAFEW0M9p-At79',
        'callbackURL'   : 'http://localhost:5000/auth/google/callback'
    }

};