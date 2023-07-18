const { model, Schema } = require("mongoose");

const VictimSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Victim = model("Victim", VictimSchema);