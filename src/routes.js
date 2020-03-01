const db = require("./ConnectToDb.js");

const getUsers = (request, response) => {
    db.pool.query('SELECT * FROM "Users" ORDER BY "UserId" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    db.pool.query(`SELECT * FROM "Users" WHERE "UserId" = ${id} ORDER BY "UserId" ASC`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
    getUserById
};