const firebaseConfig = {
    apiKey: "AIzaSyDzS1hzgx1YqIeIzvBiGAfHiIA6_uDTVcM",
    authDomain: "calculoconsumo.firebaseapp.com",
    projectId: "calculoconsumo",
    storageBucket: "calculoconsumo.appspot.com",
    messagingSenderId: "822522250609",
    appId: "1:822522250609:web:6c118542c2544cda4122d0",
    measurementId: "G-04KV3T20ES"
}

const app = firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());
//firebase.auth().currentUser.uid

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().useDeviceLanguage();

document.querySelector("#customBtn").addEventListener('click', e => {
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log('credential: '+credential)
    console.log('token: '+token)
    console.log('user: '+user)    
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  document.querySelector("#customBtn").style.display = 'none'
})
/* logg out
firebase.auth().signOut().then(() => {
    // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
*/