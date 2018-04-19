import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { removeAppointmentThunk } from '../store'

const Appointments = (props) => {
    let { day, appointments, handleDelete, modal } = props
    appointments = appointments.filter(appointment => day == appointment.day)

    return (
        <div className='appointment'>
            {appointments.length ? appointments.map((appointment, key) => {
                return <div className='appointment-content' key={key}>
                    <span>Time holder</span>
                    <div className='appointment-description' >{appointment.description} 
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
        modal: state.calendar.modal
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
