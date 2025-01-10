const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("bingo_db","root","123456789", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
})

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("All Good!!")
    } catch (err) {
        console.error("All Bad!!", err)
    }
}

testConnection();