import { Router } from "express";
import { authMiddleware } from "../helpers/auth";
import userRoutes from "../user/user.routes";
import addressRoutes from "../address/address.routes";
import cartRoutes from "../cart/cart.routes";
import orderRoutes from '../order/order.routes'
import paymentRoutes from '../payment/payment.routes'
import productRoutes from '../product/product.routes'

const router = Router();

router.use('/users', userRoutes);
router.use('/addresses', authMiddleware, addressRoutes);
router.use('/cart', authMiddleware, cartRoutes);
router.use('/order', authMiddleware, orderRoutes)
router.use('/payment', authMiddleware, paymentRoutes)
router.use('/product', authMiddleware, productRoutes)


export default router;