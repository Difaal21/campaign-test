const wrapper = require("../helpers/utils/wrapper");
const { ERROR } = require("../helpers/http-status/status_code");
const init = server => {
  server.use("/v1/movies", require("./movie"));
  server.use("/v1/cast", require("./cast"));
  server.use("/v1/movie/cast", require("./movie_cast"));

  server.use((req, res, next) => {
    const error = new Error("Page Not Found");
    res.status(404);
    next(error);
  });

  server.use((error, req, res, next) => {
    wrapper.response(res, false, null, ERROR.NOT_FOUND, error.message);
  });
};

exports.init = init;