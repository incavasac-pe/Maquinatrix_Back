const express = require("express");
const authenticateToken = require('../middleware/auth');
const router = express.Router();
const {newResponseJson} = require('../responseUtils');
const FlowClient = require('../services/flow_client');

const PaymentController = require('../controllers/payment');

router.post('/payment', authenticateToken , async (req, res) => {

    console.log("user", req.user)
    const params = req.body;

    const payment_oder = {
        id_user: req.user.id_user,
        payment_status: 1,
        currency: params.currency,
        subject: params.subject,
        amount: params.amount,
        created_at: new Date(),
        updated_at: new Date()
    }

    const paymentController = new PaymentController();
    const paymentOrder = await paymentController.createPaymentOrder(payment_oder);
    console.log("paymentOrder", paymentOrder)

    const purchase = {
        id_product: params.id_product,
        id_payment_order: paymentOrder.id,
        purchase_type: params.purchase_type,
        quantity: params.quantity,
        created_at: new Date(),
        updated_at: new Date()
    }

    await paymentController.createPurchase(purchase)
    params.commerceOrder = paymentOrder.id;
    const flowClient = new FlowClient();
    const response = await flowClient.createPayment(params);

    await paymentController.updatePaymentOrder({
        id: paymentOrder.id, 
        payment_token: response.token,
        flow_order: response.flowOrder,
    });
    console.log("response", response)
    res.json(response);
})

router.post("/payment/confirm", async (req, res) => {
    const params = req.body;
    console.log("params", params)
    res.json("confirm payment")
})

module.exports = router;