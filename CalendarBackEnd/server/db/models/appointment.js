const Sequelize = require('sequelize')
const db = require('../db')

const Appointment = db.define('appointment', {
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    month: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    day: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    time: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    }
})

module.exports =  Appointment
