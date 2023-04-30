const mysql = require('mysql2/promise');

const appDataSource = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1',
  port: 3306,
  database: 'hospital',
});

const userTable = () => {
  appDataSource.query(`
  CREATE TABLE IF NOT EXISTS user (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id VARCHAR(20) NOT NULL,
    pw VARCHAR(20) NOT NULL,
    refresh VARCHAR(200) NULL
  )`);
};

module.exports = { appDataSource, userTable };
