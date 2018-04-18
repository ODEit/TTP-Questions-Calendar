import React from 'react'
import Appointments from './Appointments'

const dayPage = (props) => {

    function handleClose (event){
        event.stopPropagation()
        let modal = document.getElementById(`modal${props.day}`)
        modal.style.display = 'none'
        return console.log('done')
    }
    return(
        <div className = 'modal' id = {`modal${props.day}`}>
            <div className = 'modalHeader'>
            <span>{props.day}</span>
            <span onClick= {handleClose.bind(this)}>X</span>
            </div>
            <Appointments props = {props.day}/>
        </div>
    )}

export default dayPage