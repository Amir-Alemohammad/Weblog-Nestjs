import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer"
import * as fs from "fs"
import * as path from "path"
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

function createRoute(req) {
    let d = new Date();
    const year = d.getFullYear() + "";
    const month = d.getMonth() + 1 + "";
    const day = d.getDate() + "";
    const directory = path.join(__dirname, "..", "..", "public", "uploads", "posts", year, month, day);
    req.body.fileUploadPath = path.join("uploads", "posts", year, month, day).replace(/\\/g, "/");
    fs.mkdirSync(directory, { recursive: true });
    return directory;
}
const storage = diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const filePath = createRoute(req);
            return cb(null, filePath)
        }
        cb(null, null)
    },
    filename: (req, file, cb) => {
        if (file.originalname) {
            const fileName = `${uuidv4()}_${file.originalname.replace(/ /g, "")}`;
            req.body.filename = fileName;
            req.body.image = path.join(req.body.fileUploadPath, req.body.filename)
            return cb(null, fileName)
        }
        cb(null, null)
    }
});
const fileFilter = function (req, file, cb) {
    const mimetypes = ["image/jpg", "image/gif", "image/jpeg", "image/png", "image/webp"]
    if (!mimetypes.includes(file.mimetype)) return cb(new HttpException("The file format is not correct", HttpStatus.BAD_REQUEST))
    else return cb(null, true)
}
const maxSize = 1 * 1000 * 1000
const uploadFile = FileInterceptor("image", {
    storage,
    fileFilter,
    limits: {
        fileSize: maxSize,
    },
})
export default uploadFile;