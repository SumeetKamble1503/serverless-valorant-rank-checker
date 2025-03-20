
const customMiddleware = async (req, res, next) => {
  global.workspaceId = "youtube";
  next();
};
module.exports = customMiddleware;
