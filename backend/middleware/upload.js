import multer from "multer";
import path from "path";
import SchemaFields from "./validators/schemaFields.js";
const UPLOADS_FOLDER = process.env.UPLOAD_FOLDER;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Req body in upload: ", req.body);
    if (req.body[SchemaFields.NOMBRE_PRODUCTO]) {
      cb(null, UPLOADS_FOLDER);
    } else {
      cb(null, false);
    }
  },
  filename: (req, file, cb) => {
    if (req.body[SchemaFields.NOMBRE_PRODUCTO]) {
      const fileExtension = path.extname(file.originalname);
      cb(null, req.body[SchemaFields.NOMBRE_PRODUCTO] + fileExtension);
    } else {
      cb(null, false);
    }
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!req.body[SchemaFields.NOMBRE_PRODUCTO]) {
      return cb(null, false);
    }
    const isValidType =
      /jpeg|jpg|png|pdf/.test(file.mimetype) &&
      /jpeg|jpg|png|pdf/.test(path.extname(file.originalname).toLowerCase());
    if (isValidType) {
      cb(null, true);
    } else {
      req.fileValidationError = "Tipo de archivo no soportado.";
      cb(null, false);
    }
  },
});

export { upload };
