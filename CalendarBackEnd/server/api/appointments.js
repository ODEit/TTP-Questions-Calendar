const router = require('express').Router()
const {Appointment} = require('../db/models')

router.get('/:year-:month', async (req ,res ,next) => {
    let month = +req.params.month
    let preMonth = month - 1 ;
    let nextMonth = month + 1;
    let year = +req.params.year;
    let preYear = year;
    let nextYear = year;
    if( preMonth === 0 ) {
        preMonth = 12;
        preYear --
    }
    if(nextMonth === 13){
        nextMonth = 1;
        nextYear ++
    }
    let app1 = await Appointment.findAll({
        where: {
            year : year,
            month : month}})
            .catch(next)
    let app2 = [];
    if(preYear!==0) {
        app2 = await Appointment.findAll({
        where: {
            year : preYear,
            month : preMonth}})
            .catch(next)
        }
    let app3 = await Appointment.findAll({
        where: {
            year: nextYear,
            month: nextMonth
        }
    }).catch(next)

    let appointments = app1.concat(app2,app3)
    
    res.json(appointments)
    
    
})

router.post('/',  (req ,res ,next) => {
    Appointment.create(req.body)
    .then((appointment)=> res.json(appointment))
})


router.put('/:id', (req ,res ,next) => {
    Appointment.findOne({
        where: {
        id: req.params.id
    }})
    .then(appointment => {
        appontment.update(req.body)
    })
    .then(()=>{
        res.sendStatus(200)
    })
    .catch(next)
})

router.delete('/:id', (req ,res ,next) => {
    Appointment.findOne({
        where: {
            id : req.params.id }})
            .then(appointment => {
               appointment.destroy()
            })
            .then(()=> res.sendStatus(200))
            .catch(next)
})





module.exports = router