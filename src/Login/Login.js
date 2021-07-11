import React, { useContext } from 'react';
import "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseConfig from '../firebase.config';
import firebase from "firebase/app";

var provider = new firebase.auth.GoogleAuthProvider();

const Login = () => {

  // useContext imported from createContext where declare.
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  // Auth redirect.
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const { displayName, email } = result.user;
        const signedInUser = { displayName, email };
        setLoggedInUser(signedInUser);
        authToken();
        history.replace(from);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('Error:', errorCode, errorMessage, email, credential);
      });

    const authToken = () => {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          console.log(idToken);
          sessionStorage.setItem('authToken', idToken) 
        }).catch(function (error) {
          
        });
    }
  }


  return (

    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "350px" }}>
        <Form>
          <h3 className="text-center mb-4"> Sign in with google </h3>
          <Button className="w-100 text-center mt-2" onClick={handleGoogleSignIn}>Google Sign in</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;