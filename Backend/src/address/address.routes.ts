import { Router } from "express";
import { createAddress, deleteAddress, getAddressById, getAddressesByUser, updateAddress } from "./address.controllers";

const router = Router();

router.post("/create", createAddress);
router.get("/get:id", getAddressById);
router.get("/getAll/:id", getAddressesByUser);
router.put("update/:id", updateAddress);
router.delete("delete/:id", deleteAddress);

export default router;
