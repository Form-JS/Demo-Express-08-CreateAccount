const mssql = require('mssql');


const createDbConnection = async () => {
    const db = await mssql.connect(process.env.DB_CONNECTIONSTRING);
    return db;
};


module.exports = {
    createDbConnection
};