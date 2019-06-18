const { Client } = require('pg');

const config = {
    user: 'villains_user',
    password: 'password',
    host: 'localhost',
    database: 'villains'
};

const client = new Client(config);

client.connect();

module.exports = client;
