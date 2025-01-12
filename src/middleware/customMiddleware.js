const customMiddleware = async (req, res, next) => {
  global.workspaceId = "youtube";
  console.log(global.workspaceId);
  next();
};
module.exports = customMiddleware;
