import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const otpLength = 5;
  const inputRef = useRef({});
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));

  useEffect(() => {
    inputRef.current[0].focus();
  }, [])
  

  const handleChange = (e, index) => {
    const value = e.target.value;
    if((value === "" || !isNaN(value)) && value !== " ") {
      const digit = value === "" ? "" : value;
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp)
      if(value !== "" && index < otpLength - 1) inputRef.current[index + 1].focus();
    }
  }

  const handleClick = () => {
    const fullOtp = otp.join("");
    console.log(fullOtp);
  }
  const handleBack = (e, index) => {
    if(otp[index] === "" && e.key === "Backspace" && index !== 0){
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp)
      console.log("backspace key pressed");
      inputRef.current[index-1].focus();
    }
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-[#00274e] '>
        <h1 className='text-white text-4xl font-bold p-4 m-6'>Verify Your Age</h1>
        <div className='flex flex-col justify-center items-center'>
          <p className='text-gray-400 p-4'>Please enter the verification code sent to your email id prabhleen@gmail.com</p>
          <div>
            {otp.map((e, i) => {
                return (
                <input 
                  key={i}
                  type="text" 
                  ref={(el) =>  {inputRef.current[i] = el}}
                  minLength={1}
                  value={otp[i]}
                  maxLength={1}
                  inputMode='numeric'
                  onChange={(e) => handleChange(e, i)} 
                  onKeyDown={(e) => handleBack(e, i)}
                  className='border-2 focus:border-[#3edbc9] focus:outline-none text-center border-solid w-10 p-2 rounded-xl mx-1 border-gray-600 text-gray-300' 
                />
                )
            })}
          </div>
        <button onClick={()=>{
          console.log("button clicked");
          handleClick();
        }} className={`w-3/4 cursor-pointer my-5 text-center  bg-[#3edbc9] p-3 rounded-xl  text-black font-semibold`}>Continue</button>
        </div>
      </div>
  )
}

export default App
