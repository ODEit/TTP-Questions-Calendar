import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import Appointments from './Appointments'
import { shiftModal, addAppointmentThunk, getAppointmentsThunk } from '../store'
import { creatingTimeString } from '../utility'

//my day page is my modal

const dayPage = (props) => {

    function handleClose(event) {
        event.stopPropagation()
        console.log('hi')
        let modal = document.getElementById(`modal${props.day}`)
        modal.style.display = 'none'
        props.changeModal()
        return console.log('done')
    }


    return (
        <div className='modal' id={`modal${props.day}`}>
            <div className='modal-header'>
                <span className='modal-date'>{`${props.day[0]}/${props.day[2]}/${props.day[1]}`}</span>
                <span className='modal-close' onClick={handleClose.bind(this)}>X</span>
            </div>
            <form className='create-appointment' onSubmit={(event) => { props.handleAddAppointment(event, props, handleClose); }}>
                <div className='create-appointment-time'>
                    <div>
                        <span>Start Time: </span>
                        <input name='startHour' type='number' max='12' min='1'></input>
                        <span>:</span>
                        <input name='startMin' type='number' max='60' min='0'></input>
                        <select name='start'>
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>
                        </select>
                    </div>
                    <div>
                        <span>End Time: </span>
                        <input name='endHour' type='number' max='12' min='1'></input>
                        <span>:</span>
                        <input name='endMin' type='number' max='60' min='0'></input>
                        <select name='end'>
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>
                        </select>
                    </div>
                </div>
                <span>Description </span>
                <textarea name='description' className="create-appointment-description" ></textarea>
                <button type='submit'>submit</button>
            </form>
            <Appointments day={props.day} from={true} />
        </div>
    )
}


const mapState = (state) => {
    return {
        modal: state.calendar.modal,
        year: state.calendar.year,
        month: state.calendar.month,
        appointments: state.calendar.appointments
    }
}

const mapDispatch = (dispatch) => {
    return {
        changeModal() {
            dispatch(shiftModal())
        },
        handleAddAppointment(event, props, handleClose) {
            event.preventDefault()
            let { description, endHour, endMin, startHour, startMin ,start,end} = event.target

            //making sure everything is put in correctly before they submit their appointment
            if (!endMin.value || !endHour.value || !startHour.value || !startMin.value || !start.value || !end.value) return alert('Time not fully filled out')
            if (start.value === 'PM' && end.value === 'AM') { return alert('start and end time are impossible') }
            else if (start.value === end.value) {
                if (parseInt(startHour.value) % 12 > parseInt(endHour.value) % 12) { return alert('start and end time are impossible') }
                else if (parseInt(startHour.value) === parseInt(endHour.value) && parseInt(startMin.value) > parseInt(endMin.value)) { return alert('start and end time are impossible') }
            }
            let time = creatingTimeString(startHour, startMin, start, endHour, endMin, end)
            console.log(time, ' , ', time.length, time.slice(0, 8))
            let body = {
                year: props.day[1],
                month: props.day[2],
                day: props.day[0],
                description: description.value,
                time: time
            }

            //closing the modal
            handleClose(event)

            dispatch(addAppointmentThunk(body))
            
        }
    }
}
  


export default connect(mapState,mapDispatch) (dayPage)