import express from 'express';
import 'express-async-errors';
import * as remoteController from '../controller/remote.js';


const router = express.Router();
/////////////////////////////
//  tempremote controller  //
//  Get status
router.get('/tempcontroller' , remoteController.tempGetStatus);
//  Update stauts
router.post('/tempcontroller' , remoteController.tempControl);
/////////////////////////////

/////////////////////////////
//  light controller       //
//  Get status
router.get('/light' , remoteController.lightGetStatus);
//  Update stauts
router.put('/light' , remoteController.lightGetStatus);
/////////////////////////////

/////////////////////////////
//curtain controller       //
//  Get status
router.get('/curtain' , remoteController.curtainGetStatus);
//  Update stauts
router.put('/curtain' , remoteController.curtainControl);
/////////////////////////////
export default router;