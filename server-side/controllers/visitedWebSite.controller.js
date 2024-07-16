import VisitedWebsite from '../models/visitedWebSite.model.js';

export const getAllVisitedWebsites = async (req, res,next) => {
    try {
        const visitedWebsites = await VisitedWebsite.find().populate('websiteId').select('-__v');
        res.json(visitedWebsites);
    } catch (err) {
        next({message:err.message})
    }
};
export const createVisitedWebsite = async (req, res,next) => {
    const newVisitedWebsite = new VisitedWebsite(req.body);
    try {
        const savedVisitedWebsite = await newVisitedWebsite.save();
        res.status(201).json(savedVisitedWebsite);
    } catch (err) {
        next({message:err.message})
    }
};
export const getVisitedWebsiteById = async (req, res,next) => {
    try {
        const visitedWebsite = await VisitedWebsite.findById(req.params.id).populate('websiteId').select('-__v');
        if (!visitedWebsite) {
            return next({message:'visited Websites not found ',status:404})
        }
        res.json(visitedWebsite);
    } catch (err) {
        next({message:err.message})
    }
};
export const updateVisitedWebsite = async (req, res,next) => {
    try {
        const updatedVisitedWebsite = await VisitedWebsite.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisitedWebsite) {
            return next({message:'visited Websites not found ',status:404})
        }
        res.json(updatedVisitedWebsite);
    } catch (err) {
        next({message:err.message})
    }
};
export const deleteVisitedWebsite = async (req, res,next) => {
    try {
        const deletedVisitedWebsite = await VisitedWebsite.findByIdAndDelete(req.params.id);
        if (!deletedVisitedWebsite) {
            return next({message:'visited Websites not found ',status:404})
        }
        res.json({ message: 'Visited website deleted successfully' }).status(201);
    } catch (err) {
        next({message:err.message})
    }
};
