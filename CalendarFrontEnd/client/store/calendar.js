import axios from 'axios'


/**
* ACTION TYPES
*/
const GET_PRESENT_DATE = 'GET_PRESENT_DATE'
const GET_MONTH = 'GET_MONTH'
const GET_YEAR = 'GET_YEAR'
const GET_APPOINTMENTS = 'GET_APPOINTMENTS'

const ADD_APPOINTMENTS = 'ADD_APPOINTMENTS'
const SHIFT_MODAL = 'SHIFT_MODAL'
const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT'


/**
* INITIAL STATE
*/
const calendar = {
    presentDate: '',
    year: '',
    month: '',
    modal: false,
    appointments: []
}

/**
* ACTION CREATORS
*/

export const getPresentDate = (presentDate) => ({ type: GET_PRESENT_DATE, presentDate })
export const getMonth = (month) => ({ type: GET_MONTH, month })
export const getYear = (year) => ({ type: GET_YEAR, year })
export const shiftModal = () => ({ type: SHIFT_MODAL })
export const getAppointments = (appointments) => ({ type: GET_APPOINTMENTS, appointments })
export const addAppointments = (appointment) => ({ type: ADD_APPOINTMENTS, appointment })
export const removeAppointment = (id) => ({ type: REMOVE_APPOINTMENT, id })

/**
* THUNK CREATORS
*/

export const getAppointmentsThunk = (year, month) =>
    dispatch =>
        axios.get(`/api/appointments/${year}-${month}`)
            .then(appointments => dispatch(getAppointments(appointments.data)))
            .catch(err => console.log(err))

export const addAppointmentThunk = (body) =>
    dispatch =>
        axios.post('/api/appointments/', body)
            .then((appointment) => dispatch(addAppointments(appointment.data)))
            .catch(err => console.log(err))

export const removeAppointmentThunk = (id) =>
    dispatch =>
        axios.delete(`/api/appointments/${id}`)
            .then(() => dispatch(removeAppointment(id)))
            .then(() => console.log('done'))
            .catch(err => console.log(err))


/**
* REDUCER
*/
export default function (state = calendar, action) {
    switch (action.type) {
        case GET_PRESENT_DATE:
            return Object.assign({}, state, { presentDate: action.presentDate })
        case GET_MONTH:
            return Object.assign({}, state, { month: action.month })
        case GET_YEAR:
            return Object.assign({}, state, { year: action.year })
        case SHIFT_MODAL:
            return Object.assign({}, state, { modal: !state.modal })
        case GET_APPOINTMENTS:
            return Object.assign({}, state, { appointments: action.appointments })
        case ADD_APPOINTMENTS:
            return Object.assign({}, state, { appointments: state.appointments.concat(action.appointment) })
        case REMOVE_APPOINTMENT:
            return Object.assign({}, state, { appointments: state.appointments.filter((appointment) => appointment.id != action.id) })
        default:
            return state
    }
}
