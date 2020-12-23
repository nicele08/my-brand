// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'server/assets/article-images/');
//   },
//   filename(req, file, cb) {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//     cb(null, `${file.originalname}-${uniqueSuffix}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpg' ||
// file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter,
// });

// export default upload;
