import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Login() {
  const [phone, setPhone] = useState("");

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    const utterance = new SpeechSynthesisUtterance("Google login successful");
    window.speechSynthesis.speak(utterance);
  };

  const handleGoogleLoginFailure = () => {
    console.log("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="h-auto w-[475px] bg-white p-7 flex items-center justify-center flex-col rounded-md">

        <div className="w-full flex items-center justify-between mb-10">
          <h1 className="font-sans text-3xl text-gray-700">Login</h1>
          <span className="text-xl cursor-pointer">&#10006;</span>
        </div>

        <PhoneInput
          country={"in"}
          value={phone}
          onChange={(phone) => setPhone(phone)}
          placeholder="Phone"
          containerClass="w-full flex items-center rounded-md border border-teal-600"
          inputClass="w-full h-11 pl-14 pr-4 text-gray-600 placeholder-gray-400 text-base border-none rounded-md focus:ring-0"
          buttonClass="pr-2"
          dropdownClass="rounded-md shadow-md"
        />

        <div className="mt-6">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap
          />
        </div>

      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
