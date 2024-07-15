import React, { useState } from 'react';
import axios from 'axios';
import GenericButton from '../../../stories/Button/GenericButton';
// import { Http } from '@mui/icons-material';

const ProfileImageEditButton = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const userId = '6694d2295d41f7809588274c';
  // const url = process.env.REACT_APP_BASE_URL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (!file) {
      alert('Please select an image first.');
      return;
    }
    if(file){
      console.log('file',file);
    }
    formData.append('profileImage', file);

    try {
      const response = await axios.put(`http://localhost:3000/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile image updated successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to update profile image.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h2>Change Profile Picture</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <GenericButton size='small' label='Upload Image' onClick={handleUpload} className='' />
      </div>
      {preview && (
        <div>
          <img src={preview} alt="Profile Preview" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        </div>
      )}
    </div>
  );
};

export default ProfileImageEditButton;
