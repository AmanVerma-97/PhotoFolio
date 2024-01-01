import { useEffect, useState } from "react";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";
import albumList from './AlbumList.module.css';
import { onSnapshot,collection} from "firebase/firestore";
import {db} from '../../Firebase';
import Spinner from 'react-spinner-material';

export default function AlbumList(){

    const[albumCreate,setAlbumCreate]=useState(false);
    const[images,showImages]=useState(false);
    const[albums,setAlbums]=useState([]);
    const[spinner,setSpinner]=useState(true);
    const[albumId,setAlbumId]=useState(null);
    const[albumName,setAlbumName]=useState("");
    
    useEffect(()=>{
        onSnapshot(collection(db,"albums"),(items)=>{
            const albums=items.docs.map((doc)=>{
                return{
                    id:doc.id,
                    ...doc.data()
                }
            });
            setAlbums(albums);
           setSpinner(false);
        });
    },[])

    function openImages(album){
        setAlbumName(album.name);
        setAlbumId(album.id);
        showImages(true);
    }

    return(
        <>
        {images?<ImageList showImages={showImages} albumId={albumId} albumName={albumName}/>:

                <div className={albumList.container} >

                    {albumCreate?<AlbumForm setAlbumCreate={setAlbumCreate}/>:null}

                    <div className={albumList.top}>
                        <h1 className={albumList.heading}>Your Albums</h1>
                        <button onClick={()=>setAlbumCreate(!albumCreate)} 
                            className={`${albumList.button} ${albumCreate?albumList.cancel:albumList.add}`}>
                            {albumCreate?'Cancel':'Add Album'}
                        </button>
                    </div>

                    {/* Spinner displayed while loading albums from Database */}
                    {spinner? <div className={albumList.spin}> 
                                 <Spinner radius={90} color={"skyblue"} stroke={9} visible={true} /> 
                               </div> : null
                    }

                    <div className={albumList.albums} >
                    { albums.map((album,index)=>(
                        <div className={albumList.album} onClick={()=>openImages(album)} key={index}>
                            <img src="https://cdn-icons-png.flaticon.com/128/1375/1375106.png" alt="album" className={albumList.image}/>
                            <span>{album.name}</span>
                        </div>
                     ))}
                    </div>
                </div>
            }
        </>
    )
}