// Utility page made to not clutter other pages


//used to handle switching between months using the arrows
export const handleArrow = function (event) {
  console.log(typeof this.props.year, typeof this.props.month)
  if (event.target.className === 'next') {
    if (this.props.month == 12) {
      this.props.handleAppointments(this.props.year + 1, 1)

      this.handleDaysPerMonth(this.props.year + 1, 1)
      this.props.handleYear(this.props.year + 1)
      this.props.handleMonth(1)

    }
    else {
      this.props.handleAppointments(this.props.year, this.props.month + 1)
      this.handleDaysPerMonth(this.props.year, this.props.month + 1)
      this.props.handleMonth(this.props.month + 1)
    }
  } else {
    if (this.props.month == 1) {
      if(this.props.year == 101) return alert('cannot keep track of events before year 101')
        this.props.handleAppointments(this.props.year - 1, 12)
        this.handleDaysPerMonth(this.props.year - 1, 12)
        this.props.handleYear(this.props.year - 1)
        this.props.handleMonth(12)
    } else {
      this.props.handleAppointments(this.props.year, this.props.month - 1)
      this.handleDaysPerMonth(this.props.year, this.props.month - 1)
      this.props.handleMonth(this.props.month - 1)
    }
  }
}

//used to create the next calendar month's array for display
export const handleDaysPerMonth = function (year, month) {
  let checkDate = new Date(`${year}, ${month}, 1`)
  console.log(month)
  year = checkDate.getFullYear()
  month = checkDate.getMonth()
  let start = checkDate.getDay();
  const daysPerMonths = this.state.daysPerMonths.slice(0)
  console.log(month)
  console.log(month-1)
  
  let daysInMonth = daysPerMonths[month]
  let daysInPreMonth;
  (month - 1) > 0 ? daysInPreMonth = daysPerMonths[month - 1] : daysInPreMonth = daysPerMonths[11]
  let preMonth = month + 1
  let nextMonth = month + 1
  let preYear = year
  let nextYear = year
  if (!(preMonth - 1)) {
    preMonth = 12;
    preYear = year - 1;
  }
  else { preMonth-- }

  if (nextMonth + 1 === 13) {
    nextMonth = 1;
    nextYear++
  }
  else { nextMonth++ }

  if (month === 1 && year % 4 === 0) daysInMonth++
  else if (month === 2 && year % 4 === 0) daysInPreMonth++
  let days = []
  for (let i = 0, j = 1; i < 35; i++) {
    if (i < start) { days.push([daysInPreMonth - start + i + 1, preYear, preMonth, 'not-present']) }
    else if (j <= daysInMonth) {
      days.push([j, year, month + 1, 'present'])
      j++
    }
    else {
      days.push([j % daysInMonth, nextYear, nextMonth, 'not-present'])
      j++
    }
  }

  console.log(days)
  this.setState({ days: days })
}

export const creatingTimePart = function (num) {
  if (num.length !== 2) { num = '0' + num }
  return num
}

//creates the time string for each appointment
export const creatingTimeString = function (startH, startM, start, endH, endM, end) {
  startH = creatingTimePart(startH.value)
  startM = creatingTimePart(startM.value)
  endH = creatingTimePart(endH.value)
  endM = creatingTimePart(endM.value)

  let timeString = `${startH}:${startM}${start.value} - ${endH}:${endM}${end.value}`

  return timeString
}

//For comparing start Times to sort appointments on same day
export const getTimeStart = function (appointment) {
  let startTime = appointment.time.slice(0, 8)
  let changedNumber = ''
  for (let i = 0; i < startTime.length; i++) {
    if (startTime[i] === ':') { }
    else { changedNumber += startTime[i] }
  }
  changedNumber = parseInt(changedNumber) % 1200
  return changedNumber
}
