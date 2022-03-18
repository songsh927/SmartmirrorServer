import express from 'express';
import 'express-async-errors';
import * as scheduleController from '../controller/schedule.js';


const router = express.Router();

//Get all schedule
router.get('/' , scheduleController.getSchedules);
//Get particular schedule
router.get('/:id' , scheduleController.getSchedule);
//Post schedule
router.post('/' , scheduleController.createSchedule);
//Update schedule
router.put('/:id' , scheduleController.updateSchedule);
//Delete schedule
router.delete('/:id' , scheduleController.deleteSchedule);

export default router;