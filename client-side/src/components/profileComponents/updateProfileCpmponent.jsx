import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box, Tooltip } from '@mui/material';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import { updateProfileApi, deleteProfileApi } from '../../services/profileService.js';
import { deleteProfile } from '../../redux/profile/profile.slice.js';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import { formatProfileData, updateFormDataWithStatusBlockedSites } from '../../utils/profileUtil.js';
import {
    INPUT_LABELS,
    SELECT_OPTIONS,
    DIALOG_TITLES,
    TOAST_MESSAGES,
    BUTTON_LABELS,
    TOOLTIP_TEXTS
} from '../../constants/profileConstants.js';

export default function UpdateProfileComponent({ profile, onProfileUpdated }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastType, setToastType] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const [formData, setFormData] = useState({
        userId: '',
        profileName: '',
        timeProfile: {
            timeStart: new Date().toISOString(),
            timeEnd: new Date().toISOString(),
        },
        statusBlockedSites: '',
        websites: []
    });

    useEffect(() => {
        if (profile) {
            setFormData(formatProfileData(profile));
        }
    }, [profile]);

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setConfirmDeleteOpen(false);
        setToastOpen(false);
    }, []);

    const handleFieldChange = useCallback((e) => {
        const { name, value } = e.target;
        if (name === "statusBlockedSites") {
            setFormData(prevState => updateFormDataWithStatusBlockedSites(prevState, value));
        } else if (name === "timeStart" || name === "timeEnd") {
            setFormData(prevState => ({
                ...prevState,
                timeProfile: {
                    ...prevState.timeProfile,
                    [name]: value
                }
            }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    }, []);

    const handleSave = useCallback(async () => {
        try {
            const updatedProfile = {
                userId: formData.userId,
                profileName: formData.profileName,
                statusBlockedSites: formData.statusBlockedSites,
                timeProfile: {
                    start: formData.timeProfile.timeStart,
                    end: formData.timeProfile.timeEnd
                },
                listWebsites: formData.websites
            };
            await updateProfileApi(profile._id, updatedProfile);
            setToastOpen(true);
            setToastType('success');
            setToastMessage(TOAST_MESSAGES.PROFILE_UPDATED_SUCCESS);
            handleClose();
            if (onProfileUpdated) onProfileUpdated({ id: profile._id, ...updatedProfile });
        } catch (error) {
            console.error('Error updating profile:', error);
            setToastOpen(true);
            setToastType('error');
            setToastMessage(TOAST_MESSAGES.PROFILE_UPDATED_ERROR);
        }
    }, [formData, profile, handleClose, onProfileUpdated]);

    const handleDelete = useCallback(async () => {
        if (profile && profile._id) {
            try {
                await deleteProfileApi(profile._id);
                dispatch(deleteProfile(profile._id));
                setToastOpen(true);
                setToastType('success');
                setToastMessage(TOAST_MESSAGES.PROFILE_DELETED_SUCCESS);
                navigate(0);
            } catch (err) {
                console.error('Error handling delete:', err);
                setToastOpen(true);
                setToastType('error');
                setToastMessage(TOAST_MESSAGES.PROFILE_DELETED_ERROR);
            }
        }
    }, [dispatch, profile]);

    const isFormValid = useCallback(() => {
        return formData.profileName.trim() !== '' &&
            formData.timeProfile.timeStart.trim() !== '' &&
            formData.timeProfile.timeEnd.trim() !== '';
    }, [formData]);

    return (
        <div>
            <Tooltip title={TOOLTIP_TEXTS.EDIT_PROFILE}>
                <GenericButton label={BUTTON_LABELS.EDIT_PROFILE} onClick={handleClickOpen} size="medium" className="profile-list-button" />
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{DIALOG_TITLES.EDIT_PROFILE}</DialogTitle>
                <DialogContent>
                    <Box mt={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Box mt={3.2}>
                                    <Tooltip title={TOOLTIP_TEXTS.PROFILE_NAME}>
                                        <GenericInput
                                            label={INPUT_LABELS.PROFILE_NAME}
                                            name="profileName"
                                            value={formData.profileName}
                                            onChange={handleFieldChange}
                                            width='100%'
                                        />
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} mt={2}>
                            <Grid item xs={12} sm={3}>
                                <Box mt={1}>
                                    <Tooltip title={TOOLTIP_TEXTS.TIME_START}>
                                        <GenericInput
                                            label={INPUT_LABELS.TIME_START}
                                            name="timeStart"
                                            value={formData.timeProfile.timeStart}
                                            onChange={handleFieldChange}
                                            type="time"
                                            width='100%'
                                        />
                                    </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Box mt={1}>
                                    <Tooltip title={TOOLTIP_TEXTS.TIME_END}>
                                        <GenericInput
                                            label={INPUT_LABELS.TIME_END}
                                            name="timeEnd"
                                            value={formData.timeProfile.timeEnd}
                                            onChange={handleFieldChange}
                                            type="time"
                                            width='100%'
                                        />
                                    </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box mt={1}>
                                    <Tooltip title={TOOLTIP_TEXTS.STATUS_BLOCKED_SITES}>
                                        <Select
                                            label={INPUT_LABELS.STATUS_BLOCKED_SITES}
                                            name="statusBlockedSites"
                                            value={formData.statusBlockedSites}
                                            onChange={handleFieldChange}
                                            options={SELECT_OPTIONS.STATUS_BLOCKED_SITES}
                                            widthOfSelect='100%'
                                        />
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Tooltip title={TOOLTIP_TEXTS.CANCEL}>
                        <GenericButton label={BUTTON_LABELS.CANCEL} onClick={handleClose} />
                    </Tooltip>
                    <Tooltip title={TOOLTIP_TEXTS.SAVE}>
                        <GenericButton
                            label={BUTTON_LABELS.SAVE}
                            onClick={handleSave}
                            disabled={!isFormValid()}
                        />
                    </Tooltip>
                    <Tooltip title={TOOLTIP_TEXTS.DELETE_PROFILE}>
                        <GenericButton
                            label={BUTTON_LABELS.DELETE_PROFILE}
                            onClick={() => setConfirmDeleteOpen(true)}
                            color="error"
                        />
                    </Tooltip>
                </DialogActions>
            </Dialog>
            <Dialog open={confirmDeleteOpen} onClose={handleClose}>
                <DialogTitle>{DIALOG_TITLES.CONFIRM_DELETE}</DialogTitle>
                <DialogActions>
                    <Tooltip title={TOOLTIP_TEXTS.CANCEL}>
                        <GenericButton label={BUTTON_LABELS.CANCEL} onClick={handleClose} />
                    </Tooltip>
                    <Tooltip title={TOOLTIP_TEXTS.DELETE}>
                        <GenericButton
                            label={BUTTON_LABELS.DELETE}
                            onClick={handleDelete}
                            color="error"
                        />
                    </Tooltip>
                </DialogActions>
            </Dialog>
            <ToastMessage
                open={toastOpen}
                type={toastType}
                message={toastMessage}
                onClose={handleClose}
            />
        </div>
    );
}
