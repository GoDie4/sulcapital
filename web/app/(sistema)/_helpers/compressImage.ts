import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      fileType: "image/webp",
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    // El nombre no importa, el backend decidirá
    return new File([compressedFile], file.name, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch (error) {
    throw error;
  }
};
