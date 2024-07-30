import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box, Tooltip } from '@mui/material';
import { createWebsite } from '../../services/websiteService.js';
import { updateProfileApi } from '../../services/profileService.js';
import { updateProfile } from '../../redux/profile/profile.slice.js';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import { getStatusOptions, extractWebsiteName } from '../../utils/profileUtil.js';
import {
  INPUT_LABELS,
  DIALOG_TITLES,
  BUTTON_LABELS,
  TOOLTIP_TEXTS
} from '../../constants/profileConstants.js';

const AddWebsite = ({ profile }) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    url: '',
    status: profile.statusBlockedSites === 'limit' ? 'block' : 'open',
    limitedMinutes: 0
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusOptions = getStatusOptions(profile.statusBlockedSites);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => {
      const updatedFormState = {
        ...prevState,
        [name]: value
      };

      if (name === 'url') {
        updatedFormState.name = extractWebsiteName(value);
      }

      return updatedFormState;
    });
  };

  const handleAddWebsite = async () => {
    try {
      const { name, url, status, limitedMinutes } = formState;
      const newWebsite = await createWebsite({ name, url });
      const updatedWebsites = [
        ...profile.listWebsites,
        {
          websiteId: newWebsite._id,
          name: name,
          url: url,
          status: status,
          limitedMinutes: status === 'limit' ? limitedMinutes : 0
        }
      ];
      const updatedProfile = {
        ...profile,
        listWebsites: updatedWebsites
      };
      await updateProfileApi(profile._id, updatedProfile);
      dispatch(updateProfile(updatedProfile));
      handleClose();
      navigate(0);
    } catch (error) {
      console.error('Failed to add website:', error);
    }
  };

  return (
    <div>
      <Tooltip title={TOOLTIP_TEXTS.ADD_WEBSITE}>
        <GenericButton label={BUTTON_LABELS.ADD_WEBSITE} onClick={handleClickOpen} size="medium" className="profile-list-button" />
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{DIALOG_TITLES.ADD_WEBSITE}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Tooltip title={TOOLTIP_TEXTS.WEBSITE_NAME}>
                <GenericInput
                  label={INPUT_LABELS.WEBSITE_NAME}
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  width='100%'
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title={TOOLTIP_TEXTS.URL}>
                <GenericInput
                  label={INPUT_LABELS.URL}
                  type="url"
                  name="url"
                  value={formState.url}
                  onChange={handleInputChange}
                  width='100%'
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title={TOOLTIP_TEXTS.STATUS}>
                <Select
                  title={INPUT_LABELS.STATUS}
                  name="status"
                  options={statusOptions}
                  value={formState.status}
                  onChange={handleInputChange}
                  widthOfSelect='4cm'
                />
              </Tooltip>
            </Grid>
            {formState.status === 'limit' && (
              <Grid item xs={12} sm={6}>
                <Tooltip title={TOOLTIP_TEXTS.LIMIT_MINUTES}>
                  <GenericInput
                    label={INPUT_LABELS.LIMIT_MINUTES}
                    type="number"
                    name="limitedMinutes"
                    value={formState.limitedMinutes}
                    onChange={handleInputChange}
                    width='100%'
                  />
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Tooltip title={TOOLTIP_TEXTS.CANCEL}>
            <GenericButton onClick={handleClose} label={BUTTON_LABELS.CANCEL} size="medium" className="profile-list-button" />
          </Tooltip>
          <Tooltip title={TOOLTIP_TEXTS.SAVE}>
            <GenericButton onClick={handleAddWebsite} label={BUTTON_LABELS.SAVE} size="medium" className="profile-list-button" />
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddWebsite;
