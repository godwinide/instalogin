const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = User = model("User", UserSchema);