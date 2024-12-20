import multer from "multer";
import path from "path";

const UPLOADS_FOLDER = path.join("backend/statics");
console.log("Carpeta: ", UPLOADS_FOLDER);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_FOLDER),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isValidType =
      /jpeg|jpg|png|pdf/.test(file.mimetype) &&
      /jpeg|jpg|png|pdf/.test(path.extname(file.originalname).toLowerCase());
    isValidType
      ? cb(null, true)
      : cb(new Error("Tipo de archivo no soportado."));
  },
});

export { upload };
