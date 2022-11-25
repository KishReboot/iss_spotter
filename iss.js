/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 *  
 * 
 */
const request = require('request'); 

const myIP = `https://api.ipify.org?format=json`;

const fetchMyIP = (callback) => { 
  
  request (myIP, (error, response, body) => {

    const ip = JSON.parse(body).ip;
    
    callback(null, ip);
    
  });

};

module.exports = { fetchMyIP };