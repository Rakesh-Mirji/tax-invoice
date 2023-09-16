
import { useState } from "react";

export default function Heading({setTitle}){
    const[heading,setHeading]=useState({'0':""})
    
    const onRmBtnClick=()=>{
      setHeading(Object.entries(heading).slice(0,-1).reduce((a,v)=>({...a,[v[0]]:v[1]}),{}))
    }
    const onCreateBtnClick=()=>{
      setTitle({...heading})
    }
    return(
      <>
    <div className="w-full h-screen flex flex-col items-center p-20">
      <p className="text-2xl italic">Billing Generator</p>
      <div className="flex gap-10 w-full  pt-10 justify-around">
        <button className="py-3 px-5 border-2 rounded-lg text-blue-500 border-blue-500 enabled:hover:bg-blue-500 enabled:hover:text-white duration-300" onClick={()=>setHeading({...heading,[Object.keys(heading).length]:''})} >Add Heading</button>
        <button className="py-3 px-5 border-2 rounded-lg text-blue-500 border-blue-500 enabled:hover:bg-blue-500 enabled:hover:text-white disabled:opacity-50 duration-300" disabled={!Object.keys(heading).length}  onClick={()=>onRmBtnClick()}>Remove Heading</button>
      </div>
      <div className="flex gap-10 p-5 flex-wrap justify-center">
          {Object.keys(heading).map(elem => 
            <input key={elem} className="max-md:w-[50vw] p-1 rounded-lg h-10 w-[20vw] border-2" value={heading.elem} onChange={(e)=>setHeading({...heading,[elem]:e.target.value})} placeholder={`Heading number ${parseInt(elem)+1}`} ></input>
            )}
        </div>
        <div className="flex gap-10 w-full  pt-10 justify-around">
          {Object.keys(heading).length > 0 && <button className="py-3 px-5 border-2 rounded-lg bg-blue-500 text-white duration-300" onClick={()=>onCreateBtnClick()} >Create Table</button>}
        </div>
      </div>
    </>)
  }