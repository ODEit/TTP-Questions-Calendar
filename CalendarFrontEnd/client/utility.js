export const handleArrow = function(event){
    if(event.target.className === 'next'){
      if(this.props.month === 12){
        this.props.handleAppointments(this.props.year+1, 1)
        
        this.handleDaysPerMonth(this.props.year+1, 1)
        this.props.handleYear(this.props.year+1)
        this.props.handleMonth(1)
        
      }
      else{
        this.props.handleAppointments(this.props.year, this.props.month+1)
        this.handleDaysPerMonth(this.props.year, this.props.month+1)
        this.props.handleMonth(this.props.month+1)
      }
    }else{
      if(this.props.month === 1){
        this.props.handleAppointments(this.props.year-1, 12)
        this.handleDaysPerMonth(this.props.year-1, 12)
        this.props.handleYear(this.props.year-1)
        this.props.handleMonth(12)
      }else{
        this.props.handleAppointments(this.props.year, this.props.month-1)
        this.handleDaysPerMonth(this.props.year, this.props.month-1)        
        this.props.handleMonth(this.props.month-1)
      }
    }
  }

export const handleDaysPerMonth = function (year, month){
    let checkDate = new Date(`${year}, ${month}, 1`)
     year = checkDate.getFullYear()
     month = checkDate.getMonth()
    let start = checkDate.getDay();
    let daysInMonth = this.state.daysPerMonths[month]
    if(month === 1 && year%4===0) daysInMonth ++        
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
    this.setState({days: days})
  }