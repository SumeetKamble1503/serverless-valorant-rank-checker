const customMiddleware = async (req, res, next) => {
  next();
};
module.exports = customMiddleware;
