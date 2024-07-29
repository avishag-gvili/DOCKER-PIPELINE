export const INPUT_LABELS = {
    PROFILE_NAME: 'Profile Name',
    TIME_START: 'Time Start',
    TIME_END: 'Time End',
    STATUS_BLOCKED_SITES: 'Status Blocked Sites',
    WEBSITE_NAME: 'Website Name',
    URL: 'URL',
    LIMIT_MINUTES: 'Limit Minutes'
};

export const SELECT_OPTIONS = {
    STATUS_BLOCKED_SITES: [
        { label: 'Black List',text: 'Black List', value: 'black list' },
        { label: 'White List', text: 'White List',  value: 'white list' }
    ],
    WEBSITE_STATUS_BLOCK: [
        { text: 'open', value: 'open' },
        { text: 'limit', value: 'limit' },
    ],
    WEBSITE_STATUS_OPEN: [
        { text: 'limit', value: 'limit' },
        { text: 'blocked', value: 'blocked' }
    ]
};

export const BUTTON_LABELS = {
    EDIT_PROFILE: 'Edit Profile',
    ADD_WEBSITE: 'Add Website',
    CANCEL: 'Cancel',
    DELETE_PROFILE: 'Delete Profile',
    SAVE: 'Save',
    DELETE: 'Delete',
    ADDING: 'Adding'

};

export const DIALOG_TITLES = {
    ADD_PROFILE: 'Add a new profile',
    EDIT_PROFILE: 'Edit Profile',
    CONFIRM_DELETION: 'Confirm Deletion',
    PROFILE_TIME:' Enter profile start time and profile end time',
    CREATE_FORM:'  To create a new profile please enter the required data.',
    NEW_PROFILE:'New profile',
    ADD_WEBSITE:'Enter the URL of the site you want to add, select a site status and add to your list of sites',
    STATUS_LIST:'Choose a white/black list to set how the sites are blocked.'
};

export const TOAST_MESSAGES = {
    PROFILE_UPDATED_SUCCESS: 'Profile updated successfully!',
    PROFILE_UPDATED_ERROR: 'Error updating profile!',
    PROFILE_DELETED_SUCCESS: 'Profile deleted successfully!',
    PROFILE_DELETED_ERROR: 'Error deleting profile!',
    TYPE_LIST_CHANGE_ERROR: 'You cannot change the list type after adding URLs.'
};

export const VALIDATE_MESSAGES = {
    PROFILE_NAME_SHORT: 'Name must be at least 2 characters long.',
    PROFILE_NAME_LONG: 'Name cannot be more than 50 characters long.'
};

export const CONSOLE_MESSAGES = {
    PROFILE_CREATE_ERROR: 'Error creating profile:',
};
export const TOOLTIP_MESSAGES = {
    FORM_NOT_FILLED: 'The button is disabled because not all fields are filled.',
};
