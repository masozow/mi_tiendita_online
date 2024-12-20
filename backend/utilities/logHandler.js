import insertLog from "./insertLog.js";

const logHandler = async ({ level, message, genericId, userId }) => {
  if (process.env.NODE_ENV !== "prod") console.log("message", message);
  else await insertLog(level, message, genericId, userId);
};

export default logHandler;
