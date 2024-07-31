import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from '../../stories/Select/Select.jsx';
import TableComponent from '../../stories/table/TableComponent.jsx';
import { updateProfileApi, getProfilesByUserId } from '../../services/profileService.js';
import { deleteWebsite, updateWebsite,createWebsite } from '../../services/websiteService.js';
import { useAppSelector } from '../../redux/store.jsx';
import { setProfiles, updateProfile } from '../../redux/profile/profile.slice.js';
import { selectProfile } from '../../redux/profile/profile.selector.js';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import AddProfileComponent from './addProfileComponent.jsx';
import UpdateProfileComponent from './updateProfileCpmponent.jsx';
import ProfileActivationTimer from './profileActivationComponent.jsx';
import { getStatusOptions } from '../../utils/profileUtil.js';
import '../../styles/profilePageStyle.scss';

const ProfilePageComponent = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editedRows, setEditedRows] = useState(null);
  const [time, setTime] = useState(0);
  const profiles = useAppSelector(selectProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusOptions = selectedProfile ? getStatusOptions(selectedProfile.statusBlockedSites) : [];

  const fetchProfiles = async () => {
    try {
      const userId = '6698da056e5c07ebd3c11ec1';
      const profileData = await getProfilesByUserId(userId);
      dispatch(setProfiles(profileData));
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
    const start = parseTimeStringToDate(profile.timeProfile.start);
    const end = parseTimeStringToDate(profile.timeProfile.end);
    const durationMinutes = (end - start) / 1000 / 60;
    if (durationMinutes >= 0) {
      setTime(durationMinutes);
    } else {
      setTime(durationMinutes * -1);
    }

  };

  function parseTimeStringToDate(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  const handleDelete = async (id) => {
    const updatedWebsites = selectedProfile.listWebsites.filter(website => website.websiteId._id !== id);
    const profileToUpdate = {
      ...selectedProfile,
      listWebsites: updatedWebsites
    };
    try {
      await deleteWebsite(id);
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
      limitedMinutes: website.status === 'limit' ? website.limitedMinutes : 0,
    });
  };

  const handleSave = async (id) => {
    if (!selectedProfile || !editRowId || !editedRows ||
      (editedRows.status === 'limit' && editedRows.limitedMinutes === 0)
    ) return;

    if ((editRowId === 'new')&&(editedRows.url===''||editedRows.status===''))return;

    let updatedWebsites;
    if (editRowId === 'new') {
        try {
            const response = await createWebsite({
                name: editedRows.name,
                url: editedRows.url
            });
            const newWebsiteId = response._id;

            const newWebsite = {
                websiteId: {
                    _id: newWebsiteId,
                    name: editedRows.name,
                    url: editedRows.url
                },
                status: editedRows.status,
                limitedMinutes: editedRows.limitedMinutes
            };

            updatedWebsites = [...selectedProfile.listWebsites, newWebsite];
        } catch (err) {
            console.error('Error creating new website:', err);
            return;
        }
    } else {
        const websiteAfterUpdate = {
            websiteId: {
                _id: id,
                name: editedRows.name,
                url: editedRows.url,
            },
            status: editedRows.status,
            limitedMinutes: editedRows.limitedMinutes
        };

        updatedWebsites = selectedProfile.listWebsites.map(website =>
            website.websiteId._id === id ? websiteAfterUpdate : website
        );
    }

    const profileToUpdate = {
        ...selectedProfile,
        listWebsites: updatedWebsites
    };

    try {
        if (editRowId !== 'new') {
            await updateWebsite(id, { name: editedRows.name, url: editedRows.url });
        }
        await updateProfileApi(selectedProfile._id, profileToUpdate);
        dispatch(updateProfile(profileToUpdate));
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

  const handleFieldChange = (e) => {
    debugger
    const { value, name } = e.target;
    if (name === 'limitedMinutes' && editedRows.status !== 'limit') {
      return;
    }
    let updatedRows = { ...editedRows, [name]: value };

    if (name === 'status' && (value === 'open' || value === 'block')) {
      updatedRows = { ...updatedRows, limitedMinutes: 0 };
    }
    setEditedRows(updatedRows);
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
    const headers = Object.keys(profile.listWebsites[0].websiteId)
        .filter(header => header !== '_id' && header !== '__v')
    headers.push('status', 'limitedMinutes', 'Actions');
    const rows = profile.listWebsites.map((website) => {
        const isEditing = editRowId === website.websiteId._id;
        const row = {};
        headers.forEach((header) => {
            if (header in website.websiteId) {
                row[header] = isEditing && editedRows ? editedRows[header] : website.websiteId[header];
            } else if (header in website) {
                row[header] = isEditing && editedRows ? editedRows[header] : website[header];
            }
        });

        row.Actions = actions.filter(action => action.condition(website.websiteId._id));
        return { ...row, id: website.websiteId._id };
    });
    if (editRowId === 'new') {
        const newRow = { id: 'new' };
        headers.forEach(header => {
            newRow[header] = editedRows ? editedRows[header] : '';
        });
        rows.push(newRow);
    }

    return { headers, rows };
};

  const handleAddRow = () => {
    setEditRowId('new');
    setEditedRows({
      name: '',
      url: '',
      status: '',
      limitedMinutes: 0,
    });
  };
  return (
    <div className="profile-list-container">
      <div className="profile-list-select-wrapper">
        <div className="component-add">
          <AddProfileComponent />
        </div>
        <Select
          options={profiles.map((profile) => ({ text: profile.profileName, value: profile._id }))}
          onChange={handleProfileSelect}
          className="profile-list-select"
        />
        {time !== 0 &&
          <div className='timer'>
            <ProfileActivationTimer profileActivationTime={time} />
          </div>}
        {selectedProfile &&
          <div className="component-update">
            <UpdateProfileComponent profile={selectedProfile} onProfileUpdated={handleProfileUpdated} />
          </div>}
      </div>
      {loading ? (
        <div className="profile-list-loading">Loading profiles...</div>
      ) : selectedProfile ? (
        <div className="profile-list-details">
          <h1>
            Hello! You have selected your {selectedProfile.profileName} profile that
            operates between <br />
            {selectedProfile?.timeProfile?.start + " / " + selectedProfile?.timeProfile?.end}
            . Below are the sites that your profile contains:
          </h1>

          <TableComponent
            dataObject={generateTableData(selectedProfile)}
            widthOfTable="80%"
            widthOfColums={[200, 300, 100, 150, 200]}
            actions={actions}
            editRowId={editRowId}
            handleFieldChange={handleFieldChange}
            statusOptions={statusOptions}
            addButton={true}
            handleAddRow={handleAddRow}
          />
        </div>
      ) : (
        <h1>No profile selected</h1>
      )}
    </div>
  );
};

export default ProfilePageComponent;