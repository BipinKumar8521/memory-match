import React from "react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import "./Suggestion.css";
import HashLoader from "react-spinners/HashLoader";

export default function Suggestion() {
  const form = useRef();
  const [Display, setDisplay] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [pageDisable, setPageDisable] = useState(false);
  const [thankyou, setthankyou] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setPageDisable(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUB_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setTimeout(() => {
            alert("Message sent successfully");
            setLoading(false);
            setPageDisable(false);
            setthankyou(true);
            setTimeout(() => {
              changeDisplayFalse();
              setthankyou(false);
            }, 2000);
          }, 5000);
        },
        (error) => {
          console.log(error.text);
          alert("Message not sent. Please try again");
          changeDisplayFalse();
          setPageDisable(false);
          setLoading(false);
        }
      );
  };

  const changeDisplayFalse = () => {
    setDisplay(false);
  };
  const changeDisplayTrue = () => {
    setDisplay(true);
  };

  return (
    <div className="suggetion">
      <HashLoader
        color={"#36d7b7"}
        loading={Loading}
        size={100}
        cssOverride={{
          "z-index": "1000",
          position: "fixed",
          left: "40%",
          top: "40%",
        }}
      />
      <div
        className={
          Display === true
            ? "suggestion"
            : Display === false
            ? "suggestion inactive"
            : "none"
        }
      >
        <form ref={form} onSubmit={sendEmail}>
          <p>
            Name :
            <input
              type="text"
              name="user_name"
              required
              placeholder="Enter Your Name"
            />
          </p>
          <br />
          <p>
            Email :
            <input
              type="email"
              name="user_email"
              required
              placeholder="Enter Email"
            />
          </p>
          <br />
          <p>
            Message :
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Your Suggestion"
            />
          </p>
          <br />
          <button className="submitbtn" type="submit">
            Send
          </button>
        </form>
        <img
          className="cancelbtn"
          onClick={changeDisplayFalse}
          src="/memory-match/img/close.png"
          alt=""
        />
      </div>
      <div
        className={
          thankyou === true
            ? "thanks"
            : thankyou === false
            ? "thanks inactive"
            : "none"
        }
      >
        <h1>Thank you </h1>
        <p>for your suggestion</p>
      </div>
      <p>
        Any suggestions? <button onClick={changeDisplayTrue}>Click Here</button>
      </p>
      {/* page disable div */}
      <div className={pageDisable ? "div" : ""}></div>
    </div>
  );
}
