const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 1024,
    },
    token: {
        type: String
    },
},
{
    timestamps: true,
}
);
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
      next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
      next();
  });
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
module.exports = mongoose.model("User", userSchema);
