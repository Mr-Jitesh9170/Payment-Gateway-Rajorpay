const { Router } = require("express");
const { orderProduct, verifyPayments } = require("../controllers/rajorpay");

let router = Router();

router.post("/orders", orderProduct)
router.post("/verify", verifyPayments)


module.exports = router;