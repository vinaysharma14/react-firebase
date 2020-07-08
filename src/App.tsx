import React, { useEffect, useCallback } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

// added reCaptchaVerifier type declaration to Window variable
declare global {
  interface Window {
    reCaptchaVerifier: unknown;
  }
}

export default () => {
  useEffect(() => {
    // firebase initialization when App mounts
    firebase.initializeApp({
      apiKey: 'xxx',
      authDomain: 'xxx',
      databaseURL: 'xxx',
      projectId: 'xxx',
      storageBucket: 'xxx',
      messagingSenderId: 'xxx',
      appId: 'xxx',
      measurementId: 'xxx',
    });

    // initialize firebase reCaptcha
    window.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('login-button', {
      size: 'invisible',
      callback: () => {
        /**
         * ! callback is not being fired when we click on login button
         * * same is working as expected in Vanilla JS in the repository below
         * * https://github.com/vinaysharma14/firebase-invisible-reCaptcha/blob/master/index.html
         */
      },
    });
  }, [])

  const handleSubmit = useCallback((event) => { event.preventDefault() }, [])

  return (
    <form onSubmit={handleSubmit}>
      <input />
      <button id="login-button">Submit</button>
    </form>
  )
}