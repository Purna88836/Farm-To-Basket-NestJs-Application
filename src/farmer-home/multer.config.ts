import * as multer from 'fastify-multer';

export function setupMulter() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './media'); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Filename
    }
  });

  // Using 'any' as a type assertion to bypass the explicit type conflict
  return multer({ storage: storage }) as any;
}
