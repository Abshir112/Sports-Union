import express from 'express';
import { getStatistics } from '../controllers/admin.controller.js';
import requireAuth from '../middlewares/requireAuth.js';

const adminRouter = express.Router();

adminRouter.use(requireAuth);

adminRouter.get('/', getStatistics);

export default adminRouter;
