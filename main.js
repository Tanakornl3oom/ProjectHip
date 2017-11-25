let google = require('googleapis');
let authentication = require("./Authentication.js");


// authentication.authenticate().then((auth)=>{
//     getDataAdmin(auth);
// });

// const spreadsheetId = '1p3a80RSb-q8bhZ1rS2inQtle5eYAr62JL7YPC5em868';
// const sheet = 'Sheet1!';
const spreadsheetId = '1ZZQtDayIbAH65jJkbEM70THGBGeAoDH_Rx3wReW_U0A';
const sheet = 'sheets1!';
const range = sheet+'A2:F';
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
