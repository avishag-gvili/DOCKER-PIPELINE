import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import { updateProfileApi, deleteProfileApi } from '../../services/profileService.js';
import { createWebsite, updateWebsite } from '../../services/websiteService.js';
import { deleteProfile } from '../../redux/profile/profile.slice.js';
import { useDispatch } from 'react-redux';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
export default function UpdateProfileComponent({ profile, onProfileUpdated }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastType, setToastType] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const [formData, setFormData] = useState({
        userId: '',
        profileName: 'Default Profile Name',
        timeProfile: {
            timeStart: new Date().toISOString(),
            timeEnd: new Date().toISOString(),
        },
        statusBlockedSites: '',
        websites: [
            {
                id: '',
                name: '',
                url: '',
                status: '',
                limitedMinutes: 0
            }
        ],
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                id: profile._id,
                userId: profile.userId,
                profileName: profile.profileName || 'Default Profile Name',
                timeProfile: {
                    timeStart: profile?.timeProfile?.start || '00:00',
                    timeEnd: profile?.timeProfile?.end || '00:00'
                },
                statusBlockedSites: profile.statusBlockedSites || 'black list',
                websites: profile.listWebsites.map((website, index) => ({
                    index: index,
                    websiteId: website.websiteId._id,
                    name: website.websiteId.name,
                    url: website.websiteId.url,
                    status: website.status || 'open',
                    limitedMinutes: website.limitedMinutes || 0
                }))
            });
        }
    }, [profile]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setConfirmDeleteOpen(false);
        setToastOpen(false);
    };

    const getStatusOptions = () => {
        const { statusBlockedSites } = formData;

        if (statusBlockedSites === 'black list') {
            return [
                { text: 'Open', value: 'open' },
                { text: 'Limit', value: 'limit' }
            ];
        } else if (statusBlockedSites === 'white list') {
            return [
                { text: 'Block', value: 'block' },
                { text: 'Limit', value: 'limit' }
            ];
        }
        return [
            { text: 'Block', value: 'block' },
            { text: 'Open', value: 'open' },
            { text: 'Limit', value: 'limit' }
        ];
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        if (name === "statusBlockedSites") {
            setFormData(prevState => {
                const updatedWebsites = prevState.websites.map(website => {
                    if (website.status === 'limit') {
                        return website;
                    }
                    return {
                        ...website,
                        status: value === 'black list' ? 'open' : 'block'
                    };
                });

                return {
                    ...prevState,
                    statusBlockedSites: value,
                    websites: updatedWebsites
                };
            });
        } else if (name === "timeStart" || name === "timeEnd") {
            setFormData(prevState => ({
                ...prevState,
                timeProfile: {
                    ...prevState.timeProfile,
                    [name]: value
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleWebsiteChange = (e, index) => {
        const { name, value } = e.target;

        setFormData(prevState => {
            const updatedWebsites = [...prevState.websites];
            const updatedWebsite = {
                ...updatedWebsites[index],
                [name]: value
            };
            if (name === 'url') {
                try {
                    const parsedUrl = new URL(value);
                    updatedWebsite.name = parsedUrl.hostname;
                } catch (error) {
                    console.error('Invalid URL:', value, error);
                }
            }
            updatedWebsites[index] = updatedWebsite;
            return {
                ...prevState,
                websites: updatedWebsites
            };
        });
    };

    const handleAddWebsite = () => {
        setFormData(prevState => ({
            ...prevState,
            websites: [...prevState.websites, {
                id: '',
                name: '',
                url: '',
                status: '',
                limitedMinutes: 0
            }]
        }));
    };

    const handleSave = async () => {
        try {
            const updatedWebsites = await Promise.all(formData.websites.map(async (website) => {
                if (!website.websiteId || website.websiteId === '') {
                    const newWebsite = await createWebsite({ name: website.name, url: website.url });
                    return {
                        websiteId: newWebsite._id,
                        name: website.name,
                        url: website.url,
                        status: website.status,
                        limitedMinutes: website.limitedMinutes
                    };
                } else {
                    const updatedWebsiteData = {
                        name: website.name,
                        url: website.url,
                        status: website.status,
                        limitedMinutes: website.limitedMinutes
                    };
                    await updateWebsite(website.websiteId, updatedWebsiteData);
                    return {
                        websiteId: website.websiteId,
                        ...updatedWebsiteData
                    };
                }
            }));

            const updatedProfile = {
                userId: formData.userId,
                profileName: formData.profileName,
                statusBlockedSites: formData.statusBlockedSites,
                listWebsites: updatedWebsites,
                timeProfile: {
                    start: formData.timeProfile.timeStart,
                    end: formData.timeProfile.timeEnd
                },
            };
            await updateProfileApi(profile._id, updatedProfile);
            setToastOpen(true);
            setToastType('success');
            setToastMessage('Profile updated successfully!');
            handleClose();
            if (onProfileUpdated) onProfileUpdated({ id: profile._id, ...updatedProfile });
        } catch (error) {
            console.error('Error updating profile:', error);
            setToastOpen(true);
            setToastType('error');
            setToastMessage('Error updating profile!');
        }
    };

    const handleDelete = async () => {
        if (profile && profile._id) {
            try {
                await deleteProfileApi(profile._id);
                dispatch(deleteProfile(profile._id));
                setToastOpen(true);
                setToastType('error');
                setToastMessage('Profile deleted successfully!');
            } catch (err) {
                console.error('Error handling delete:', err);
                setToastOpen(true);
                setToastType('error');
                setToastMessage('Error deleting profile!');
            }
        }
    };

    const isFormValid = () => {
        return formData.profileName.trim() !== '' &&
            formData.timeProfile.timeStart.trim() !== '' &&
            formData.timeProfile.timeEnd.trim() !== '';
    };

    return (
        <div>
            <GenericButton label='Edit Profile'onClick={handleClickOpen} size = "medium" className="profile-list-button"/>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <Box sx={{ flexGrow: 1 }} ml={15}>
                        <Grid container spacing={2}>
                            <Grid item xs={1} sm={3}>
                                <Box mt={3.2}>
                                    <GenericInput
                                        label="Profile Name"
                                        name="profileName"
                                        value={formData.profileName}
                                        onChange={(e) => handleFieldChange(e)}
                                        width='100%'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={1} sm={2}>
                                <Box mt={3.2}>
                                    <GenericInput
                                        name="timeStart"
                                        type="time"
                                        value={formData.timeProfile.timeStart}
                                        onChange={(e) => handleFieldChange(e)}
                                        width='100%'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={1} sm={2}>
                                <Box mt={3.2}>
                                    <GenericInput
                                        name="timeEnd"
                                        type="time"
                                        value={formData.timeProfile.timeEnd}
                                        onChange={(e) => handleFieldChange(e)}
                                        width='100%'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={1} sm={2}>
                                <Box mt={3.2}>
                                    <Select
                                        name="statusBlockedSites"
                                        label="Status Blocked Sites"
                                        value={formData.statusBlockedSites}
                                        onChange={(e) => handleFieldChange(e)}
                                        options={[
                                            { text: 'Black List', value: 'black list' },
                                            { text: 'White List', value: 'white list' }
                                        ]}
                                        widthOfSelect='4.5cm'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box mt={3.2}>
                                    {formData.websites.map((website, index) => (
                                        <Box key={index} mb={2}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={2}>
                                                    <GenericInput
                                                        label="Website Name"
                                                        name="name"
                                                        value={website.name}
                                                        onChange={(e) => handleWebsiteChange(e, index)}
                                                        width='100%'
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <GenericInput
                                                        label="URL"
                                                        name="url"
                                                        value={website.url}
                                                        onChange={(e) => handleWebsiteChange(e, index)}
                                                        width='100%'
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Select
                                                        name="status"
                                                        value={website.status}
                                                        onChange={(e) => handleWebsiteChange(e, index)}
                                                        options={getStatusOptions()}
                                                         widthOfSelect='2.5cm'
                                                    />
                                                </Grid>
                                                {website.status === 'limit' && (
                                                    <Grid item sm={2}>
                                                        <GenericInput
                                                            label="Limit Minutes"
                                                            name="limitedMinutes"
                                                            type="number"
                                                            value={website.limitedMinutes}
                                                            onChange={(e) => handleWebsiteChange(e, index)}
                                                            width='100%'
                                                        />
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Box>
                                    ))}
                                    <Button
                                        variant="outlined"
                                        onClick={handleAddWebsite}
                                    >
                                        Add Website
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="success"
                        disabled={!isFormValid()}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => setConfirmDeleteOpen(true)}
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this profile?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleDelete();
                            setConfirmDeleteOpen(false);
                        }}
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastMessage
                open={toastOpen}
                onClose={handleClose}
                type={toastType}
                message={toastMessage}
            />
        </div>
    );
}