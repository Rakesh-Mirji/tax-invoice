
import { useState,useRef} from "react";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import printJS from 'print-js'
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

export default function Table({title,table}){
    
    const [state,setState]=useState({pageX:0,curCol:{},nxtCol:{},curColWidth:0,nxtColWidth:0})
    const {pageX,curCol,nxtCol,curColWidth,nxtColWidth}=state


    const mouseDown=(e)=>{
        if(e.target.parentElement.nextElementSibling)
        setState({...state,
            pageX:e.pageX,
            curCol:e.target.parentElement,
            nxtCol:e.target.parentElement.nextElementSibling,
            curColWidth:e.target.parentElement.offsetWidth,
            nxtColWidth:e.target.parentElement.nextElementSibling.offsetWidth})
    }

    const mouseMove=(e)=>{
        //   console.log(curColWidth);
          if (curCol) {
            let diffX = e.pageX - pageX;
                console.log(curCol.offsetWidth,nxtCol.offsetWidth);
                if (nxtColWidth && curCol.offsetWidth>=100)
                nxtCol.style.width = (nxtColWidth - (diffX))+'px';

            if(nxtCol.offsetWidth>=100)
                curCol.style.width = (curColWidth + diffX)+'px';
        }
    }

    const mouseUp=()=>{
        setState({})
    }


    const printRef = useRef();

    const download = ()=>{
            // const element = printRef.current;
            // console.log(element);
            // const canvas = await html2canvas(element);
            //var data = canvas.toDataURL('image/png');

            htmlToImage.toPng(document.getElementById('table'))
            .then(function (dataUrl) {
              printJS({printable : dataUrl, type:'image',header:'<h1>hello world</h1>',footer:'<h1>hello world</h1>'});
            });

            // printJS('table', 'html')
            // const pdf = new jsPDF();
            // const imgProperties = pdf.getImageProperties(data);
            // const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight =
            // (imgProperties.height * pdfWidth) / imgProperties.width;

            // pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
            // pdf.save(`invoice.pdf`);
    }

    return(
    <>
      <div className="relative z-[200] flex gap-10 p-5 flex-wrap justify-center">
        <table id="table" ref={printRef} className=" max-lg:!w-[80vw] !overflow-hidden table-fixed w-[90vw]">
          <thead>
            <tr>{Object.values(title).map((elem,index)=>
              <th key={index} className="relative hover:border-r-4" >
                <p className="w-full h-full truncate ">
                 {elem}
                </p>
                <div onMouseDown={(e)=>mouseDown(e)} onMouseMove={(e)=>mouseMove(e)} onMouseUp={(e)=>mouseUp(e)} className=" z-[100] w-3 cursor-ew-resize absolute -right-2 top-0 h-screen overflow-hidden"></div>
              </th>)}
            </tr>
          </thead>
          <tbody>
            {table && table.map((e,index) =>
              <tr className="" key={index}>
                {e.map((data,index) => <td className="w-full h-full truncate" key={index}>{data}</td>)}
              </tr>
              )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        {table.length > 0 && <button className="py-2 px-5 border-2 rounded-lg text-lg bg-blue-500 text-white duration-300" onClick={()=>download()} >Print</button> }
      </div>
    </>
    )
  }