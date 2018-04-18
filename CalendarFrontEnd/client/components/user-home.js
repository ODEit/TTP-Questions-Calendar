import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DayPage from './DayPage'
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props
  let presentDate = new Date()
  let presentDateString = new Date().toString();
  presentDateString = presentDateString.slice(0, presentDateString.indexOf(':') - 2)
  console.log(presentDateString)
  let checkDate = `${presentDate.getFullYear()}, ${presentDate.getMonth() + 1}, 1`
  let start = new Date(checkDate).getDay();
  console.log(start)
  console.log(checkDate)
  const days = []
  for (let i = 0, j = 1; i < 35; i++) {
    if (i < start) { days.push(31 - start + i) }
    else {
      j = j % 31
      if (j === 0) j = 31;
      days.push(j)
      j++
    }
  }
  console.log(days)
  function handleModal(event) {
    const day = event.target.dataset.day
    let modal = document.getElementById(`modal${day}`)
    console.log(modal)
    modal.style.display = 'flex'
    modal.style.flexDirection = 'column'
  }
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <div className="month">
        <ul className='monthContent'>
          <li className="prev">&#10094;</li>
          <h1 className='calendarHead'>
            {presentDateString}
          </h1>
          <li className="next">&#10095;</li>
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
        {days.length === 35 && days.map((day, key) => {
          return (<div key={key}
            data-day={day}
            onClick={handleModal.bind(this)}
            className = "daysEntry">
            <li data-day={day} >{day}</li>
            <DayPage day = {day}/>
          </div>)
        })}
      </ul>
    </div>
  )
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
