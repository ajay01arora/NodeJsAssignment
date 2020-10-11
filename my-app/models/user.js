const mongoose = require('mongoose');
const schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSecret = "MY_Secret-Key";
const saltRounds = process.env.SALT_ROUNDS || 10;

const userSchema =new schema({
    full_name : String,
    username : String,
    password: String,
    token : String,
    user_role : String    
})

userSchema.methods.setHashedPassword = async function () {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  };
  
userSchema.methods.validatePassword = async function (password) {
const pwdMatches = await bcrypt.compare(password, this.password);
return pwdMatches;
};

userSchema.methods.generateJwtToken = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 1);
  
    return jwt.sign(
      {
        id: this._id,
        username: this.username,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
      },
      jwtSecret
    );
  };
  
  userSchema.methods.toAuthJson = function () {
    var temp_token =this.generateJwtToken();
    this.token =temp_token;
    return {
      username: this.username,
      _id: this._id,
      token: temp_token,
    };
  };
  

module.exports = mongoose.model("User", userSchema);