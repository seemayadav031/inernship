const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
    name: String,

    email: String,

    mobile: String,

    collegeId: {
        type: ObjectId,
        ref: 'College'
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('InternProjectTwo', internSchema)