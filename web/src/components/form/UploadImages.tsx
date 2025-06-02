"use client";
/* eslint-disable @next/next/no-img-element */
// components/ImageDropzone.tsx
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

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

      // Validar rechazos
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
        // Reemplazar todo por el primer archivo válido, o vaciar si ninguno
        newFiles = validFiles.length > 0 ? [validFiles[0]] : [];
      } else {
        // maxFiles > 1, agregar validFiles sin perder previos, respetando maxFiles
        // Primero filtramos previos para no exceder maxFiles
        const prevFilesFiltered = files.slice(0, maxFiles - validFiles.length);
        newFiles = [...prevFilesFiltered, ...validFiles];
      }

      setFiles(newFiles);
      onChange(newFiles.filter((f): f is File => typeof f !== "string"));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files, maxFiles, maxSize, maxWidth, maxHeight, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: maxFiles > 1,
    maxFiles,
    maxSize,
  });

  // Generar previews (crear URLs sólo para Files)
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

  const cols = Math.min(files.length || 1, maxFiles, 3);

  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles.filter((f): f is File => typeof f !== "string"));
  };
  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-4 border-2 border-dashed rounded cursor-pointer
          ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta las imágenes aquí…</p>
        ) : (
          <p>Arrastra o haz clic para seleccionar ({maxFiles} máx.)</p>
        )}
      </div>

      {/* Errores */}
      {errors.length > 0 && (
        <ul className="mt-2 text-red-600">
          {errors.map((err, i) => (
            <li key={i} className="text-sm">
              • {err}
            </li>
          ))}
        </ul>
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div
          className="mt-4 grid content-center gap-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative max-h-40 h-full  block w-full max-w-40"
            >
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute w-7 text-sm h-7 top-1 right-1 bg-white-main rounded-full p-1 shadow hover:bg-secondary-main hover:text-white-main font-bold"
              >
                ✕
              </button>
              <img
                src={src}
                className="max-h-40 h-full  block w-full max-w-40 object-cover rounded"
                alt={`preview-${i}`}
              />
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-sm text-black-800">
        Seleccionaste {files.length} archivo(s).
      </p>
    </div>
  );
};

export default UploadImages;
