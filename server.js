//********************************************************************
//* file : server.js
//* https:localhost:5001
//*
//********************************************************************

const express = require('express');
const http = require('http');
const DID_SIOP = require('did-siop');

var app = express();

app.use('/',express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.redirect('/index');
});

app.get('/index',indexPage);
app.get('/home',homePage);
app.get('/get_request_object',getRequestObject);

function indexPage(req, res, next) {
    console.log("indexPage Invoked");
    res.sendFile('index.html', { root: __dirname  + '/' });
}

function homePage(req, res, next) {
    console.log("homePage Invoked");
    res.sendFile('home.html', { root: __dirname  + '/' });
}

async function getRequestObject(req, res, next) {
    console.log("getRequestObject Invoked");
    var requestObject;
    requestObject = await generateRequestObject();
    res.send(JSON.stringify({'reqObj':requestObject}));
}

async function generateRequestObject(){
    console.log('startProcess');
    let request;

    // siop_rp = await DID_SIOP.RP.getRP(
    //     'localhost:5001/home', // RP's redirect_uri
    //     'did:key:2f6jDVaGpBqoimg8GAKb9FiESetiy4FLDtwNXEoUhn6qabHEjWsyx65twBDs2q3wrrjXvmNjJwUirWZsJWBPJjYjSn9DWCWrGWReKutxHgCyRjPKQMfzEJNvh3Tr3ZPYgXU8e8pRRnAB98tStraqVVkr4LFFqK5WMnkguFv3GJixrE9Fx4', // RP's did
    //     {
    //         "jwks_uri": "https://uniresolver.io/1.0/identifiers/did:key:2f6eCjtFootvZEahvkQZb3vnVbVzJibSgKudXvMYZq5XzBBQSFCksqUqhJtHAQ6LeVV9S4BwAnk1JjouNQQc3cdoELgTC4uGdyvXNrm1L6D1uYRybcMVihJvEUiy3J91vbvTTpXqN84Bot5gHkGnmH6t1YYrh9QG8z5MqxpQycCwapw3qA;transform-keys=jwks",
    //         "id_token_signed_response_alg": ["ES256K", "EdDSA", "RS256"]
    //     },
    //     {
    //         "@context": [
    //             "https://w3id.org/did/v0.11"
    //         ],
    //         "id": "did:key:2f6jDVaGpBqoimg8GAKb9FiESetiy4FLDtwNXEoUhn6qabHEjWsyx65twBDs2q3wrrjXvmNjJwUirWZsJWBPJjYjSn9DWCWrGWReKutxHgCyRjPKQMfzEJNvh3Tr3ZPYgXU8e8pRRnAB98tStraqVVkr4LFFqK5WMnkguFv3GJixrE9Fx4",
    //         "publicKey": [
    //             {
    //                 "id": "did:key:2f6jDVaGpBqoimg8GAKb9FiESetiy4FLDtwNXEoUhn6qabHEjWsyx65twBDs2q3wrrjXvmNjJwUirWZsJWBPJjYjSn9DWCWrGWReKutxHgCyRjPKQMfzEJNvh3Tr3ZPYgXU8e8pRRnAB98tStraqVVkr4LFFqK5WMnkguFv3GJixrE9Fx4#veri-key1",
    //                 "type": "Secp256k1VerificationKey2018",
    //                 "controller": "did:key:2f6jDVaGpBqoimg8GAKb9FiESetiy4FLDtwNXEoUhn6qabHEjWsyx65twBDs2q3wrrjXvmNjJwUirWZsJWBPJjYjSn9DWCWrGWReKutxHgCyRjPKQMfzEJNvh3Tr3ZPYgXU8e8pRRnAB98tStraqVVkr4LFFqK5WMnkguFv3GJixrE9Fx4",
    //                 "ethereumAddress": "0x027b83ad6afb1209f3c82ebeb08c0c5fa9bf6724548506f2fb4f991e2287a77090",
    //                 "publicKeyHex": "027b83ad6afb1209f3c82ebeb08c0c5fa9bf6724548506f2fb4f991e2287a77090"
    //             }
    //         ],
    //         "authentication": [
    //             {
    //                 "type": "Secp256k1VerificationKey2018",
    //                 "publicKey": "027b83ad6afb1209f3c82ebeb08c0c5fa9bf6724548506f2fb4f991e2287a77090"
    //             }
    //         ]
    //     }
    // );
    siop_rp = await DID_SIOP.RP.getRP(
        'localhost:5001/home', // RP's redirect_uri
        'did:key:z6Mkjs1Zf4aLVQkBRvpBowYQXWSWwp8Z8H58539WVLc4AsTB', // RP's did
        {
            "jwks_uri": "https://uniresolver.io/1.0/identifiers/did:key:z6Mkjs1Zf4aLVQkBRvpBowYQXWSWwp8Z8H58539WVLc4AsTB;transform-keys=jwks",
            "id_token_signed_response_alg": ["ES256K-R", "EdDSA", "RS256"]
        }
    );
    console.log('Got RP instance ....');
    // siop_rp.addSigningParams(
    //     '97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a', // Private key
    //     'did:key:2f6jDVaGpBqoimg8GAKb9FiESetiy4FLDtwNXEoUhn6qabHEjWsyx65twBDs2q3wrrjXvmNjJwUirWZsJWBPJjYjSn9DWCWrGWReKutxHgCyRjPKQMfzEJNvh3Tr3ZPYgXU8e8pRRnAB98tStraqVVkr4LFFqK5WMnkguFv3GJixrE9Fx4#veri-key1',
    //     // Corresponding authentication method in RP's did document (to be used as kid value for key)
    //     DID_SIOP.KEY_FORMATS.HEX, //Format in which the key is supplied. List of values is given below
    //     DID_SIOP.ALGORITHMS['ES256K']
    // );
    siop_rp.addSigningParams(
        'zs2NsqieKe3ttzJ8a9yjuNBeDF5Pet8SQUF35aC7mhm3UxTJXWfdWSYXFUmnLFbWZ98SPCWS2mncxVHKzVivXiM', // Private key
        'did:key:z6Mkjs1Zf4aLVQkBRvpBowYQXWSWwp8Z8H58539WVLc4AsTB', // Corresponding authentication method in RP's did document (to be used as kid value for key)
        DID_SIOP.KEY_FORMATS.BASE58, //Format in which the key is supplied. List of values is given below
        DID_SIOP.ALGORITHMS['ES256K-R']
    );
    console.log('RP SigningParams added ...');
    request = await siop_rp.generateRequest();

    console.log('Request generated ...', request);
    return request;
}

const port = process.env.PORT || 5001;
http.createServer(app).listen(port, () => {
  console.log('Listening on ', port);
});
