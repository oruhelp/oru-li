const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const express = require("express");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const {template1} = require("./receipt-template");

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


app.post("/api/shorturl/receipt", urlencodedParser, function(req, res) {
  let alias = randomHash(5);

  return firebaseApp
    .firestore()
    .collection("receipts")
    .doc(alias)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return firebaseApp
          .firestore()
          .collection("receipts")
          .doc(alias)
          .set(req.body)
          .then(resp => {
            return res.end(JSON.stringify({ alias: "r-" + alias }));
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
  var input1 = {
    sender: {
      name: "Karthikeyan",
      role: "Volunteer",
      phoneNumber: "+91-7708662218",
      email: "karthikeyan@gmail.com"
    },
    approver: {
      name: "Surya Kumar",
      role: "President",
      phoneNumber: "+91-1234567890",
      email: "suryakmr@gmail.com"
    },
    receiver: {
      name: "Raj Mohan",
      phoneNumber: "+91-9659657101",
      email: "rajfml@gmail.com"
    },
    org: {
      name: "Aarathy Charitable Trust",
      addressLine1: "10, VGP Santhi Nagar",
      addressLine2: "Pallikaranai, Chennai",
      countryAndPincode: "India, 600100",
      phoneNumber: "+91-0987654321",
      email: "info@aarathy.org",
      website: "www.aarathy.org"
    },
    donation: {
      id: "23423243",
      amount: "1000",
      date: "18/Mar/2020",
      description: "This is donated for student education",
      footer: "Thank you for the donation."
    }
  };
  if(request.params.alias.toLowerCase().startsWith('r-')) {
    return response.send(template1.replace("___###input###___", JSON.stringify(input1)));
  } else {
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
  }
});

exports.app = functions.https.onRequest(app);
