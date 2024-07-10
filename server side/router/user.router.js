import express from 'express';
import { 
  getUsers, 
  getUserId, 
  addUser, 
  deleteUser, 
  updatedUser, 
  updateUserProfileImage 
} 
from '../Controllers/user.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserId);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updatedUser);
router.put('/users/:id/profile-image', upload.single('profileImage'), updateUserProfileImage);

export default router;
