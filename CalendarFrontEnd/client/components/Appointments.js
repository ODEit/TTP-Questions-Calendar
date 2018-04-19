import React, { Component } from 'react'
import axios from 'axios'

const Appointments = (props) => {
    console.log(props)
    let {day,appointments} = props
    console.log(appointments)
    appointments = appointments.filter(appointment => day == appointment.day )
    console.log(appointments)
    function handleDelete(id){
        axios.delete(`/api/appointments/${id}`)
    }
        return (
            <div className = 'appointment'>
                {appointments.length ? appointments.map(appointment => {
                    return <div className = 'appointment-content'>
                    <span>Time holder</span>
                    <div className = 'appointment-description' >{appointment.description} {props.modal && <button type = 'delete' onClick = {()=> handleDelete(appointment.id)} >x</button> }</div>
                    </div>
                }):
                null
                }
            </div>
        )
    }

export default Appointments
