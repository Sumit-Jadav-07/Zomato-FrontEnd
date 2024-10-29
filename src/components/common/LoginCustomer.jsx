import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
// import PhoneInput from "react-phone-number-input";
// import EmailImage from "../../assets/svg/email.svg";
// import styles from "../../../src/components/common/Login.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      fontFamily: "Metropolis, sans-serif",
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "green",
      },
      fontFamily: "Metropolis, sans-serif",
    },
  },
}));

function LoginCustomer() {
  // const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const clientId =
    "956095514806-v41p0jeg8ik46llfuv4gg6fk2pmgg652.apps.googleusercontent.com";
  const role = "customer";

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    const utterance = new SpeechSynthesisUtterance("Google login successful");
    window.speechSynthesis.speak(utterance);
  };

  const handleGoogleLoginFailure = () => {
    console.log("Google login failed");
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(
        "http://localhost:9999/api/public/session/login",
        {
          email,
          role
        }
      );
      alert(response.data);
    } catch (error) {
      console.error("There was an error signing up!", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="font-metropolis h-auto w-[475px] bg-white p-7 flex items-center justify-center flex-col rounded-md">
        <div className="w-full flex items-center justify-between mb-10">
          <h1 className="text-3xl text-gray-700">Login</h1>
          <span className="text-xl cursor-pointer">&#10006;</span>
        </div>

        {/* <PhoneInput
          international
          defaultCountry="IN"
          value={phone}
          onChange={(phone) => setPhone(phone)}
          placeholder="Phone"
          className={`${styles.custom_phone_input} w-full p-4 flex items-center border border-gray-500 rounded-md overflow-hidden focus-within:border-teal-600 bg-transparent`}
          inputStyle={{
            flex: '1',
            outline: 'none',
            border: 'none',
            padding: '0.5rem',
            fontSize: '1rem',
            background: 'transparent'
          }}
        /> */}

        <TextField
          fullWidth
          id="outlined-email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.root}
        />

        <button className="w-full ease-in duration-200 text-center bg-[#e23745d7] rounded-md p-3 mt-6 text-[#ffffff] hover:bg-[#E23744]" onClick={handleLogin}>
          Send One Time Password
        </button>

        {/* <div className="relative flex items-center justify-center my-6">
          <div className="absolute px-2 bg-white text-gray-500">Or</div>
          <div className="w-full border-b-2 border-gray-300"></div>
        </div> */}

        {/* <button className="w-full border-2 border-gray-300 text-center rounded-md p-2 mt-2 text-black flex justify-center items-center" onClick={handleLogin}>
          <img src={EmailImage} alt="" className="mr-3 h-7 w-7" />
          Continue with Email
        </button> */}

        <div className="mt-6 w-full">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap
          />
        </div>

        <div className="w-full border-b-2 border-gray-300 mt-6"></div>

        <div className="flex items-center justify-start tracking-wide mt-4">
          <p className="text-lg text-[#434343eb]">New to Zomato ?</p>
          <a className="text-[#e03546] text-lg ml-2" href="#">
            Create account
          </a>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginCustomer;
