import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

import {CalendarPage} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {

  render () {

    return (
      <Switch>
        <Route component={CalendarPage} />
      </Switch>
    )
  }
}



// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter((Routes))

