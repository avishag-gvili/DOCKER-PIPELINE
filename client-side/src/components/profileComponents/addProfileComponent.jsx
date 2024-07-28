import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import Select from '../../stories/Select/Select.jsx';
import { createWebsite } from '../../services/websiteService.js';
import { addProfile } from '../../redux/profile/profile.slice.js';
import { createProfile } from '../../services/profileService.js';
import TableComponent from '../../stories/table/TableComponent.jsx';
import RadioButton from '../../stories/RadioButton/radio-Button.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import '../../styles/profilePageStyle.scss';

export default function AddProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    timeStart: '00:00',
    timeEnd: '00:00',
    status: '',
    url: '',
    urlTimeLimit: 0,
    urlStatus: ''
  });
  const [dataToast, setdataToast] = useState({
    open: false,
    message: 'nj',
    type: 'error',

  }
  );
  const handleCloseToast = () => {
    setdataToast({ open: false });
  };

  const [arrUrl, setArrUrl] = useState([]);
  const [nameHelperText, setNameHelperText] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };


  const optionsRadioButton = [
    { value: 'isWhiteList', label: 'white list' },
    { value: 'isBlackList', label: 'black list' }
  ];

  const handleClose = () => {
    setData({
      name: '',
      timeStart: '00:00',
      timeEnd: '00:00',
      status: '',
      url: '',
      urlTimeLimit: 0,
      urlStatus: '',
    });
    setArrUrl([]);
    setOpen(false);
  };

  const options = {
    black: [
      { text: 'open', value: 'open' },
      { text: 'limit', value: 'limit' }
    ],
    white: [
      { text: 'blocked', value: 'blocked' },
      { text: 'limit', value: 'limit' }
    ]
  };

  const handleChange = (e) => {
    console.log(e.target.name)
    if (e.target.name == ':rd:') {
      e.target.name = 'status'
    }
    const { name, value } = e.target;
    if (name === 'status') {
      if (arrUrl.length > 0 && value !== data.status && data.status !== '') {
        setdataToast({ open: true, message: 'You cannot change the list type after adding URLs.', type: 'error' });
        return;
      }

      if (data.status === 'isBlackList') {
      }
    }

    const adjustedName = ['limit', 'open', 'blocked'].includes(value) ? 'urlStatus' : name;
    setData(prevData => ({
      ...prevData,
      [adjustedName]: value
    }));

    if (name === 'name') {
      const validationMessage = validateName(value);
      setNameHelperText(validationMessage);
    }
  };

  const validateName = (inputValue) => {
    if (inputValue.length < 2) {
      return 'Name must be at least 2 characters long.';
    } else if (inputValue.length > 50) {
      return 'Name cannot be more than 50 characters long.';
    }
    return '';
  };

  const handleAddUrl = async (event) => {
    try {
      const parsedUrl = new URL(data.url);
      const dataWebsites = {
        name: parsedUrl.hostname,
        url: data.url
      };
      if (arrUrl.some(item => item.url === data.url)) {
        setdataToast({ open: true, message: 'URL already exists in the list.', type: 'error' });
        return;
      }
      const newWebsites = await createWebsite(dataWebsites);
      setArrUrl([{ id: newWebsites._id, url: data.url, urlStatus: data.urlStatus, urlTimeLimit: data.urlTimeLimit }, ...arrUrl]);
      setData({ ...data, url: '', urlStatus: '', urlTimeLimit: 0 });

    } catch (e) {
      setdataToast({ open: true, message: 'Invalid URL', type: 'error' });
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = '669df26ef8a111309dc9e862';
    const profileData = {
      userId: userId,
      profileName: data.name,
      statusBlockedSites: data.status === 'isWhiteList' ? 'white list' : 'black list',
      listWebsites: arrUrl.map(url => ({
        websiteId: url.id,
        status: url.urlStatus === 'blocked' ? 'block' : url.urlStatus,
        limitedMinutes: url.urlStatus === 'limit' ? url.urlTimeLimit : 0,
      })),
      timeProfile: {
        start: data.timeStart,
        end: data.timeEnd,
      }
    };
    try {
      await createProfile(profileData);
      dispatch(addProfile(profileData));
      navigate(0);
      handleClose();
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const tableData = {
    headers: ['URL', 'Status', 'Time Limit'],
    rows: arrUrl.map((item, index) => ({
      id: index,
      URL: item.url,
      Status: item.urlStatus,
      'Time Limit': item.urlStatus === 'limit' ? item.urlTimeLimit : '-'
    }))

  };

  return (
    <React.Fragment>
      <GenericButton label="Add a new profile" variant="outlined" className="profile-list-button" onClick={handleClickOpen} size="medium">
      </GenericButton>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>New profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new profile please enter the required data.
          </DialogContentText>
          <ToastMessage open={dataToast.open} type={dataToast.type} message={dataToast.message} onClose={handleCloseToast} />
          <GenericInput
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            size="small"
            width='60%'
            label="name"
            validation={validateName}
            error={!!nameHelperText}
            helperText={<span style={{ color: 'red' }}>{nameHelperText}</span>}
          />
          <div className='div-time'>
            <GenericInput
              name="timeStart"
              type="time"
              value={data.timeStart}
              onChange={handleChange}
              width='100%'
            />
            <GenericInput
              name="timeEnd"
              type="time"
              value={data.timeEnd}
              onChange={handleChange}
               width='100%'
            />
          </div>
          <div>
            <RadioButton
              name={'status'}
              options={optionsRadioButton}
              selectedOption={data.status}
              onChange={handleChange}
            />
            <div className='divAddUrl'>
              <GenericInput
                name="url"
                size="small"
                type="text"
                value={data.url}
                onChange={handleChange}
                width="100%"
                label="url"
              />
              <Select
                size="small"
                options={data.status === 'isWhiteList' ? options.white : options.black}
                value={data.urlStatus}
                onChange={handleChange}
                title="Site Status"
                className="profile-select"
              />
              {data.urlStatus === 'limit' ? (
                <GenericInput
                  name="urlTimeLimit"
                  type="number"
                  onChange={handleChange}
                  value={data.urlTimeLimit}
                  size="small"
                  width="40%"
                  label="Time"
                  min={0}
                />
              ) : null}
              <GenericButton label="add url" size="medium" className="" onClick={handleAddUrl} disabled={!data.url || !data.urlStatus} />
            </div>
            {(arrUrl.length > 0) ? (
              <TableComponent
                dataObject={tableData}
                widthOfTable="90%"
                widthOfColums={[200, 100, 150]}
              />) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          {(!data.name || data.name.length < 2 || data.name.length > 50 || !data.status) ? (
            <Tooltip title="The button is disabled because not all fields are filled.">
              <span>
                <Button color="success" type="submit" disabled={!data.name || data.name.length < 2 || data.name.length > 50 || !data.status}>
                  adding
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button color="success" type="submit">
              adding
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}