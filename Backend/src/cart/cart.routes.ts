import { Router } from "express";
import { addToCart, getUserCart, updateCartItem, removeFromCart, clearCart } from "./cart.controllers";

const router = Router();

router.post("add/:userId", addToCart);
router.get("get/:userId", getUserCart);
router.put("update/:userId", updateCartItem);
router.delete("remove/:userId/:productId", removeFromCart);
router.delete("clear/:userId", clearCart);

export default router;
