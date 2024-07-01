const crypto = require('crypto');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

class FlowClient {


    constructor(){
        this.apiKey = process.env.FLOW_API_KEY ? process.env.FLOW_API_KEY : '';
        this.secretKey = process.env.FLOW_API_SECRET ? process.env.FLOW_API_SECRET : '';
        this.url = process.env.FLOW_API_URL ? process.env.FLOW_API_URL : '';
        this.confirmationUrl = process.env.FLOW_CONFIRMATION_URL ? process.env.FLOW_CONFIRMATION_URL : '';
        this.returnUrl = process.env.FLOW_RETURN_URL ? process.env.FLOW_RETURN_URL : '';

    }

    // Method to create a signature
    createSignature(params) {
        // Sort the parameters alphabetically by key
        const sortedKeys = Object.keys(params).sort();
        const sortedParams = sortedKeys.map(key => `${key}${params[key]}`).join('');
        console.log("secretKey", this.secretKey)
        // Create the HMAC SHA256 signature
        const hmac = crypto.createHmac('sha256', this.secretKey);
        hmac.update(sortedParams);
        return hmac.digest('hex');
    }

    async postRequest(endpoint, params) {
        const url = `${this.url}/${endpoint}`;
        const form = new FormData();
        for (const key in params) {
            form.append(key, params[key]);
        }
        
        try {
            const response = await axios.post(url, form, {
                headers: form.getHeaders()
            });
            
            return response.data;
        } catch (error) {
            console.error('Error making request to Flow API:', error);
            throw error;
        }
    }

    async getRequest(endpoint, params) {

        try {
            const queryParams = new URLSearchParams(params).toString();
            const fullUrl = `${this.url}/${endpoint}?${queryParams}`;
            
            const response = await axios.get(fullUrl);
            return response.data;
        } catch {
            console.error('Error making request to Flow API:', error);
            return error;
        }
    }
        
    async makeRequest(endpoint, params, method) {
        // Add API key to parameters
        params.apiKey = this.apiKey;
        
        // Create the signature
        const signature = this.createSignature(params);
        
        // Add the signature to the parameters
        params.s = signature;
        console.log("signature", signature)
        
        // Construct the full URL
        if(method == 'POST'){
            return await this.postRequest(endpoint, params);
        }
        if(method == 'GET'){
            return await this.getRequest(endpoint, params);
        }
    }

    async createPayment(params){
        params.urlConfirmation = this.confirmationUrl;
        params.urlReturn = this.returnUrl;
        return await this.makeRequest('payment/create', params, 'POST');
    }

    async getPaymentStatus(params){
        return await this.makeRequest('payment/getStatus', params, 'GET');
    }
}

module.exports = FlowClient;