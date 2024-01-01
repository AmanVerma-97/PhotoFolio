import imageForm from './ImageForm.module.css';
import {db} from '../../Firebase';
import { collection,addDoc,updateDoc,doc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ImageForm(props){

    const{album, id, imageUpdate}=props;

    const titleRef = useRef(null);
    const urlRef = useRef(null);

    const[title,setTitle]=useState("");
    const[url,setUrl]=useState("");

    useEffect(()=>{
        if(imageUpdate){
            setTitle(props.imgTitle);
            setUrl(props.imgUrl);
        }
    },[imageUpdate, props.imgTitle, props.imgUrl]);

    const notifyAdd = () => {
        toast.success("Added Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
          theme:"dark"
        });
    }

    //Adding image to DB
    async function handleAdd(){
        if(title && url){

             const docRef=await addDoc(collection(db,"images"),{
                 title:title,
                 url:url,
                 album:id
             })

             if(docRef){
                notifyAdd();
             }
             setTitle("");
             setUrl("");
             titleRef.current.focus();
        }
        
     }
     

    const closeAll=()=>{
          props.setImageUpdate(false);
          props.setImageCreate(false);
    }

    const notifyUpdate = () => {
            toast.info("Updated Successfully !", {
            position: toast.POSITION.TOP_RIGHT,
            theme:"dark"
          });
    }

    //Updating image in DB
    async function handleUpdate(){
        if(title && url){
            const imageRef = doc(db, "images", props.imgId);
            try {
                await updateDoc(imageRef, {
                  title: title,
                  url: url,
                });
                closeAll();
              } 
              catch (error) {
                console.error("Error updating image:", error);
              }
              finally{
                await new Promise(resolve => setTimeout(resolve, 500));
                notifyUpdate();
              }
            
        }
    } 

    function handleClear(){
        setTitle("");
        setUrl("");
        titleRef.current.focus();
    }

    function handleAction(e){
        e.preventDefault();
    }

    return(
        <>
            <div className={imageForm.imageformdiv}>
            <h2 className={imageForm.heading}>
                    {imageUpdate ? `Update image ${props.imgTitle}` : `Add image to ${album}`}
            </h2>

                <form className={imageForm.form} onSubmit={handleAction}>

                    <input type="text" placeholder="Title" className={imageForm.details} ref={titleRef} value={title}
                    required onChange={(e)=>setTitle(e.target.value)}/>

                    <input type="text" placeholder="Image URL" className={imageForm.details} ref={urlRef} value={url} 
                    required onChange={(e)=>setUrl(e.target.value)}/>

                    <div className={imageForm.buttondiv}>
                        <button className={`${imageForm.clear} ${imageForm.button}`} onClick={handleClear}>Clear</button>

                        <button className={`${imageForm.create} ${imageForm.button}`} onClick={imageUpdate?handleUpdate:handleAdd}>{imageUpdate?'Update':'Create'}</button>
                    </div>
                    
                </form>
            </div>
            <ToastContainer />
        </>
    )
}