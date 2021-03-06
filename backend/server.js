import express from 'express';
import data from './data';

import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import bodyParser from 'body-parser'
import orderRoute from './routes/orderRoute'
import config from 'config'
import uploadRoute from './routes/uploadRoute'
import path from 'path'

import connectDB from '../config/db'

const app = express();
connectDB();
app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {	app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);	  res.send(config.PAYPAL_CLIENT_ID);
});	});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));	
app.get('*', (req, res) => {	app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'../frontend','build','index.html'));	  
});	});

app.listen(5000, () => { console.log("Server started at http://localhost:5000") });