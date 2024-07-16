import mongoose from 'mongoose';
import Preference from '../models/preference.model.js'

export const getAllPreference = async (req, res, next) => {
    try {
        const allPreferences = await Preference.find().select('-__v');
        return res.send(allPreferences);
    } catch (error) {
        next({ message: error.message })
    }
};
export const getPreferenceById = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'Id is not valid' });

    try {
        const preference = await Preference.findById(id).select('-__v');
        if (!preference) {
            next({ message: 'Preference not found', status: 404 });
        }
        res.status(200).json(preference);
    } catch (error) {
        return next({ message: error.message });
    }

};


export const updatePreference = async (req, res, next) => {
    const id = req.params.id;
    if (req.file)
        req.body.soundVoice = req.file.originalname;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id isnot valid' });
    try {
        const newPreference = await Preference.findByIdAndUpdate(id, req.body, { new: true });
        if (!newPreference)
            return next({ message: 'Preferencs not found !!', status: 404 });
        return res.json(newPreference);
    } catch (error) {
        next({ message: error });
    }
};

export const addPreference = async (req, res, next) => {
    try {
        if (req.file)
            req.body.soundVoice = req.file.originalname;
        const newPreference = new Preference(req.body);
        await newPreference.save();
        return res.json(newPreference).status(201);
    } catch (error) {
        next({ message: error.message });
    }
};

export const deletePreference = async (req, res, next) => {

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id is not valid' })
    try {

        const PreferenceForDelet =await Preference.findByIdAndDelete(id);
        ;
        if (!PreferenceForDelet)
            return next({ message: 'Preferencs not found !!' })
        res.status(204).send('deleted succesfully !!');
    } catch (error) {
        next({ message: error.message });
    }
};
