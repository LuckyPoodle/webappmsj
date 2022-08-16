import { FunctionComponent, useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import firebase from '../auth/initFirebase';
import "firebase/auth";
///this is for the StyaedFirebaseAuth from react-firebaseui for login
const firebaseAuthConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: "/",
};

const FirebaseAuth = () => {
  const [renderAuth, setRenderAuth] = useState(false); /// because this should only render in client side not in browser side, but nextjs tend to load browser side, so we use this for tenary. 
//this only run on mount 
  useEffect(() => {
    setRenderAuth(true);
  }, []);

  return (
    <div className=" flex items-stretch ">
      {renderAuth ? (
        <StyledFirebaseAuth
         className="px-4 py-2 m-4 w-full"
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
