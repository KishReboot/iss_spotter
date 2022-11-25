const request = require('request');

const myIP = `https://api.ipify.org?format=json`;

const fetchMyIP = (callback) => {
  
  request(myIP, (error, response, body) => {

    if (error) callback(`Request failed: ${error}`, null);

    if (response.statusCode !== 200) return callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
    
    const ip = JSON.parse(body).ip;
    
    callback(null, ip);
    
  });

};

module.exports = { fetchMyIP };