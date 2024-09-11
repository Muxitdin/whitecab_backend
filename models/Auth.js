const mongoose = require('mongoose');

const Auth = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        phonenumber: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        agreement: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Auth", Auth);
