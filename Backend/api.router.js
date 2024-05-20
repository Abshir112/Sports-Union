import express from 'express';
import userRouter from './routes/user.routes.js';
import activityRouter from './routes/activity.routes.js';
import eventRouter from './routes/event.routes.js';
import usersActivitiesRouter from './routes/user-activities.routes.js';
import userEventRouter from './routes/user-events.routes.js';
import notificationRouter from './routes/notification.routes.js';
import adminRouter from './routes/admin.routes.js';

const apiRouter = express.Router();

// Define all the routes with the /api/v1 prefix
apiRouter.use('/users', userRouter);
apiRouter.use('/activities', activityRouter);
apiRouter.use('/users-activities', usersActivitiesRouter);
apiRouter.use('/events', eventRouter);
apiRouter.use('/users-events', userEventRouter);
apiRouter.use('/notifications', notificationRouter);
apiRouter.use('/admin', adminRouter);

export default apiRouter;