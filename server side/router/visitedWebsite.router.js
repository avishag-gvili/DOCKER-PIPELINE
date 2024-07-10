import express from 'express'
import {getAllVisitedWebsites,getVisitedWebsiteById,deleteVisitedWebsite,updateVisitedWebsite,createVisitedWebsite} from '../controllers/visitedWebSiteController'
const router=express.Router();
router.get('/getAllVisitedWebsites',getAllVisitedWebsites)
router.get('/getVisitedWebsiteById/:id',getVisitedWebsiteById)
router.post('/createVisitedWebsite',createVisitedWebsite)
router.put('/updateVisitedWebsite/:id',updateVisitedWebsite)
router.delete('/deleteVisitedWebsite/:id',deleteVisitedWebsite)
export default router;