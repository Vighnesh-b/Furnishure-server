import express from 'express';
import cors from 'cors';
import { test, registerUser, loginUser, getProfile, logoutUser } from '../controllers/authController.js';
import { addToCart, getcart, add1tocart, delete1fromcart } from '../controllers/addToCartController.js';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: '*'})
);
router.options('*', cors());
router.get('/test', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);
router.post('/addToCart', addToCart); 
router.get('/getcart', getcart);
router.post('/add1tocart', add1tocart);
router.post('/delete1fromcart', delete1fromcart);

export default router;