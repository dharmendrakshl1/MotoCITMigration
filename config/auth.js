// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '355143334507436', // your App ID
        'clientSecret'    : 'b589bf974c044f16e633ca665acaa1ea', // your App Secret
        'callbackURL'     : 'http://ec2-52-27-39-13.us-west-2.compute.amazonaws.com:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '9141745574-28o54bt7nrdeu44db424o6c1uaqstnjv.apps.googleusercontent.com',
        'clientSecret'     : 'rQRMQzgOi7mgod1qdREvVupS',
        'callbackURL'      : 'http://ec2-52-27-39-13.us-west-2.compute.amazonaws.com:8080/auth/google/callback'
    }

};
