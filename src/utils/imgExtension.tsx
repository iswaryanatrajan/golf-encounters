export function hasImageExtension(filename:any) {
    var pattern = /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i;
    return pattern.test(filename);
  }