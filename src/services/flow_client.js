const crypto = require('crypto');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

class FlowClient {


    constructor(){
        this.apiKey = process.env.FLOW_API_KEY ? process.env.FLOW_API_KEY : '';
        this.secretKey = process.env.FLOW_API_SECRET ? process.env.FLOW_API_SECRET : '';
        this.url = process.env.FLOW_API_URL ? process.env.FLOW_API_URL : '';
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
            // Make the request
            const response = await axios.post(url, form, {
                headers: form.getHeaders()
            });
            
            // Return the response data
            return response.data;
        } catch (error) {
            // Handle error
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
        const url = `${this.url}/${endpoint}`;
        
        if(method == 'POST'){
            return await this.postRequest(endpoint, params);
        }
    }

    async createPayment(params){ 
        return await this.makeRequest('payment/create', params, 'POST');
    }
}

module.exports = FlowClient;