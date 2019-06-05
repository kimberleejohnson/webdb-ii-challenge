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
    return db('bears')
};

function findById(id) {
    return db('bears')
    .where({ id })
    .first(); 
}

function add(bear) {
    return db('bears')
    .insert(bear, 'id')
}

function update(id, changes) {
    return db('bears')
    .where({ id })
    .update(changes);
} 

function remove(id) {
    return db('bears')
    .where({ id })
    .del();
}