const { Client } = require('pg');

const config = {
    user: 'villains_user',
    password: 'password',
    host: 'localhost',
    database: 'villains'
};

const client = new Client(config);
const queryType = process.argv.slice(2)[0];
let id = null;

client.connect((err) => {
    if (err) {
        console.error('errors have occured', err);
        return false;
    }
    console.log('connected to the pg server');

    switch (queryType) {

        case 'browse':
            client.query('SELECT * FROM villains', (err, res) => {
                if (err) throw err;
                console.log(res.rows);
                client.end();
            });
            break;

        case 'read':
            id = process.argv.slice(2)[1];
            console.log(id);
            break;
        case 'edit':

            break;
        case 'add':

            break;
        case 'delete':

            break;
        default:

            break;


    }

});
