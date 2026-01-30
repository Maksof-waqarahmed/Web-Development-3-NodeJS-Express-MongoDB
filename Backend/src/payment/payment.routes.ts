import { Router } from "express";
import {
    createPayment,
    getPaymentByOrder,
    updatePaymentStatus,
} from "./payment.controllers";

const router = Router();

router.post("/create", createPayment);
router.get("/:orderId", getPaymentByOrder);
router.put("/:paymentId/status", updatePaymentStatus);

export default router;
