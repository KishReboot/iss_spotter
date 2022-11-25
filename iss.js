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

const fetchCoordsByIP = (ip, callback) => {

  request(`http://ipwho.is/${ip}`,(error, response, body) => {
    
    if (error) return callback(error, null);
    
    // parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);
      // check if "success" is true or not
      if (!parsedBody.success) {
        const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
        callback(Error(message), null);
        return;
      }

    const { latitude, longitude } = parsedBody;

    callback(null, {latitude, longitude});
  });

};

module.exports = { fetchCoordsByIP };