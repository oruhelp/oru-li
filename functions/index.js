const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const express = require("express");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");

var serviceAccount = require("./serviceAccountKey.json");

app.use(cors());
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(
    {
      "type": functions.config().fbserviceaccount.type,
      "project_id": functions.config().fbserviceaccount.project_id,
      "private_key_id": functions.config().fbserviceaccount.private_key_id,
      "private_key": functions.config().fbserviceaccount.private_key.replace(/\\n/g, '\n'),
      "client_email": functions.config().fbserviceaccount.client_email,
      "client_id": functions.config().fbserviceaccount.client_id,
      "auth_uri": functions.config().fbserviceaccount.auth_uri,
      "token_uri": functions.config().fbserviceaccount.token_uri,
      "auth_provider_x509_cert_url": functions.config().fbserviceaccount.auth_provider_x509_cert_url,
      "client_x509_cert_url": functions.config().fbserviceaccount.client_x509_cert_url
  })
});

function randomHash(hashLength) {
  var final = "";
  var set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < hashLength; i++) {
    final += set.charAt(Math.floor(Math.random() * set.length));
  }
  return final;
}

app.get("/secret", (request, response) => {
  return response.end(JSON.stringify(process.env.REACT_APP_GA));
});

app.post("/api/shorturl", urlencodedParser, function(req, res) {
  let alias = req.body.alias || randomHash(5);

  return firebaseApp
    .firestore()
    .collection("shortUrls")
    .doc(alias)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return firebaseApp
          .firestore()
          .collection("shortUrls")
          .doc(alias)
          .set({
            longUrl: req.body.long_url
          })
          .then(resp => {
            return res.end(JSON.stringify({ alias: alias }));
          })
          .catch(err => res.end(JSON.stringify(err)));
      } else {
        return response.end("Not Available, try again");
      }
    })
    .catch(err => {
      return response.end(JSON.stringify(err));
    });
});

app.get("/:alias", (request, response) => {
  return firebaseApp
    .firestore()
    .collection("shortUrls")
    .doc(request.params.alias)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return response.end("404");
      } else {
        return response.redirect(doc.data().longUrl);
      }
    })
    .catch(err => {
      return response.end(JSON.stringify(err));
    });
});

exports.app = functions.https.onRequest(app);
