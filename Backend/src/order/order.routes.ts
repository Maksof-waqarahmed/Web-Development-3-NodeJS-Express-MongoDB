import { Router } from "express";
import { createOrder, getOrderById, getUserOrders, updateOrderStatus } from "./order.controllers";


const router = Router();

router.post("/:userId", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/:orderId", getOrderById);
router.put("/:orderId/status", updateOrderStatus);

export default router;
