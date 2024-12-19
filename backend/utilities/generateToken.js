import jwt from "jsonwebtoken";

const tokenSign = async (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { tokenSign, verifyToken };
