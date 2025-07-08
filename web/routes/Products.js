import express from 'express';
import { Createproduct } from '../controllers/Product_controller.js';

const Productroutes = express.Router();


Productroutes.post('/Createproduct',Createproduct)



export default Productroutes;