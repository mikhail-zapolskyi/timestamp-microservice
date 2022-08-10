// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:timestamp?", function (req, res) {
     const { timestamp } = req.params;
     let utcDate, unixDate;
     
     if(!timestamp) return res.json({ 
          unix: convertToUnix(new Date()),
          utc: convertToUtc(new Date())
     });
     
     if(isNotDate(timestamp)) return res.send({ 
          error: "Invalid Date" 
     });
     
   
     if(timestamp.includes("-") || timestamp.includes(" ")){
          utcDate = convertToUtc(timestamp);
          unixDate = convertToUnix(timestamp);
       
     } else {
          const timestampToNumber = Number(timestamp);
          utcDate = convertToUtc(timestampToNumber);
          unixDate = convertToUnix(timestampToNumber);
     }
     
     res.json({unix: unixDate, utc: utcDate});
});
   
const convertToUtc = (date) => {
     return new Date(date).toUTCString()
}

const convertToUnix = (date) => {
     return new Date(date).getTime();
}

const isNotDate = (date) => {
     return !Date.parse(date) && !Number(date)
}



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
