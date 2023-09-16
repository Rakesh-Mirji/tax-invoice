"use client"

import { useState,useRef,useEffect } from "react";

export default function Home() {
  const[state,setState]=useState({showTable:false})
  const{showTable}=state
  const[heading,setHeading]=useState({})
  const[rows,setRows]=useState({})
  const[table,setTable]=useState([])
  let tableRef=useRef(null)

  var pageX,curCol,nxtCol,curColWidth,nxtColWidth;
  const onRmBtnClick=()=>{
    setHeading(Object.entries(heading).slice(0,-1).reduce((a,v)=>({...a,[v[0]]:v[1]}),{}))
  }

  const onCreateBtnClick=()=>{
    console.log(Object.values(heading))
    setState({...state,showTable:!showTable})
  }

  const onCreateRowClick=()=>{
    setTable( [...table,Object.values(rows)] )
    setRows(Object.entries(rows).reduce((a,v)=>({...a,[v[0]]:""}),{}))
  }

  const onRmRowClick=()=>{
    setTable(table.slice(0,-1))
  }

  

const mouseDown=(e)=>{
  curCol = e.target.parentElement;
  nxtCol = curCol.nextElementSibling;
  pageX = e.pageX; 
  console.log(pageX,'x');
  var padding = 0//paddingDiff(curCol);

  curColWidth = curCol.offsetWidth - padding;
  if (nxtCol)
   nxtColWidth = nxtCol.offsetWidth - padding;
  }

  const mouseMove=(e)=>{
    if (curCol) {
      var diffX = e.pageX - pageX;
      console.log(diffX,'diff');
   
      if (nxtCol)
       nxtCol.style.width = (nxtColWidth - (diffX))+'px';
  
      curCol.style.width = (curColWidth + diffX)+'px';
     }
  }

const mouseUp=(e)=>{
  curCol = undefined;
  nxtCol = undefined;
  pageX = undefined;
  nxtColWidth = undefined;
  curColWidth = undefined;
}


  return (
    <>

      <div className={showTable ? "hidden" : "block"}>

      <button className="border-2 p-5 w-28 hover:bg-slate-100" onClick={()=>setHeading({...heading,[Object.keys(heading).length]:''})}>Add</button>
      <button className="border-2 p-5 w-28 hover:bg-slate-100" onClick={()=>onRmBtnClick()}>Remove</button>
      <button className="border-2 p-5 w-28 hover:bg-slate-100" onClick={()=>onCreateBtnClick()}>Create</button>

      <p>Enter inputList</p>
 
        {Object.keys(heading).map(elem => 
          <input key={elem} className="h-10 w-[20vw] border-2" value={heading.elem} onChange={(e)=>setHeading({...heading,[elem]:e.target.value})} placeholder={`Heading number ${parseInt(elem)+1}`} ></input>
        )}
    </div>

    <div className={showTable ?'block' :"hidden"}>
      {console.log(rows)}
      {showTable && Object.values(heading).map((elem,index) =>
        { return <input key={index} className="h-10 w-[20vw] border-2" value={rows.index} onChange={(e)=>{console.log();setRows({...rows,[index]:e.target.value})}} placeholder={`Enter ${elem} field`}  ></input>
      })}
      <button className="border-2 p-5 w-28 hover:bg-slate-100" onClick={()=>onCreateRowClick()}>Create Row</button>
      <button className="border-2 p-5 w-28 hover:bg-slate-100" onClick={()=>onRmRowClick()}>Remove Row</button>
      <div>
        <table ref={tableRef} className="overflow-hidden">
          <thead>
            <tr>{heading && Object.values(heading).map((elem,index)=>
              <th key={index} className="relative" >
                {elem}
                <div onMouseDown={(e)=>mouseDown(e)} onMouseUp={(e)=>mouseUp(e)} onMouseMove={(e)=>mouseMove(e)} className={ `absolute border-2 w-[30px] top-0 -right-4 cursor-ew-resize select-none h-screen border-r-[3px] hover:border-blue-300`}></div>
              </th>)}
            </tr>
          </thead>
          <tbody>
            {table && table.map((e,index) =>
              <tr key={index}>
                {e.map((data,index) => <td key={index}>{data}</td>)}
              </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
    </>
    )
}