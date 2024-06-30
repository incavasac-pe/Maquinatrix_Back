const PaymentOrder = require('../models/PaymentOrder');
const Purchase = require('../models/Purchase');


class PaymentController {

    async createPaymentOrder(paymentOrderData) {
        try {
            const paymentOrder = await PaymentOrder.create(paymentOrderData);
            return paymentOrder;
        } catch (error) {
            throw error
        }
    }

    async updatePaymentOrder(paymentOrder) {
        try {
            return await PaymentOrder.update(paymentOrder, {
                where: {
                    id: paymentOrder.id
                }
            });
        } catch (error) {
            throw error
        }
    }

    async createPurchase(purchase) {
        try {
            return await Purchase.create(purchase);;
        } catch (error) {
            throw error
        }
    }

    async getPaymentOrder(params){
        try {
            return await PaymentOrder.findOne({
                where: params
            });
        } catch (error) {
            throw error
        }
    }
}

module.exports = PaymentController;