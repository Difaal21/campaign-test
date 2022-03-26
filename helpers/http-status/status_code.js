const ERROR = {
  'BAD_REQUEST': 400,
  'UNAUTHORIZED': 401,
  'FORBIDDEN': 403,
  'NOT_FOUND': 404,
  'CONFLICT': 409,
  'EXPECTATION_FAILED': 417,
  'INTERNAL_ERROR': 500,
  'SERVICE_UNAVAILABLE': 503,
  'GATEWAY_TIMEOUT': 504
};

const SUCCESS = {
  'OK': 200,
  'CREATED': 201
};

module.exports = {
  ERROR,
  SUCCESS
};
