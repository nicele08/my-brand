// import fs from 'fs';
// import Article from '../models/articleModel';

// export default function removeArticleImage(id) {
//   Article.findById(id)
//     .then((result) => {
//       if (result) {
//         fs.unlink(result.articleImage, (err) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log(`
//                             Ok: file deleted at
//                                 at: ${result.articleImage}
//                         `);
//         });
//       }
//     });
// }
