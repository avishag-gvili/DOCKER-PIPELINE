import axiosInstance from '../axios/axios.js';

export const getAllProfiles = async () => {
    try {
        const response = await axiosInstance.get('/profiles');
        return response.data;
    } catch (err) {
        console.error('Error getting all profiles:', err);
        throw err;
    }
};

export const createProfile = async (profileData) => {
    try {
        const response = await axiosInstance.post('/profiles', profileData);
        return response.data;
    } catch (err) {
        console.error('Error creating profile:', err);
        throw err;
    }
};

export const getProfileById = async (id) => {
    try {
        const response = await axiosInstance.get(`/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting profile with id ${id}:`, err);
        throw err;
    }
};


export const updateProfileApi = async (id, profileData) => {
    try {
        const response = await axiosInstance.put(`/profiles/${id}`, profileData);
        return response.data;
    } catch (err) {
        console.error(`Error updating profile with id ${id}:`, err);
        throw err;
    }
};

export const getProfilesByUserId = async (id) => {
    try {
        const response = await axiosInstance.get(`/profiles/user/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting profiles for user ${id}:`, err);
        throw err;
    }
};

export const deleteProfileApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error deleting profile with id ${id}:`, err);
        throw err;
    }
};

