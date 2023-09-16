"use client"

import { useState,useRef,useEffect } from "react";
import Table from './table.js'
import InputRows from './inputRows.js'
import Heading from './heading.js'


export default function Home(){
  const[table,setTable]=useState([])
  const[title,setTitle]=useState({})
  
  return(
    <>
      {Object.keys(title).length ? 
      <div>
        <InputRows title={title} table={table} setTable={setTable} />
        <Table title={title} table={table}/>
      </div> : 
      <Heading setTitle={setTitle}/>} 
    </>
  )
}