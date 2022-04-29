import express from 'express';
import 'express-async-errors';
import * as remoteController from '../controller/remote.js';


const router = express.Router();

router.get('/', remoteController.getStatus);
/////////////////////////////
//  tempremote controller  //
//  Get status
router.get('/tempcontroller' , remoteController.tempGetStatus);
//  Update stauts
router.post('/tempcontroller/:ctrl' , remoteController.tempControl);
/////////////////////////////

/////////////////////////////
//  light controller       //
//  Get status
router.get('/lightcontroller' , remoteController.lightGetStatus);
//  Update stauts
router.post('/lightcontroller/:ctrl' , remoteController.lightControl);
/////////////////////////////

/////////////////////////////
//curtain controller       //
//  Get status
router.get('/curtaincontroller' , remoteController.curtainGetStatus);
//  Update stauts
router.post('/curtaincontroller/:ctrl' , remoteController.curtainControl);
/////////////////////////////
export default router;