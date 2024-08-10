import React from 'react';
import './landing.css';
import { Amplify } from 'aws-amplify';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from 'aws-amplify/auth';
import { redirect } from "react-router-dom";
import config from '../aws-exports';
import '@radix-ui/themes/styles.css';
Amplify.configure(config);


function Landing() {


  const navigate = useNavigate();

  const gotToHome=()=>{
    navigate('/home');
  }
 
  /**const currentAuthenticatedUser = async() => {
    try {
      const temp = await getCurrentUser(); 
      return redirect('/home');
    } catch (err) {
      console.log(err);
    }
  }
  */




  return (
    <div>
      <div className="circle"> </div>
      <div className="text">
        <p> FilmAssistant Ai </p>
      </div>
      <button onClick={() => gotToHome()} className="joinBeta">Join the Beta</button>
    </div>
  );
}
export default Landing;
