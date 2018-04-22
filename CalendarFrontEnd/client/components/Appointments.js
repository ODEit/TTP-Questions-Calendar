import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { removeAppointmentThunk } from '../store'
import { getTimeStart } from '../utility'

const Appointments = (props) => {
    let { day, appointments, handleDelete, modal, month } = props
    appointments = appointments.filter(appointment => day[0] == appointment.day && day[1] == appointment.year && day[2] == appointment.month )
    appointments = appointments.sort((a, b) => getTimeStart(a) - getTimeStart(b))
    return (
        <div className='appointment'>
            {appointments.length ? appointments.map((appointment, key) => {
                return <div className='appointment-content' key={key}>
                    <span className='appointment-time' data-day={day}>{appointment.time}</span>
                    <div className='appointment-description' data-day={day} >{appointment.description}
                        {props.from && <button type='delete' onClick={() => handleDelete(appointment.id)} >x
                    </button>}
                    </div>
                </div>
            }) :
                null
            }
        </div>
    )
}

const mapState = (state) => {
    return {
        appointments: state.calendar.appointments,
        modal: state.calendar.modal,
        month: state.calendar.month
    }
}
const mapDispatch = (dispatch) => {
    return {
        handleDelete(id) {
            dispatch(removeAppointmentThunk(id))
        }
    }
}

export default connect(mapState, mapDispatch)(Appointments)
