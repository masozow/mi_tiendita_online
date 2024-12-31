import express from "express";
import { checkAuth } from "../middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const last_index = __dirname.lastIndexOf("backend");
const dirname = __dirname.substring(0, last_index);

router.use("/", checkAuth, (req, res, next) => {
  const filePath = path.join(
    dirname,
    process.env.UPLOAD_FOLDER,
    decodeURIComponent(req.path)
  );
  res.sendFile(filePath, (err) => {
    if (err) {
      next(err);
    }
  });
});

export default router;
