// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '355143334507436', // your App ID
        'clientSecret'    : 'b589bf974c044f16e633ca665acaa1ea', // your App Secret
        'callbackURL'     : 'http://uatlb-1950226449.us-west-2.elb.amazonaws.com/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://uatlb-1950226449.us-west-2.elb.amazonaws.com/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '9141745574-28o54bt7nrdeu44db424o6c1uaqstnjv.apps.googleusercontent.com',
        'clientSecret'     : 'rQRMQzgOi7mgod1qdREvVupS',
        'callbackURL'      : 'http://uatlb-1950226449.us-west-2.elb.amazonaws.com/auth/google/callback'
    }

};
