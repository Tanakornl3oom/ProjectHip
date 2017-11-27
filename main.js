let google = require('googleapis');
let authentication = require("./Authentication.js");


// authentication.authenticate().then((auth)=>{
//     getDataAdmin(auth);
// });

// const spreadsheetId = '1p3a80RSb-q8bhZ1rS2inQtle5eYAr62JL7YPC5em868';
// const sheet = 'Sheet1!';
const spreadsheetId = '1ZZQtDayIbAH65jJkbEM70THGBGeAoDH_Rx3wReW_U0A';
const sheet = 'sheets1!';
const range = sheet+'A2:G';
const sheets = google.sheets('v4');

const valueInputOption = "RAW";

exports.submit = (values, callback) => {
    authentication.authenticate().then((auth) => {
        var body = {
            values: values
        };
        sheets.spreadsheets.values.append({
            auth: auth,
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: valueInputOption,
            resource: body
        }, function(err, result) {
            if(err) {
                // Handle error
                console.log(err);
                callback(false);
            } else {
                console.log('%d cells appended.', result.updates.updatedCells);
                callback(true);
            }
        });
    });
}
exports.getindex = (callback) => {
  authentication.authenticate().then((auth) => {
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: sheet+'A:G', 
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err, null);
        return;
      }
      var rows = response.values;
      if (rows.length === 0) {
        console.log('No data found.');
      } else {
        
        for (var i = 0; rows.length; i++) {
        console.log("index"+i);
          
          var row = rows[i];
          console.log(row);
          if(row === undefined){
            var data = i;
            callback(null, data);
            return;
          }
        }
        callback('not found', null);
        return;
      }
    });
  });
}