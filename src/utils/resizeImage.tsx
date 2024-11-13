import Resizer from "react-image-file-resizer";


export const resizeFile = (file:any) => 
    new Promise((resolve, reject) => {
      let quality = 100;
      const maxWidth = 300; 
      const maxHeight = 300; 
      const targetSize = 50000; 
  
      const attemptResize = () => {
        Resizer.imageFileResizer(
          file,
          maxWidth,
          maxHeight,
          "JPEG",
          quality,
          0,
          (uri) => {
            if (typeof uri !== 'string') {
              reject(new Error("Expected uri to be a string, but received different type."));
              return;
            }
  
            let byteString;
            if (uri.indexOf('base64,') >= 0) {
              byteString = atob(uri.split(',')[1]);
            } else {
              byteString = unescape(uri.split(',')[1]);
            }
  
            const size = byteString.length;
            
            if (size > targetSize && quality > 10) {
              quality -= 10;
              attemptResize(); 
            } else {
              resolve(uri);
            }
          },
          "base64"
        );
      };
  
      attemptResize(); 
    });