let google = require('googleapis');
let authentication = require("./authentication");


// authentication.authenticate().then((auth)=>{
//     getDataAdmin(auth);
// });

// const spreadsheetId = '1p3a80RSb-q8bhZ1rS2inQtle5eYAr62JL7YPC5em868';
// const sheet = 'Sheet1!';
const spreadsheetId = '1I9BvHPQlxsIAVxBZWXqAry0Fdu0tePcttAiJ2gR8FRY';
const sheet = 'Testing!';
const range = sheet+'A2:M';
const sheets = google.sheets('v4');

const valueInputOption = "RAW";

exports.submit = (values, callback) => {
    authentication.authenticate().then((auth) => {
        // var values = [
        //     [
        //         "วิทยาศาสตร์",
        //         "20",
        //         "ชาย"
        //     ]
        // // Additional rows ...
        // ];
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
                callback(true);
            } else {
                console.log('%d cells appended.', result.updates.updatedCells);
                callback(false);
            }
        });
    });
}
