import express from 'express';
import 'express-async-errors';
import * as remoteController from '../controller/remote.js';


const router = express.Router();
/*
router.get('/', remoteController.getStatus);
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
router.get('/lightcontroller' , remoteController.lightGetStatus);
//  Update stauts
router.post('/lightcontroller' , remoteController.lightControl);
/////////////////////////////

/////////////////////////////
//curtain controller       //
//  Get status
router.get('/curtaincontroller' , remoteController.curtainGetStatus);
//  Update stauts
router.post('/curtaincontroller' , remoteController.curtainControl);
/////////////////////////////

*/
// test api //

router.get('/status/:inst', remoteController.testGetStatus);

router.post('/controller/:inst', remoteController.testController)


export default router;