import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
export default function ImageComponent({src}:any){

const [imageLoading, setImageLoading] = useState<boolean>(false);
useEffect(()=>{
    const img = new Image();
    img.onload= ()=>{
        setImageLoading(true)
    }
    img.src = src;

},[src])
    return (
        <>
        <div className={`${imageLoading ? "hidden" : " inline "}`}>

        <Blurhash
            hash="L6AU_;uD4mx1EeR8jKtM4mxu^nIm"
          
            punch={1}
            style={{ height:'500px', width: '100%', minWidth: '180px' }}
            />
        

        </div>
   
        <img
            src={src}
            alt =""
            className={`${!imageLoading ? "hidden" : "rounded-lg  object-fit h-[300px] lg:h-[500px] w-full lg:w-full block"}`}

        /> 
     
        </>
       
    );
}