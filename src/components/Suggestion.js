import React from 'react'
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import './Suggestion.css'
import HashLoader from "react-spinners/HashLoader";
 
export default function Suggestion() {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
      setLoading(true)
  
      emailjs.sendForm('service_vn3skor', 'template_mpvf51g', form.current, 'L2fgkFmrgswWGPxyt')
        .then((result) => {
            console.log(result.text);
            alert("Message sent successfully")
            setLoading(false)
            setTimeout(() =>{
             changeDisplayFalse()
            }, 2000)
        }, (error) => {
            console.log(error.text);
            alert("Message not sent. Please try again")
            changeDisplayFalse()
        });
    };


    const [Display, setDisplay]= useState(null)
    const [Loading, setLoading]= useState(false)
    const changeDisplayFalse =() =>{
  setDisplay(false)
    }
    const changeDisplayTrue =() =>{
  setDisplay(true)
    }
 
  return (

    <div className="suggetion">
      
    <div className={Display===true? "suggestion" : (Display===false? "suggestion inactive" : "none")}>
    <HashLoader
        color={'#4008a2'}
        loading={Loading}
        size={150}
        cssOverride={{
          "z-index": "100",
          "position": "fixed"
        }}
      />
    <form ref={form} onSubmit={sendEmail}>
    <p>Name :
    <input type="text" name="user_name" required placeholder='Enter Your Name'/></p>
    <br />
    <p>Email :
    <input type="email" name="user_email" required  placeholder='Enter Email'/></p>
    <br />
    <p>Message :
    <textarea name="message" rows={5} required placeholder='Your Suggestion'/></p>
    <br />
    <button className='submitbtn' type="submit">Send</button>
  </form>
  <img className='cancelbtn' onClick={changeDisplayFalse} src="/memory-match/img/close.png" alt="" />
  </div>
  {/* <div className="thankyou">
    <p>Thank you for your suggestion</p>
  </div> */}
    <p>Any suggestions? <button onClick={changeDisplayTrue}>Click Here</button></p>
  </div>
  )
}
