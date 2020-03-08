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
  credential: firebase.credential.cert(serviceAccount)
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
  console.log("----------------------");
  console.log(functions.config().fbserviceaccount);
  console.log("----------------------");
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
