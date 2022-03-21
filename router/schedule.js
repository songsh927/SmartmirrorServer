import express from 'express';
import 'express-async-errors';
import * as scheduleController from '../controller/schedule.js';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';


const router = express.Router();

const validateSchedule = [
    body('date')
        .isLength({min: 8, max: 8})
        .withMessage('Date is must be YYYYMMDD'),
    validate
]

//Get all schedule
router.get('/' , scheduleController.getSchedules);
//Get particular schedule
router.get('/:id' , scheduleController.getSchedule);
//Post schedule
router.post('/' , validateSchedule ,scheduleController.createSchedule);
//Update schedule
router.put('/:id' , validateSchedule ,scheduleController.updateSchedule);
//Delete schedule
router.delete('/:id' , scheduleController.deleteSchedule);

export default router;