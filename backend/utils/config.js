const { JWT_SECRET } = process.env;

const DB_ADDRESS = "mongodb://localhost:27017";

module.exports = {
  JWT_SECRET,
  DB_ADDRESS,
};
