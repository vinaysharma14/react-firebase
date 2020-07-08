import React, { useEffect, useCallback, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";

// firebase initialization when App mounts
firebase.initializeApp({
  apiKey: "AIzaSyAWBBLDXcJcTZl6p4DFzSk-CFGIO6TZFSc",
  authDomain: "xxx",
  databaseURL: "xxx",
  projectId: "fir-app-da285",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
  measurementId: "xxx",
});

// added reCaptchaVerifier type declaration to Window variable
declare global {
  interface Window {
    reCaptchaVerifier: unknown;
  }
}

export default () => {
  const [
    verifier,
    setVerifier,
  ] = useState<firebase.auth.RecaptchaVerifier | null>(null);

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setVerifier(
      new firebase.auth.RecaptchaVerifier("recaptcha", {
        // size: "invisible",
        callback: () => {
          /**
           *It is getting called.
           */
          console.log("Not a robot.");
        },
      })
    );
  }, []);

  const handleSubmit = async () => {
    console.log(`Got phone number as -> ${phoneNumber}`);

    try {
      if (verifier) {
        const response = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, verifier);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <input />
        <button id="login-button">Submit</button>
      </form> */}
      <input
        type="text"
        onChange={(event) => setPhoneNumber(event.target.value)}
      ></input>
      <button onClick={handleSubmit}>SubmitPhone</button>
      <div
        id="recaptcha"
        style={{
          width: 100,
          height: 100,
        }}
      ></div>
    </>
  );
};
