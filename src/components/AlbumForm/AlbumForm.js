import albumForm from './AlbumForm.module.css'
import {db} from '../../Firebase';
import { useRef, useState } from 'react';
import { collection,addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function AlbumForm(){
    
    const albumName= useRef(null);

    const[album,setAlbum]=useState("");

    const notify = () => {
        // toast("Default Notification !");
  
        toast.success("Added Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
          theme:"dark"
        });
    }

    async function handleAdd(){
       if(album){
            const docRef=await addDoc(collection(db,"albums"),{
                name:album,
            })
            if(docRef){
                notify();
            }
            setAlbum("");
            albumName.current.focus();
       }
       
    }

    function handleClear(){
        setAlbum("");
        albumName.current.focus();
    }

    function handleAction(e){
        e.preventDefault();
    }
    return(
        <>
            <div className={albumForm.albumformdiv}> 

                <h2 className={albumForm.heading}>Create an Album</h2>

                <form className={albumForm.form} onSubmit={handleAction}>

                    <input type="text" placeholder="Album Name" className={albumForm.albumname} value={album} 
                    ref={albumName} onChange={(e)=>setAlbum(e.target.value)} required/>

                    <button className={`${albumForm.create} ${albumForm.button}`} onClick={handleAdd}>Create</button>
                    <button className={`${albumForm.clear} ${albumForm.button}`} onClick={handleClear}>Clear</button>

                </form>
            </div>
            <ToastContainer />
        </>
    ) 
} 