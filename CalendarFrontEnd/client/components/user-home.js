import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DayPage from './DayPage'
import Appointments from './Appointments';

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      presentDate: {},
      presentDateString: "",
      checkDate: '',
      start: '',
      days: [],
      months: [31,28,31,30,31,30,31,31,30,31,30,31],
      appointments: []
    }
    this.handleModal = this.handleModal.bind(this)
    this.handleDate = this.handleDate.bind(this)
  }
  componentDidMount() {
    let presentDate = new Date
    let presentDateString = new Date().toString();
    presentDateString = presentDateString.slice(0, presentDateString.indexOf(':') - 2)
    let checkDate = `${presentDate.getFullYear()}, ${presentDate.getMonth() + 1}, 1`
    checkDate = new Date(checkDate)
    let start = checkDate.getDay();
    let days = []
    let year = checkDate.getFullYear()
    let month = checkDate.getMonth()
    let daysInMonth = this.state.months[month]
    for (let i = 0, j = 1; i < 35; i++) {
      if (i < start) { days.push(daysInMonth - start + i) }
      else {
        j = j % daysInMonth
        if (j === 0) j = daysInMonth;
        days.push(j)
        j++
      }
    }
    axios.get( `/api/appointments/${year}-${month+1}`)
      .then(appointments => appointments.data)
      .then((appointments)=> {
        this.setState({
        presentDate: presentDate,
        presentDateString: presentDateString,
        checkDate: checkDate,
        start: start,
        days: days,
        appointments
      })})
    
    

    console.log(presentDateString)
    console.log(start)
    console.log(checkDate)
    console.log(days)
  }

  handleModal(event) {
    const day = event.target.dataset.day
    let modal = document.getElementById(`modal${day}`)
    console.log(modal)
    modal.style.display = 'flex'
    modal.style.flexDirection = 'column' 
    modal.style.justifyContent = 'space-between'
  }
  
  handleDate(event){
    event.preventDefault();
    let year = event.target.year.value
    let newMonth = event.target.month.value
    console.log(year, newMonth)    
    let date = new Date (`${year}, ${newMonth}, 1`)
    let start = date.getDay();
    let month = date.getMonth()
    let daysInMonth = this.state.months[month]
    console.log(start)
    let days = []
    for (let i = 0, j = 1; i < 35; i++) {
      if (i < start) { days.push(daysInMonth - start + i) }
      else {
        j = j % daysInMonth
        if (j === 0) j = daysInMonth;
        days.push(j)
        j++
      }
    }
    console.log(days)
    this.setState({days: days})
  }

  handleArrow(event){
    if(event.target.className === 'next'){
      //current month and year needed.
    }
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.handleDate}>
          <span>Year: </span><input type = 'number' min = '1' name = 'year' ></input>
          <span>Month: </span><input type ='number' min = '1' max = '12' name = 'month' ></input>
          <button type = 'submit'>submit</button>
        </form>
        <div className="month">
          <ul className='monthContent'>
            <li className="prev" onClick = {()=> console.log('placeholder')}>&#10094;</li>
            <h1 className='calendarHead'>
              {this.state.presentDateString}
            </h1>
            <li className="next" onClick = {()=> console.log('placeholder')}>&#10095;</li>
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
              className="daysEntry">
              <li data-day={day} >{day}</li>
              <Appointments day = {day} appointments = {this.state.appointments}/>
              <DayPage day={day} appointments = {this.state.appointments}/>
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
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
