import multer from "multer";
import path from "path";

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/uploads");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      console.log("file.originalname", file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
