import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import Select from '../../stories/Select/Select.jsx';
import { addProfile } from '../../redux/profile/profile.slice.js';
import { createProfile } from '../../services/profileService.js';
import TableComponent from '../../stories/table/TableComponent.jsx';
import RadioButton from '../../stories/RadioButton/radio-Button.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import { handleAddUrl } from '../../utils/profileUtil.js';
import { SELECT_OPTIONS,INPUT_LABELS,DIALOG_TITLES, TOAST_MESSAGES, VALIDATE_MESSAGES, CONSOLE_MESSAGES, BUTTON_LABELS, TOOLTIP_MESSAGES } from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';

export default function AddProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(getInitialData());
  const [dataToast, setDataToast] = useState(getInitialToastData());
  const [URLSUser, setURLSUser] = useState([]);
  const [errorText, setErrorText] = useState('');

  function getInitialData() {
    return {
      name: '',
      timeStart: '00:00',
      timeEnd: '00:00',
      status: '',
      url: '',
      urlTimeLimit: 0,
      urlStatus: ''
    };
  }

  function getInitialToastData() {
    return {
      open: false,
      message: '',
      type: 'error',
    };
  }

  const handleCloseToast = useCallback(() => {
    setDataToast({ open: false });
  }, []);

  const handleClickOpen = useCallback(() => {
    setData(getInitialData());
    setURLSUser([]);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleAddUrlWrapper = useCallback((event) => {
    handleAddUrl(data, URLSUser, setURLSUser, setDataToast, setData);
  }, [data, URLSUser]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log(name,value);
    if (name === 'status') {
      if (URLSUser.length > 0 && value !== data.status && data.status !== '') {
        setDataToast({ open: true, message: TOAST_MESSAGES.TYPE_LIST_CHANGE_ERROR, type: 'error' });
        return;
      }
    }
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'name') {
      const validationMessage = validateName(value);
      setErrorText(validationMessage);
    }
  }, [data.status, URLSUser]);

  const validateName = (inputValue) => {
    if (inputValue.length < 2) {
      return VALIDATE_MESSAGES.PROFILE_NAME_SHORT;
    } else if (inputValue.length > 50) {
      return VALIDATE_MESSAGES.PROFILE_NAME_LONG;
    }
    return '';
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const userId = '6698da056e5c07ebd3c11ec1';
    const profileData = {
      userId: userId,
      profileName: data.name,
      statusBlockedSites: data.status === 'isWhiteList' ? 'white list' : 'black list',
      listWebsites: URLSUser.map(url => ({
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
      console.error(CONSOLE_MESSAGES.PROFILE_CREATE_ERROR, error);
    }
  }, [data, URLSUser, dispatch, navigate, handleClose]);

  const tableData = {
    headers: ['URL', 'Status', 'Time Limit'],
    rows: URLSUser.map((item, index) => ({
      id: index,
      URL: item.url,
      Status: item.urlStatus,
      'Time Limit': item.urlStatus === 'limit' ? item.urlTimeLimit : '-'
    }))
  };

  return (
    <React.Fragment>
      <GenericButton label={DIALOG_TITLES.ADD_PROFILE} variant="outlined" className="profile-list-button" onClick={handleClickOpen} size="medium">
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
        <DialogTitle>{BUTTON_LABELS.NEW_PROFILE}</DialogTitle>
        <DialogContent>
          <DialogContentText className='dialog-content-text'>
          {DIALOG_TITLES.CREATE_FORM}         
           </DialogContentText>
          <ToastMessage open={dataToast.open} type={dataToast.type} message={dataToast.message} onClose={handleCloseToast} />
          <GenericInput
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            size="small"
            width='60%'
            label={INPUT_LABELS.PROFILE_NAME}
            validation={validateName}
            error={!!errorText}
            helperText={<span style={{ color: 'red' }}>{errorText}</span>}
          />
          <DialogContentText className='dialog-content-text'>{DIALOG_TITLES.PROFILE_TIME} </DialogContentText>
          <div className='div-time'>
            <GenericInput
              label={INPUT_LABELS.TIME_START}
              name="timeStart"
              type="time"
              value={data.timeStart}
              onChange={handleChange}
              width='100%'
            />
            <GenericInput
              label={INPUT_LABELS.TIME_END}
              name="timeEnd"
              type="time"
              value={data.timeEnd}
              onChange={handleChange}
              width='100%'
            />
          </div>
          <div>
          <DialogContentText className='dialog-content-text'>{DIALOG_TITLES.STATUS_LIST} </DialogContentText>

            <RadioButton
              name="status"
              options={SELECT_OPTIONS.STATUS_BLOCKED_SITES}
              selectedOption={data.status}
              onChange={handleChange}
            />
          <DialogContentText className='dialog-content-text'>{DIALOG_TITLES.ADD_WEBSITE}</DialogContentText>

            <div className='divAddUrl'>
              <GenericInput
                name="url"
                size="small"
                type="text"
                value={data.url}
                onChange={handleChange}
                width="100%"
                label={INPUT_LABELS.URL}
              />
              <Select
                name='urlStatus'
                size="small"
                options={data.status === 'isWhiteList' ? SELECT_OPTIONS.WEBSITE_STATUS_OPEN : SELECT_OPTIONS.WEBSITE_STATUS_BLOCK}
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
                  label={INPUT_LABELS.LIMIT_MINUTES}
                  min={0}
                />
              ) : null}
              <GenericButton label={BUTTON_LABELS.ADD_WEBSITE} size="medium" className="" onClick={handleAddUrlWrapper} disabled={!data.url || !data.urlStatus} />
            </div>
            {(URLSUser.length > 0) ? (
              <TableComponent
                dataObject={tableData}
                widthOfTable="90%"
                widthOfColums={[200, 100, 150]}
              />) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
          {BUTTON_LABELS.CANCEL}
          </Button>
          {(!data.name || data.name.length < 2 || data.name.length > 50 || !data.status) ? (
            <Tooltip title={TOOLTIP_MESSAGES.FORM_NOT_FILLED}>
              <span>
                <Button color="success" type="submit" disabled={!data.name || data.name.length < 2 || data.name.length > 50 || !data.status}>
                {BUTTON_LABELS.ADDING}
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button color="success" type="submit">
              {BUTTON_LABELS.ADDING}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
