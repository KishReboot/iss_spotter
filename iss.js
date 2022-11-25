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
    
    const parsedBody = JSON.parse(body);
    
    if (!parsedBody.success) {
      
      const message = `Success status was ${parsedBody.success}. Server message 
      
      says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      
      callback(Error(message), null);
      return;

    }

    const { latitude, longitude } = parsedBody;

    callback(null, {latitude, longitude});

  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass 
      
      times: ${body}`), null);

      return;

    }

    const passes = JSON.parse(body).response;

    callback(null, passes);

  });

};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    
    if (error) return callback(error, null);
    

    fetchCoordsByIP(ip, (error, loc) => {
      
      if (error) return callback(error, null);
      

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        
        if (error) return callback(error, null);
        
        callback(null, nextPasses);

      });

    });

  });

};

// Only export nextISSTimesForMyLocation and not the other three (API request) functions.
// This is because they are not needed by external modules.
module.exports = { nextISSTimesForMyLocation };

