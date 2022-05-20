import express from 'express';
import 'express-async-errors';
import * as remoteController from '../controller/remote.js';


const router = express.Router();

router.get('/', remoteController.getStatus);

router.get('/lightcontroller' , remoteController.lightGetStatus);
router.post('/lightcontroller' , remoteController.lightControl);

router.get('/curtaincontroller' , remoteController.curtainGetStatus);
router.post('/curtaincontroller' , remoteController.curtainControl);

router.get('/tempcontroller' , remoteController.tempGetStatus);
router.post('/tempcontroller' , remoteController.tempControl);

export default router;