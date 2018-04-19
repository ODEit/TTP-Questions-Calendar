import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import Appointments from './Appointments'
import {shiftModal, addAppointmentThunk, getAppointmentsThunk} from '../store'

const dayPage = (props) => {

    function handleClose (event){
        event.stopPropagation()
        let modal = document.getElementById(`modal${props.day}`)
        modal.style.display = 'none'
        props.handleModal()
        return console.log('done')
    }


    return(
        <div className = 'modal' id = {`modal${props.day}`}>
            <div className = 'modal-header'>
            <span className = 'modal-date'>{props.day}</span>
            <span className = 'modal-close' onClick= {handleClose.bind(this)}>X</span>
            </div>
            <form className = 'create-appointment' onSubmit = {(event)=> props.handleAddAppointment(event, props)}>
                <div>
                <span>Start Time: </span>
                <input name = 'startHour' type = 'number' max = '12' min = '1'></input>
                <span>:</span>
                <input name = 'startMin' type = 'number' max = '60' min = '0'></input>
                <select>
                    <option value = 'AM'>AM</option>
                    <option value = 'PM'>PM</option>
                </select>
                </div>
                <div>
                <span>End Time: </span>
                <input name = 'endHour' type = 'number' max = '12' min = '1'></input>
                <span>:</span>
                <input name = 'endMin' type = 'number' max = '60' min = '0'></input>
                <select>
                    <option value = 'AM'>AM</option>
                    <option value = 'PM'>PM</option>
                </select>
                </div>
                <span>Description </span>
                <textarea name = 'description' className = "create-appointment-description" ></textarea>
                <button type = 'submit'>submit</button>
            </form>
            <Appointments day = {props.day} from = {true}/>
        </div>
    )}


const mapState = (state)=>{
    return{
        modal: state.calendar.modal,
        year: state.calendar.year,
        month: state.calendar.month,
        appointments: state.calendar.appointments 
    }
}   

const mapDispatch = (dispatch)=>{
    return{
        handleModal(){
            dispatch(shiftModal())
        },
        handleAddAppointment(event, props){
            event.preventDefault()  
            let {description,endHour,endMin,startHour,startMin} = event.target
            
            let body = {
                year : props.year,
                month: props.month,
                day: props.day,
                description: description.value
            }
            dispatch(addAppointmentThunk(body))
        }
    }
}
  


export default connect(mapState,mapDispatch) (dayPage)