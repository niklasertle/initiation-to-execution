require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const serverPort = process.env.PORT || 3001;

module.exports = {
    jwtSecretKey,
    serverPort
}