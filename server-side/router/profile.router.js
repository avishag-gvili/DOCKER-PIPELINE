import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile, getProfilesByUserId} from '../controllers/profile.controller.js'

const profileRouter=express.Router();
profileRouter.get('/',getAllProfiles);
profileRouter.get('/:id',getProfileById);
profileRouter.post('/',createProfile);
profileRouter.delete('/:id',deleteProfile);
profileRouter.put('/:id', updateProfile);
profileRouter.get('/userId/ID/:id', getProfilesByUserId);
export default profileRouter;

