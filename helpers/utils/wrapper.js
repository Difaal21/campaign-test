
const data = (data, description = '', code = 200) => ({ err: null, message: description, data, code });
const error = (err, description = "Internal Server Error", code = 500) => ({ err, code, data: null, message: description });
const response = (res, success, data, code, message) => res.status(code).json({ success, data, code, message });

module.exports = { response, error, data };