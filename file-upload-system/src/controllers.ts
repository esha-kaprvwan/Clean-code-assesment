import { Request, Response } from 'express';
import * as multer from 'multer';
import fs from 'fs';
import path from 'path';

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage }).single('file');

// File upload controller
export const uploadFile = (req: Request, res: Response) => {
    upload(req, res, (err) => {
        if (err || !req.file) {
            return res.status(400).send('No file uploaded.');
        }
        res.status(200).send({ fileId: req.file.filename });
    });
};

// File retrieval controller
export const getFile = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, 'uploads', req.params.fileId);
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found.');
        }
    });
};

// File deletion controller
export const deleteFile = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, 'uploads', req.params.fileId);
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).send('File not found.');
        }
        res.status(200).send('File deleted successfully.');
    });
};
