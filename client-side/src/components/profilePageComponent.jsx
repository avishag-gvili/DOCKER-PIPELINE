import React, { useEffect, useState} from 'react';
import Select from '../stories/Select/Select.jsx';
import TableComponent from '../stories/table/TableComponent.jsx';
import { updateProfileApi, getProfilesByUserId } from '../services/profileService.js';
import { deleteWebsite, updateWebsite } from '../services/websiteService.js';
import { useAppSelector } from '../redux/store.jsx';
import { setProfiles, updateProfile } from '../redux/profile/profile.slice.js';
import { selectProfile } from '../redux/profile/profile.selector.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
// import AddProfile from './addProfileComponent.jsx';
import UpdateProfileComponent from './updateProfileCpmponent.jsx';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import '../styles/profilePageStyle.scss';
import{useDispatch} from 'react-redux';
const ProfilePageComponent = () => {
  const dispatch = useDispatch();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isChange, setIsChange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editedRows, setEditedRows] = useState(null);
  const profiles = useAppSelector(selectProfile);
  const navigate = useNavigate();
  const fetchProfiles = async () => {
    debugger
    try {
      const userId = '669df26ef8a111309dc9e862';
      const profileData = await getProfilesByUserId(userId);
      debugger
      dispatch(setProfiles(profileData));
      console.log('1', profiles)
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch profiles:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [dispatch]);

  const handleProfileSelect = (event) => {
    const selectedProfileId = event.target.value;
    const profile = profiles.find(profile => profile._id === selectedProfileId);
    setSelectedProfile(profile);
    setEditRowId(null);
    setEditedRows(null);
  };

  const handleDelete = async (id) => {
    const updatedWebsites = selectedProfile.listWebsites.filter(website => website.websiteId._id !== id);
    const profileToUpdate = {
      ...selectedProfile,
      listWebsites: updatedWebsites
    };
    try {
      deleteWebsite(id)
      await updateProfileApi(selectedProfile._id, profileToUpdate);
      dispatch(updateProfile(profileToUpdate));
      setSelectedProfile(profileToUpdate);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleEdit = (id) => {
    setEditRowId(id);
    const website = selectedProfile.listWebsites.find(website => website.websiteId._id === id);
    setEditedRows({
      name: website.websiteId.name,
      url: website.websiteId.url,
      status: website.status,
      limitedMinutes: website.status === 'limit' ? website.limitedMinutes : '-',
    });
  };

  const handleSave = async (id) => {
    if (!selectedProfile || !editRowId || !editedRows) return;

    const websiteAfterUpdate = {
      websiteId: {
        _id: id,
        name: editedRows.name,
        url: editedRows.url,
      },
      status: selectedProfile.listWebsites.find(website => website.websiteId._id === id).status,
      limitedMinutes: selectedProfile.listWebsites.find(website => website.websiteId._id === id).status === 'limit' ? editedRows.limitedMinutes : selectedProfile.listWebsites.find(website => website.websiteId._id === id).limitedMinutes,
    };

    const updatedWebsites = selectedProfile.listWebsites.map(website =>
      website.websiteId._id === id ? websiteAfterUpdate : website
    );

    const profileToUpdate = {
      ...selectedProfile,
      listWebsites: updatedWebsites
    };

    try {
      await updateWebsite(id, { name: editedRows.name, url: editedRows.url });
      await updateProfileApi(selectedProfile._id, profileToUpdate);
      dispatch(updateProfile(profileToUpdate));
      console.log('2', profiles)
      setSelectedProfile(profileToUpdate);
      setEditRowId(null);
      setEditedRows(null);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedRows(null);
  };

  const handleFieldChange = (e, id) => {
    const { value, name } = e.target;
    if (name === 'status' && editRowId === id) {
      return;
    }
    if (name === 'limitedMinutes' && selectedProfile.listWebsites.find(website => website.websiteId._id === id).status !== 'limit') {
      return;
    }
    setEditedRows({
      ...editedRows,
      [name]: value
    });
  };

  const handleProfileUpdated = async (updatedProfile) => {
    dispatch(updateProfile(updatedProfile));
    navigate(0);
    await fetchProfiles();
    setSelectedProfile(updatedProfile);
  };

  const actions = [
    { func: handleDelete, icon: DeleteIcon, label: 'delete', condition: (id) => id !== editRowId },
    { func: handleEdit, icon: EditIcon, label: 'edit', condition: (id) => id !== editRowId },
    { func: handleSave, icon: SaveIcon, label: 'save', condition: (id) => id === editRowId },
    { func: handleCancel, icon: CancelIcon, label: 'cancel', condition: (id) => id === editRowId },
  ];

  const generateTableData = (profile) => {
    if (!profile || !profile.listWebsites || profile.listWebsites.length === 0) {
      return { headers: [], rows: [] };
    }
    const rows = profile.listWebsites
      .filter(website => website && website.websiteId)
      .map(website => ({
        id: website.websiteId ? website.websiteId._id : '',
        name: (editRowId === website.websiteId._id && editedRows) ? editedRows.name : website.websiteId.name,
        url: (editRowId === website.websiteId._id && editedRows) ? editedRows.url : website.websiteId.url,
        status: website.status || '',
        limitedMinutes: (editRowId === website.websiteId._id && editedRows)
          ? (editedRows.limitedMinutes === 0 ? '-' : editedRows.limitedMinutes)
          : (website.limitedMinutes === 0 ? '-' : website.limitedMinutes),
        Actions: 'Actions',
      }));

    return {
      headers: ['name', 'url', 'status', 'limitedMinutes', 'Actions'],
      rows: rows,
    };
  };

  return (
    <div>
      {/* <AddProfile /> */}
      <Select
        options={profiles.map((profile) => ({ text: profile.profileName, value: profile._id }))}
        title="Select a profile..."
        onChange={handleProfileSelect}
        className="custom-select"
        widthOfSelect={200}
      />
      {selectedProfile && (
        <div>
          
            <div className="alert-container">
                Hello! You have selected your {selectedProfile.profileName} profile that
                operates between {selectedProfile?.timeProfile?.start + " / " + selectedProfile?.timeProfile?.end}
                . Below are the sites that your profile contains:
                <UpdateProfileComponent profile={selectedProfile} onProfileUpdated={handleProfileUpdated} />
            </div>
          
          <TableComponent
            dataObject={generateTableData(selectedProfile)}
            widthOfTable="80%"
            widthOfColums={[200, 300, 100, 150, 200]}
            actions={actions}
            editRowId={editRowId}
            handleFieldChange={handleFieldChange}
          />
        </div>
      )}
    </div>
  );
};
export default ProfilePageComponent;
