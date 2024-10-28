import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      fontFamily: 'Metropolis, sans-serif',
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "green",
      },
      fontFamily: 'Metropolis, sans-serif',
    },
  },
}));

function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const classes = useStyles();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    // You would typically send this credential to your server for verification and sign up
    setUser(credentialResponse);
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google login failed");
    alert("Google login failed");
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post('/api/customer', {
        fullname,
        email,
      });
      alert(response.data); // Show success message
    } catch (error) {
      console.error("There was an error signing up!", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={
        import.meta.env.VITE_GOOGLE_CLIENT_ID ||
        "956095514806-v41p0jeg8ik46llfuv4gg6fk2pmgg652.apps.googleusercontent.com"
      }
    >
      <div className="font-metropolis h-auto w-[475px] bg-white p-7 flex flex-col rounded-md">
        <div className="flex items-center justify-between  w-full">
          <h1 className="text-3xl">Sign up</h1>
          <span className="text-xl cursor-pointer">&#x2716;</span>
        </div>

        <div className="mt-6 space-y-4">
          <TextField
            fullWidth
            id="outlined-fullname"
            label="Full Name"
            variant="outlined"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className={classes.root}
          />
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
        </div>

        <div className="mt-6 flex items-center gap-4 w-[80%]">
          <input
            type="checkbox"
            id="check"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="cursor-pointer h-6 w-7 rounded-md border-gray-300 border-2 hover:border-red-500 focus:ring-0 appearance-none checked:border-red-500 checked:bg-red-500 relative ease-in duration-200 "
            style={{
              position: "relative",
            }}
          />
          <style jsx>{`
            #check:checked::before {
              content: "✓";
              color: white;
              position: absolute;
              top: 0px;
              left: 3px;
              font-size: 15px;
            }
          `}</style>

          <label
            className="text-[11px] text-left cursor-pointer leading-tight tracking-wide text-[#9d9d9d]"
            htmlFor="check"
          >
            I agree to Zomato's
            <span className="text-[#e03546]">
              {" "}
              Terms of Service, Privacy Policy{" "}
            </span>
            and <span className="text-[#e03546]">Content Policies</span>
          </label>
        </div>

        <button onClick={handleSignup} className="ease-in duration-200 text-center bg-[#e23745d7] rounded-md p-3 mt-5 text-[#ffffff] hover:bg-[#E23744]">Create Account</button>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute px-2 bg-white text-gray-500">Or</div>
          <div className="w-full border-b-2 border-gray-300"></div>
        </div>

        <GoogleLogin>
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          useOneTap
        </GoogleLogin>

        <div className="w-full border-b-2 border-gray-300 mt-6"></div>

        <div className="flex item-center tracking-wide mt-4">
          <p className="text-lg">Already have an account ?</p>
          <a className="text-[#e03546] text-lg ml-2" href="#">Log in</a>
        </div>

      </div>
    </GoogleOAuthProvider>
  );
}

export default Signup;
