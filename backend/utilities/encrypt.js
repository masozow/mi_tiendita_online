import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const hashedPassword = async (password) => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10); // Número de rondas desde el .env
  return await bcrypt.hash(password, saltRounds);
};
const encription = { hashedPassword };
export { encription };
