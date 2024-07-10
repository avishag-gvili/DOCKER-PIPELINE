import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile} from '../controllers/profileController'
const router=express.Router();
router.get('/getAllProfiles',getAllProfiles);
router.get('/getProfileById/:id',getProfileById);
router.post('/createProfile',createProfile);
router.delete('/deleteProfile/:id',deleteProfile);
router.put('/updateProfile/:id',updateProfile);
export default router;