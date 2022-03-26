const PORT = process.env.PORT || 5000;
const logger = require("./helpers/utils/logger");
const app = require("./server");

app.listen(PORT, () => {
  const ctx = 'app-listen';
  logger.logOnly(ctx, `Apps started, listening at ${PORT}`, 'initate application');
})
