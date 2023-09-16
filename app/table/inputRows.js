"use client"

const InputRows=({title,table,setTable})=>{
    const onCreateRowClick=(e)=>{
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const body = [];
      for (const [key, value] of form.entries()) {
        body.push(value);
      }
      setTable( [...table,body] )
    }
  
    const onRmRowClick=()=>{
      setTable(table.slice(0,-1))
    }
    return(
      <>
    <div key={table.length}>
      <p className="text-2xl italic text-center pt-20">Billing Generator</p>
        <form onSubmit={onCreateRowClick}>
          <div className="flex gap-10 w-full  pt-10 justify-around">
            <button className="py-3 px-5 border-2 rounded-lg text-blue-500 border-blue-500 enabled:hover:bg-blue-500 enabled:hover:text-white duration-300 disabled:opacity-50" type="submit" >{table.length?<span className="text-3xl">+</span>:"Add Content"}</button>
            <button className="py-3 px-5 border-2 rounded-lg text-blue-500 border-blue-500 enabled:hover:bg-blue-500 enabled:hover:text-white disabled:opacity-50 duration-300" disabled={!table.length} onClick={()=>onRmRowClick()} >Remove Content</button>
          </div>
          <div className="flex gap-10 p-5 flex-wrap justify-center">
            {Object.values(title).map((elem,index) =>
              <input key={index} className="max-md:w-[50vw] p-1 rounded-lg h-10 w-[20vw] border-2" name={elem} placeholder={`Enter ${elem} field`}  ></input>
            )}
        </div>
      </form>
    </div>
    </>)
  }

export default InputRows