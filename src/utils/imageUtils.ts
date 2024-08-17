// src/utils/imageUtils.ts
export function cropImage(imageBlob: Blob, cropHeight: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = () => {
        img.src = reader.result as string;
      };
  
      reader.onerror = () => reject(new Error('Failed to read the image file'));
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
  
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height - cropHeight;
  
        // Draw the image on the canvas, cropping the bottom
        ctx.drawImage(img, 0, 0, img.width, img.height - cropHeight, 0, 0, img.width, img.height - cropHeight);
  
        // Ensure the blob is created properly
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create image blob'));
          }
        }, 'image/jpeg');
      };
  
      reader.readAsDataURL(imageBlob);
    });
  }
  