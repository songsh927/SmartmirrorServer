import express from 'express';
import 'express-async-errors';


const router = express.Router();
/////////////////////////////
//  tempremote controller  //
//  Get status
router.get('/tempcontroller' , (req, res, next) => {

});
//  Update stauts
router.put('/tempcontroller' , (req, res, next) => {

});
/////////////////////////////

/////////////////////////////
//  light controller       //
//  Get status
router.get('/light' , (req, res, next) => {

});
//  Update stauts
router.put('/light' , (req, res ,next) => {

});
/////////////////////////////

/////////////////////////////
//curtain controller       //
//  Get status
router.get('/curtain' , (req, res, next) => {

});
//  Update stauts
router.put('/curtain' , (req, res, next) => {

});
/////////////////////////////
export default router;