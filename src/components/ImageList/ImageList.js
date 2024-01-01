import { useEffect, useState } from "react";
import ImageForm from "../ImageForm/ImageForm";
import imageList from './ImageList.module.css';
import {db} from '../../Firebase';
import { collection, onSnapshot,doc,deleteDoc,query,where } from "firebase/firestore";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ImageList(props){

    const[imageCreate,setImageCreate]=useState(false);
    const[imageUpdate, setImageUpdate]=useState(false);

    const{showImages,albumId,albumName}=props;

    const [searchTerm, setSearchTerm] = useState('');
    
    const[images,setImages]=useState([]);
    const[imgTitle, setImgTitle]=useState("");
    const[imgUrl, setImgUrl]=useState("");
    const[imgId, setImgId]=useState("");
    const [filteredImages, setFilteredImages] = useState(images);

    useEffect(()=>{
        const q = query(collection(db, "images"), where("album", "==", albumId));
        const unsubscribe = onSnapshot(q, (items) => {
            const images=items.docs.map((doc)=>{
                return{
                    id:doc.id,
                    ...doc.data()
                }
            });
            setImages(images);
            // setFilteredImages(images);
      });
      console.log(unsubscribe);
    },[albumId])

    useEffect(() => {
        // Filter images based on the search term
        const filtered = images.filter(image =>
            image.title.includes(searchTerm)
        );
        setFilteredImages(filtered);
    }, [searchTerm,images]);
    
    const handleSearch = event => {
    setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
    setSearchTerm('');
    };


    const handleDownload = (image) => {
        const link = document.createElement('a');
        link.href = image.url; // Set the image URL
        link.download = image.title || 'downloaded-image'; // Set the file name or use a default name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    //complete these and handle 
    function handleUpdate(img){
        setImageUpdate(true);
        setImgTitle(img.title);
        setImgUrl(img.url);
        setImgId(img.id);
        setImageCreate(true);
    }

    function handleCancelAdd(){
        if(imageUpdate){
            setImageUpdate(false)
            setImageCreate(false);
        }
        setImageCreate(!imageCreate);
    }

    //delete image from DB.
    async function handleDelete(id){
        await deleteDoc(doc(db, "images", id));
    }

    return(
        <>
            {imageCreate? imageUpdate?
               <ImageForm album={albumName} id={albumId} imageUpdate={imageUpdate} imgTitle={imgTitle} imgUrl={imgUrl} 
               imgId={imgId} setImageCreate={setImageCreate} setImageUpdate={setImageUpdate}/>

               :<ImageForm album={albumName} id={albumId} imageUpdate={imageUpdate}/>:null
            }

            <div className={imageList.top}>
                <button onClick={()=>showImages(false)} className={imageList.back}> 
                    <img src="https://cdn-icons-png.flaticon.com/128/2550/2550259.png" alt="go-back"/>
                </button>
                <h1 className={imageList.heading}>
                    {images.length===0?`No Images in ${albumName}`:`Your Images in ${albumName}`}
                </h1>
                <button onClick={handleCancelAdd} 
                    className={`${imageList.button} ${imageCreate?imageList.cancel:imageList.add}`}>
                    {imageCreate?'Cancel':'Add image'}
                </button>
            </div>

            <div className={imageList.search}>
                <input type="text" placeholder="Search images" value={searchTerm} onChange={handleSearch} className={imageList.find}/>
                <button className={imageList.cancelButton} onClick={clearSearch}>
                    <img src="https://cdn-icons-png.flaticon.com/128/8727/8727689.png" alt="cancel"/>
                </button>
            </div>

            <div className={imageList.images}>

                 {filteredImages.map((image,index)=>(
                    <div className={imageList.image} key={index}>
                        <div className={imageList.options}>

                            <button className={imageList.option} onClick={()=>handleDownload(image)}>
                                <img src="https://cdn-icons-png.flaticon.com/128/2382/2382067.png" alt="download"/>
                            </button>

                            <button className={imageList.option} onClick={()=>handleUpdate(image)}>
                                <img src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png" alt="edit"/>
                            </button>

                            <button className={imageList.option} onClick={()=>handleDelete(image.id)}>
                                <img src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png" alt="delete"/>
                            </button>

                        </div>
                        <img src={image.url} alt="album" className={imageList.img} />
                        <span>{image.title}</span>
                    </div>
                  ))}

            </div>
            <ToastContainer />
        </>
    )
}