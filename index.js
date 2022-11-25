// index.js
const { fetchCoordsByIP, } = require('./iss');

// The code below is temporary and can be commented out.

fetchCoordsByIP('142.188.76.78', (error, coordinates) => {
  
  if (error) {

    console.log("It didn't work!" , error);

    return;
    
  }

  console.log('It worked! Returned coordinates:' , coordinates);

});