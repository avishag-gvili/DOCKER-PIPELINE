// selectors.js

/**
 * @typedef {Object} RootState
 * @property {AuthStateType} auth
 */

/**
 * @typedef {Object} AuthStateType
 * @property {AuthUser | null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} isInitialized
 */

/**
 * Selects the auth state from the root state.
 * 
 * @param {RootState} state - The current Redux state.
 * @returns {AuthStateType} The auth state.
 */
export const selectAuth = (state) => state.auth;
