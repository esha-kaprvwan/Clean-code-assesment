import { Router } from 'express';
import { uploadFile, getFile, deleteFile } from './controllers';

const router = Router();

// File upload route
router.post('/upload', uploadFile);

// File retrieval route
router.get('/files/:fileId', getFile);

// File deletion route
router.delete('/files/:fileId', deleteFile);

export { router };
