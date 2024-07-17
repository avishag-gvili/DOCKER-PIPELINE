/**
 * @typedef {Object} RootState
 * @property {ProfileStateType} profile
 */

/**
 * @typedef {Object} ProfileStateType
 * @property {Profile[]} profiles
 */

/**
 * Selects the profiles array from the state.
 * 
 * @param {RootState} state - The current Redux state.
 * @returns {Profile[]} The array of profiles.
 */
export const selectProfile = (state) => state.profile.profiles;
