import express from 'express';
import { Createproduct, Getproduct } from '../controllers/Product_controller.js';

const Productroutes = express.Router();


Productroutes.post('/Createproduct',Createproduct)
Productroutes.get('/Getproduct',Getproduct)



export default Productroutes;