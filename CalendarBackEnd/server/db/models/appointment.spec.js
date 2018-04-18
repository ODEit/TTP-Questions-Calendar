/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Appointment = db.model('appointment')

describe('Appointment model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('check', () => {
      let newAppointment

      beforeEach(() => {
        return Appointment.create({
          year: 2018,
          month: 4,
          day: 18,
          time: '12:30PM - 1:00PM',
          description: 'I am going to eat lunch with Sara'
        })
          .then(appointment => {
            newAppointment = appointment
          })
      })

      it('set the correct year', () => {
        expect(newAppointment.year).to.be.equal(2018)
      })

      it('set the correct month', () => {
        expect(newAppointment.month).to.be.equal(4)
      })

      it('set the correct day', () => {
        expect(newAppointment.day).to.be.equal(18)
      })

      it('set the correct time', () => {
        expect(newAppointment.time).to.be.equal('12:30PM - 1:00PM')
      })

      it('set the correct description', () => {
        expect(newAppointment.description).to.be.equal('I am going to eat lunch with Sara')
      })
    }) 
  }) 
})
