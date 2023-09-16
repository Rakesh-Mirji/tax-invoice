"use client"

import { useState,useRef,useEffect } from "react";

export default function Home(){
  const[data,setData]=useState('')
  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      if(!timer){
        func.apply(this, args)
      }
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  
  function saveInput(e,setData){
    setData(e.target.value);
  }
  console.log(data);
    return(
      <>
        <div className="flex justify-center p-10">
          <div className="">
            <p>Billed From</p>
            <div className="p-3 flex gap-5 justify-between">
              <label>Name</label>
              <input type="text" placeholder="Business Name" value=''></input>
            </div>
            <div className="p-3 flex gap-5 justify-between">
              <label>Address</label>
              <input type="text" placeholder="Business Address"></input>
            </div>
            <div className="p-3 flex gap-5 justify-between">
              <label>Email</label>
              <input type="text" placeholder="Business Email"></input>
            </div>
            <div className="p-3 flex gap-5 justify-between">
              <label>Phone</label>
              <input type="tel" placeholder="+91 1234567890"></input>
            </div>
          </div>
          <div className="">
            <p>Billed To</p>
            <div className="p-3 flex gap-5 justify-between">
              <label>Name</label>
              <input type="text" placeholder="Business Name"></input>
            </div>
            <div className="p-3 flex gap-5 justify-between">
              <label>Address</label>
              <input type="text" placeholder="Business Address"></input>
            </div>
            <div className="p-3 flex gap-5 justify-between">
              <label>Email</label>
              <input type="text" placeholder="Business Email"></input>
            </div>
            <div className="p-3 flex gap-5 justify-between">
              <label>Phone</label>
              <input type="tel" placeholder="+91 1234567890"></input>
            </div>
          </div>
        </div>
      </>
    )
  }