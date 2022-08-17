const { JWT_SECRET = "JWT_SECRET" } = process.env;

const DB_ADDRESS = 1;

module.exports = {
  JWT_SECRET,
  DB_ADDRESS,
};
