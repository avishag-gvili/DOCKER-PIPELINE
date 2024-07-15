import  express from 'express';
import { getWebsiteById,getAllWebsites,addWebSite,UpdateWebSite,deleteWebsite} from '../controllers/websites.controller.js';
<<<<<<< HEAD
=======

>>>>>>> mongoDB-team
 const websitesRouter=express.Router();

websitesRouter.get('/',getAllWebsites);
websitesRouter.get('/:id',getWebsiteById);
websitesRouter.put('/:id',UpdateWebSite);
websitesRouter.post('/',addWebSite);
websitesRouter.delete('/:id',deleteWebsite);

export default websitesRouter;
<<<<<<< HEAD
=======

>>>>>>> mongoDB-team

