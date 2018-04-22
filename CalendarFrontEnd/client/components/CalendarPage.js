import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import DayPage from './DayPage'
import Appointments from './Appointments';
import {getPresentDate, getMonth, getYear, shiftModal, getAppointmentsThunk} from '../store'
import {handleArrow, handleDaysPerMonth} from '../utility.js'

/**
 * COMPONENT
 */
class CalendarPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkDate: '',
      start: '',
      days: [],
      daysPerMonths: [31,28,31,30,31,30,31,31,30,31,30,31],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ] ,
    }
    this.handleModal = this.handleModal.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleArrow = handleArrow.bind(this)
    this.handleDaysPerMonth = handleDaysPerMonth.bind(this)
  }
  componentDidMount() {
    //making a presendDate object and presentDate string and sending it up to my redux store
    let presentDate = new Date
    let presentDateString = presentDate.toString();
    presentDateString = presentDateString.slice(0, presentDateString.indexOf(':') - 2)
    this.props.handlePresentDate(presentDateString)
    
    //making sure my application knows the correct month and year we are on, for getting purposes
    let checkDate = new Date(`${presentDate.getFullYear()}, ${presentDate.getMonth() + 1}, 1`)
    let year = checkDate.getFullYear()
    let month = checkDate.getMonth()
    let start = checkDate.getDay();    
    
    this.props.handleMonth(month+1)
    this.props.handleYear(year)
    this.props.handleAppointments(year, month+1)
    
    //create a day array that holds the correct days for the calendars 5 rows 7 days and setState on it
    this.handleDaysPerMonth(year, month+1)
  }

    //making a popup modal
  handleModal(event) {
    if(!this.props.modal){
    const day = event.target.dataset.day
    let modal = document.getElementById(`modal${day}`)
    modal.style.display = 'flex'
    modal.style.flexDirection = 'column' 
    modal.style.justifyContent = 'space-between'
    this.props.handleModal()
  }
  }
  
    //also allowing a person to search up a date ahead or behind them and input events.
  handleDate(event){
    event.preventDefault();
    let year = event.target.year.value
    let newMonth = event.target.month.value
    year = parseInt(year)
    newMonth = parseInt(newMonth)
    if(!year || !newMonth) return alert('to search by year and month, you must complete the form')
    this.props.handleAppointments(year, newMonth)    
    this.props.handleMonth(newMonth)
    this.props.handleYear(year)
    this.handleDaysPerMonth(year, newMonth)    
  }

  

  render() {
    return (
      <div>
        <span>Present Date: {this.props.presentDate}</span>
        <form onSubmit = {this.handleDate}>

        {/* Year can not go lower than 101 */}
          <span>Year: </span><input type = 'number' min = '101' name = 'year' ></input>
          <span>Month: </span><input type ='number' min = '1' max = '12' name = 'month' ></input>
          <button type = 'submit'>submit</button>
        </form>
        <div className="month">
          <ul className='monthContent'>
            <li className="prev" onClick = {this.handleArrow}>&#10094;</li>
            <h1 className='calendarHead'>
              {`${this.state.months[this.props.month-1]} ${this.props.year}`}
            </h1>
            <li className="next" onClick = {this.handleArrow}>&#10095;</li>
          </ul>
        </div>

        <ul className="weekdays">
          <li>Su</li>
          <li>Mo</li>
          <li>Tu</li>
          <li>We</li>
          <li>Th</li>
          <li>Fr</li>
          <li>Sa</li>
        </ul>

        <ul className="days">
          {this.state.days.length === 35 && this.state.days.map((day, key) => {
            return (<div key={key}
              data-day={day}
              onClick={this.handleModal}
              className={`daysEntry ${day[3]}`}>
              <li data-day={day} >{day[0]}</li>
              <Appointments day = {day} />
              <DayPage day={day}/>
            </div>)
          })}
        </ul>
      </div>
    )
  }
}





/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    month: state.calendar.month,
    year: state.calendar.year,
    presentDate: state.calendar.presentDate,
    modal: state.calendar.modal,
    appointments: state.calendar.appointments
  }
}
const mapDispatch = (dispatch)=>{
  return{
    handleMonth(month){
      dispatch(getMonth(month))
    },
    handleYear(year){
      dispatch(getYear(year))
    },
    handlePresentDate(presentDate){
      dispatch(getPresentDate(presentDate))
    },
    handleModal(){
      dispatch(shiftModal())
    },
    handleAppointments(year, month){
      dispatch(getAppointmentsThunk(year, month))
    }
  }
}
export default connect(mapState, mapDispatch)(CalendarPage)

