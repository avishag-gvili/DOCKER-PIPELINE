import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile} from '../controllers/profile.controller.js'

const profilesRouter=express.Router();
<<<<<<< HEAD
=======

>>>>>>> mongoDB-team
profilesRouter.get('/',getAllProfiles);
profilesRouter.get('/:id',getProfileById);
profilesRouter.post('/',createProfile);
profilesRouter.delete('/:id',deleteProfile);
profilesRouter.put('/:id',updateProfile);
<<<<<<< HEAD
export default profilesRouter;

=======

export default profilesRouter;


>>>>>>> mongoDB-team
