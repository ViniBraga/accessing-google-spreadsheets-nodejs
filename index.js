//https://www.youtube.com/watch?v=0bntGJ0bx9M&t=29s

const GoogleSpreadsheet = require('google-spreadsheet');
const credentials = require('./credentials.json');
const { promisify } = require('util');

const docId = '1CVcN1fs9ynmx1InzRd2Z-btNETL48SGkaORogw-uTMY';
/* 
//With no promises

const doc = new GoogleSpreadsheet(docId);
doc.useServiceAccountAuth(credentials, err => {
    doc.getInfo((err, info) => {
        console.info(info);
    });
});
*/

const accessSheet = async() => {
    const doc = new GoogleSpreadsheet(docId);
    await promisify(doc.useServiceAccountAuth)(credentials);
    const info = await promisify(doc.getInfo)();
    const worksheet = info.worksheets[0];

    // Getting data
    const rows = await promisify(worksheet.getRows)({
        //offset: 2, //paginacao
        query: 'email = "novo@email"', // filtrando por email
    })
    rows.forEach(row => {
        console.log(row.nome);
        row.del();
    });


    // Adding row
    await promisify(worksheet.addRow)({nome: 'novo nome', email: 'novo@email'});
}
accessSheet();
