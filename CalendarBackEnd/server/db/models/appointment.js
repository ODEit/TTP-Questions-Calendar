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


//For comparing start Times to sort appointments on same day
Appointment.prototype.getTimeStart = function(){
    let startTime = this.time.slice(0,8)
    let changedNumber = ''
    for(let i = 0; i<startTime.length; i++){
        if(startTime[i]=== ':'){}
        else {changedNumber+=startTime[i]}  
    }
    changedNumber = parseInt(changedNumber)
    return changedNumber
}

module.exports =  Appointment
