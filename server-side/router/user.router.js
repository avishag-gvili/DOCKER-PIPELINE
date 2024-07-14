import express from 'express';
import { getUsers, getUserById, addUser, deleteUser, updatedUser, updateUserProfileImage } from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', addUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id', updatedUser);
usersRouter.put('/:id', upload.single('profileImage'), updateUserProfileImage);

export default usersRouter;

