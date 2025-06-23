"use client";
/* eslint-disable @next/next/no-img-element */
// components/UploadImages.tsx
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { MdLibraryAdd } from "react-icons/md";

interface ImageDropzoneProps {
  filesInit?: (File | string)[];
  maxFiles?: number;
  maxSize?: number; // en bytes
  maxWidth?: number; // en px
  maxHeight?: number; // en px
  onChange: (files: (File | string)[]) => void;
}

const UploadImages: React.FC<ImageDropzoneProps> = ({
  filesInit,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB por defecto
  maxWidth = 2000,
  maxHeight = 2000,
  onChange,
}) => {
  const [files, setFiles] = useState<(File | string)[]>(filesInit ?? []);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          setErrors((prev) => [
            ...prev,
            `La imagen \"${file.name}\" excede ${maxWidth}×${maxHeight}px.`,
          ]);
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        setErrors((prev) => [
          ...prev,
          `No se pudo leer la imagen \"${file.name}\".`,
        ]);
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setErrors([]);

      fileRejections.forEach((rej) => {
        rej.errors.forEach((e) => {
          if (e.code === "file-too-large") {
            setErrors((prev) => [
              ...prev,
              `\"${rej.file.name}\" supera ${maxSize / 1024 / 1024} MB.`,
            ]);
          }
          if (e.code === "too-many-files") {
            setErrors((prev) => [
              ...prev,
              `Máximo ${maxFiles} archivos permitidos.`,
            ]);
          }
        });
      });

      const validFiles: File[] = [];
      for (const file of acceptedFiles) {
        if (validFiles.length >= maxFiles) break;
        const ok = await validateImage(file);
        if (ok) validFiles.push(file);
      }

      let newFiles: (File | string)[] = [];
      if (maxFiles === 1) {
        newFiles = validFiles.length > 0 ? [validFiles[0]] : [];
      } else {
        const prevFilesFiltered = files.slice(0, maxFiles - validFiles.length);
        newFiles = [...prevFilesFiltered, ...validFiles];
      }

      setFiles(newFiles);
      onChange(newFiles.filter((f): f is File => typeof f !== "string"));
    },
    [files, maxFiles, maxSize, maxWidth, maxHeight, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: maxFiles > 1,
    maxFiles,
    maxSize,
  });

  useEffect(() => {
    const urls = files.map((file) =>
      typeof file === "string" ? file : URL.createObjectURL(file)
    );
    setPreviews(urls);

    return () => {
      urls.forEach((url, i) => {
        if (typeof files[i] !== "string") URL.revokeObjectURL(url);
      });
    };
  }, [files]);

  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles.filter((f): f is File => typeof f !== "string"));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={
          `px-4 py-8 border-2 border-dashed rounded cursor-pointer w-full ` +
          (isDragActive ? "border-blue-500" : "border-gray-300")
        }
      >
        <input {...getInputProps()} />
        {previews.length > 0 ? (
          <div className="flex space-x-4 overflow-x-auto max-w-full">
            {previews.map((src, i) => (
              <div key={i} className="relative flex-shrink-0 w-32 h-32">
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 bg-white-main shadow hover:bg-red-500 hover:text-white font-bold"
                >
                  ✕
                </button>
                <img
                  src={src}
                  alt={`preview-${i}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        ) : isDragActive ? (
          <p className="flex flex-col justify-center items-center">
            Suelta las imágenes aquí…
          </p>
        ) : (
          <p className="flex flex-col justify-center items-center text-center gap-2">
            <MdLibraryAdd className="text-4xl" />
            <span>Arrastra o haz clic para seleccionar ({maxFiles} máx.)</span>
          </p>
        )}
      </div>

      {errors.length > 0 && (
        <ul className="mt-2 text-red-600">
          {errors.map((err, i) => (
            <li key={i} className="text-sm">• {err}</li>
          ))}
        </ul>
      )}

      <p className="mt-2 text-sm text-gray-800">
        Seleccionaste {files.length} archivo{files.length !== 1 ? 's' : ''}.
      </p>
    </div>
  );
};

export default UploadImages;
