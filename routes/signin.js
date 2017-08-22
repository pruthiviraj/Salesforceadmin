// Include Express
var express = require('express');
var jsforce = require('jsforce');
// Initialize the Router
var router = express.Router();
var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com'
});

router.post('/', function (req, res) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password + 'ZhZ0lSHapUPVPZ9Q8q9yU8V2';
    conn.login(username, password, function (err, userInfo) {
        if (err) {
            res.json({
                status: false,
                msg: 'Not connected to Salesforce'
            });
            return console.error(err);
        }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log(conn.accessToken);
        console.log(conn.instanceUrl);
        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);
        // ...
        res.json({
            status: true,
            msg: 'Successfully connected to Salesforce'
        });
    });
});

router.post('/getObjects', function (req, res) {
    var fullNames = ['Account', 'Contact'];
    conn.metadata.read('CustomObject', fullNames, function (err, metadata) {
        if (err) {
            console.error(err);
        }
        res.json({
            metadata: metadata
        });
        // for (var i = 0; i < metadata.length; i++) {
        //     var meta = metadata[i];
        //     console.log("Full Name: " + meta.fullName);
        //     console.log("Fields count: " + meta.fields.length);
        //     console.log("Sharing Model: " + meta.sharingModel);
        // }
    });
});


// Expose the module
module.exports = router;