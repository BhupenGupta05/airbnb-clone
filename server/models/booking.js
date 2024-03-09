const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({ 
    place: {
        type:mongoose.Schema.Types.ObjectId, 
        required:true, 
        ref:'Place'
    },
    user: {
        type:mongoose.Schema.Types.ObjectId, 
        required:true,
    },
    checkIn: {
        type:Date, 
        required:true
    },
    checkOut: {
        type:Date, 
        required:true
    },
    name: {
        type:String, 
        required:true
    },
    phone: {
        type:String, 
        required:true
    },
    price: Number,
})

bookingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking