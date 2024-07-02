const FlowStatus = Object.freeze({
    PENDING: 1,
    PAID: 2,
    REJECTED: 3,
    CANCELED: 4
  });
  

const PurchaseType = Object.freeze({
    RENTAL: 1,
    SALE: 2
  });

module.exports = {
    FlowStatus,
    PurchaseType
};