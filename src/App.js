import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app();
}

function App() {
  // object with multiple values
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  }) 
  // Google sign in authentication
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        // console.log(res);
        // console.log(displayName, photoURL, email);
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }
  const handleSignOut = () => {
    // console.log('singed out');
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
      })
      .catch(err => {

      })
  }

  const handleBlur = (e) => {
    // detecting the field and value
    // console.log(e.target.name, e.target.value);
    // if (e.target.name === 'email') {
    //   const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
    //   console.log(isEmailValid);
    // debugger;  to debug

    // form validation checking
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isFormValid);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{3}/.test(e.target.value);
      // both conditions has to be true
      isFieldValid = (isPasswordValid && passwordHasNumber);
    }
    // if the condition is true then it will set the new email and pass of the user
    if(isFieldValid){
      // [... coping array, adding new item] 
      // [...card, newItem]
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = () => {

  }

  return (
    <div className="App">
      {
        // ? True Condition : false condition
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>Our Own Authentication</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <form onSubmit={handleSubmit}>
        <input type="text" onBlur={handleBlur} name="name" id="" placeholder="Your name" required/>
        <br/>
        <input name="email" onBlur={handleBlur} type="text" id="" placeholder="Your Email" required />
        <br />
        <input name="password" onBlur={handleBlur} type="password" id="" placeholder="Your Password" required />
        <br />
        {/* <button>Submit</button> */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
