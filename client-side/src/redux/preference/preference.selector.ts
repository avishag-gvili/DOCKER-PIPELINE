import { RootState } from "../Store";

export const selectPreference= (state: RootState) => state.preference.preferences
