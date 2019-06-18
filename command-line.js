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
            client.query('SELECT * FROM villains WHERE id = $1', [id], (err, res) => {
                if (err) throw err;
                console.log(res.rows);
                client.end();
            });
            break;

        case 'edit':
            id = process.argv.slice(2)[1];
            const newAlias = process.argv.slice(2)[2];
            client.query('UPDATE villains SET alias = $1 WHERE id = $2', [newAlias, id], (err) => {
                if (err) throw err;
                console.log('record updated');
                client.end();
            });
            break;

        case 'add':
            const alias = process.argv.slice(2)[1];
            const movie = process.argv.slice(2)[2];
            client.query('INSERT INTO villains (alias, movie) VALUES ($1, $2);', [alias, movie], (err) => {
                if (err) throw err;
                console.log('record created');
                client.end();
            });
            break;

        case 'delete':
            id = process.argv.slice(2)[1];
            client.query('DELETE FROM villains WHERE id = $1;', [id], (err) => {
                if (err) throw err;
                console.log('record deleted');
                client.end();
            });
            break;

        default:
            client.end();
            break;

    }

});
