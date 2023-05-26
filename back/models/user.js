const { DataTypes } = require('sequelize');
const { dbConnection } = require('../database/config');

const User = dbConnection.define('Users',{
    idUser: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    pwd: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    google: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = User;