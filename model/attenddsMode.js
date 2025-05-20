const mongoose = require("mongoose")

const attenddsSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    checkInTime: {
        type: String,
        required: true
    },
    checkOutTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Present'
    }
}, { timestamps: true })


const Attendds = mongoose.model("Attendds", attenddsSchema)
module.exports = Attendds