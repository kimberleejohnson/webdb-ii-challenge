//1. Imported knex and sqlite3 in terminal 

//2. Requiring knex
const knex = require('knex'); 

const express = require('express');
const helmet = require('helmet');

const server = express();

//3. Configuring knex 
const knexConfig = {
  client: 'sqlite3', 
  connection: {
    filename: './data/lambda.db3'
  }, 
  useNullasDefault: true, 
}

//4. Defining database 
const db = knex(knexConfig); 

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
