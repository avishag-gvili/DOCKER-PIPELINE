import React, { useState } from 'react';
import axios from 'axios';
import GenericButton  from '../stories/Button/GenericButton';
import ResponsiveAppBar from '../stories/header/header.jsx';
const RingtoneEditButton = () => {
    let id='668fcf21a103bc60815420b6';
    let sendNotificationTime = 56;
    let  sendEmail= 'never';
    const url=process.env.REACT_APP_BASE_URL;
    const [file, setFile] = useState(null);
    // const [image, setImage] = useState(null);
    // const [preview, setPreview] = useState(null);
    const [audioSrc,setAudioSrc]  = useState();
    const handleFileChange = (e) => {
         console.log('at handle file ');
          setFileHandle(e.target.files[0]);
         console.log('file',file);
        if(file)
        {
          const audioUrl= URL.createObjectURL(file);
          console.log('audioUrl',audioUrl);
          setAudioSrc(audioUrl);
        }
           

    };
  const setFileHandle=(file)=>{setFile(file)}
    const handleUpload = async () => {
        console.log('url=',url);
        const formData = new FormData();
         if(file)
         {
            console.log('file',file);
            
         }
        formData.append('soundVoice', file);
        formData.append('sendNotificationTime',sendNotificationTime);
        formData.append('EmailFrequency',sendEmail);
          try {
            const response = await axios.put(`${url}/preferences/preferences/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(response)
              console.log('response ',response.data);
          } catch (error) {
            console.error('Error uploading file:', error);
            if(error.response)
             console.log('Response data :',error.response.data);
          }
           
    };
//   const uploadFile =()=>{
   
//   };
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//           setImage(file);
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             setPreview(reader.result);
//           };
//           reader.readAsDataURL(file);
//         }
//         console.log(image);
//       };
    return (
    
         <div>
          <div className='uploadWarper'>
            <GenericButton size='small'  label='send audio' onClick={handleUpload} className=''/>
            <input type="file" onChange={handleFileChange} accept="audio/*" />
          </div>
          { audioSrc &&
            <audio controls>
               <source src={audioSrc} ></source>
            </audio>}
         
        </div>
        

       
        
    );
};

export default RingtoneEditButton;
