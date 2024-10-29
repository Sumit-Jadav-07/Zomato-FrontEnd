import React, { useState, useEffect } from "react";

function OtpVerification() {
  const [otp, setOtp] = useState(Array(6).fill("")); 
  const [timeLeft, setTimeLeft] = useState(10); 
  const [isActive, setIsActive] = useState(true);

  // Timer effect
  useEffect(() => {
    if (!isActive || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          setIsActive(false); // Deactivate when time runs out
          return 0; // Set timeLeft to 0
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle input change
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Keep only the last character
    setOtp(newOtp);

    // Move to the next input if the input is filled
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle key down to move to the previous input
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="font-metropolis h-auto w-[475px] bg-white p-7 flex items-center justify-center flex-col rounded-md">
      <div className="w-full flex items-center justify-between mb-10">
        <h1 className="text-3xl text-gray-700">OTP Verfication</h1>
        <span className="text-xl cursor-pointer">&#10006;</span>
      </div>

      <p className="text-[#8e8e8e9e] text-sm">Check text emails for your OTP</p>

      <div className="flex justify-between mt-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1} // Limit input to 1 character
            className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:border-teal-500 m-[13px]"
          />
        ))}
      </div>

      <p className="text-2xl mb-1 mt-4">{formatTime(timeLeft)}</p>

      <div className="flex item-center mt-4">
        <p className="text-[#8e8e8e]">Not received OTP ?</p>
        <a
          href="#"
          className={`ml-2 ${isActive ? "text-[#8e8e8e81]" : "text-black"}`}
          onClick={() => {
            if (!isActive) {
              // Logic to resend OTP can be added here
              setTimeLeft(10); // Reset the timer
              setIsActive(true); // Reactivate the timer
            }
          }}
        >
          Resend Now
        </a>
      </div>
    </div>
  );
}

export default OtpVerification;
