const knex = require('knex'); 

// Configuring knex 
const knexConfig = {
    client: 'sqlite3', 
    connection: {
      filename: './data/lambda.db3'
    }, 
    useNullAsDefault: true, 
  }

//4. Defining database 
const db = knex(knexConfig); 

module.exports = {
    find, 
    findById, 
    add, 
    update, 
    remove 
}

function find() {
    return db('zoos')
};

function findById(id) {
    return db('zoos')
    .where({ id })
    .first(); 
}

function add(zoo) {
    return db('zoos')
    .insert(zoo, 'id')
}

function update(id, changes) {
    return db('zoos')
    .where({ id })
    .update(changes);
} 

function remove(id) {
    return db('zoos')
    .where({ id })
    .del();
}