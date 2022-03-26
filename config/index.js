const dotenv = require('dotenv');
const path = require('path');

const init = () => {
  let configPath;
  if (process.env.NODE_ENV === "development") {
    configPath = path.resolve(__dirname, `${process.env.NODE_ENV}.env`);
  } else {
    process.env.NODE_ENV = "production";
    configPath = path.resolve(__dirname, `${process.env.NODE_ENV}.env`);
  };

  dotenv.config({
    path: configPath
  });
};

module.exports = { init };