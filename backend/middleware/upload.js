import multer from "multer";
import path from "path";
import SchemaFields from "./validators/schemaFields.js";
const UPLOADS_FOLDER = process.env.UPLOAD_FOLDER;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Req body in upload: ", req.body);
    if (req.body[SchemaFields.NOMBRE_PRODUCTO]) {
      console.log("Destination folder set to:", UPLOADS_FOLDER);
      cb(null, UPLOADS_FOLDER);
    } else {
      console.log("No product name in request body, skipping file upload");
      cb(null, false);
    }
  },
  filename: (req, file, cb) => {
    if (req.body[SchemaFields.NOMBRE_PRODUCTO]) {
      const fileExtension = path.extname(file.originalname);
      console.log(
        "Filename set to:",
        req.body[SchemaFields.NOMBRE_PRODUCTO] + fileExtension
      );
      cb(null, req.body[SchemaFields.NOMBRE_PRODUCTO] + fileExtension);
    } else {
      console.log("No product name in request body, skipping file upload");
      cb(null, false);
    }
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    console.log("File filter called");
    if (!req.body[SchemaFields.NOMBRE_PRODUCTO]) {
      console.log("No product name in request body");
      return cb(null, false);
    }
    const isValidType =
      /jpeg|jpg|png|pdf/.test(file.mimetype) &&
      /jpeg|jpg|png|pdf/.test(path.extname(file.originalname).toLowerCase());
    if (isValidType) {
      console.log("File type is valid");
      cb(null, true);
    } else {
      console.log("File type is not supported");
      req.fileValidationError = "Tipo de archivo no soportado.";
      cb(null, false);
    }
  },
});

export { upload };
