const router = require('express').Router()
const {Appointment} = require('../db/models')

router.get('/:year-:month', (req ,res ,next) => {
    Appointment.findAll({
        where: {
            year : req.params.year,
            month : req.params.month }})
            .then(appointment => {
                console.log(appointment)
                res.json(appointment)
            })
            .catch(next)
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