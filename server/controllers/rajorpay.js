
const rajorpay = require("razorpay")
const crypto = require("crypto");

exports.verifyPayments = async (req, res) => {
    const {
        razorpay_orderID,
        razorpay_paymentID,
        razorpay_signature } = req.body;
    try {
        const sign = razorpay_orderID + "|" + razorpay_paymentID;
        const resultSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");
        if (razorpay_signature == resultSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error!" })
    }
} 
exports.orderProduct = async (req, res) => {
    let { amount, curreny = "INR" } = req.body;
    try {
        const instance = new rajorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });
        const options = {
            amount: amount * 100,
            currency: curreny,
            receipt: crypto.randomBytes(10).toString("hex"),
        }
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ message: "order placed", data: order });
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error!" })
    }
}
