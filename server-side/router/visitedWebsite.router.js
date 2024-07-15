import express from 'express'
import {getAllVisitedWebsites,getVisitedWebsiteById,deleteVisitedWebsite,updateVisitedWebsite,createVisitedWebsite} from '../controllers/visitedWebSite.controller.js'
<<<<<<< HEAD
=======

>>>>>>> mongoDB-team
const visitedWebSitesRouter=express.Router();

visitedWebSitesRouter.get('/',getAllVisitedWebsites)
visitedWebSitesRouter.get('/:id',getVisitedWebsiteById)
visitedWebSitesRouter.post('/',createVisitedWebsite)
visitedWebSitesRouter.put('/:id',updateVisitedWebsite)
visitedWebSitesRouter.delete('/:id',deleteVisitedWebsite)
<<<<<<< HEAD
export default visitedWebSitesRouter;
=======
export default visitedWebSitesRouter;

>>>>>>> mongoDB-team
