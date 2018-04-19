import React from 'react'
import axios from 'axios'

import Appointments from './Appointments'

const dayPage = (props) => {

    function handleClose (event){
        event.stopPropagation()
        let modal = document.getElementById(`modal${props.day}`)
        modal.style.display = 'none'
        return console.log('done')
    }

    function handleSubmit (event){
        event.preventDefault()
        let {description,endHour,endMin,startHour,startMin} = event.target
        axios.post('/api/appointments', {
            year: 2018,
            month: 4,
            day: props.day,
            description: description.value})
    }

    return(
        <div className = 'modal' id = {`modal${props.day}`}>
            <div className = 'modal-header'>
            <span className = 'modal-date'>{props.day}</span>
            <span className = 'modal-close' onClick= {handleClose.bind(this)}>X</span>
            </div>
            <form className = 'create-appointment' onSubmit = {handleSubmit.bind(this)}>
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
            <Appointments day = {props.day} appointments = {props.appointments} modal = {true}/>
        </div>
    )}

export default dayPage