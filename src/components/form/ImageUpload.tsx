import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Label } from "./Label";

interface ImageUploadProps {
  value?: string | null;
  onChange: (value: string) => void;
  error?: boolean;
  label?: string;
}

export function ImageUpload({ value, onChange, error, label }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (urlValue.trim()) {
      onChange(urlValue);
      setUrlValue("");
      setShowUrlInput(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}

      {value ? (
        <div className="relative">
          <div className="group relative aspect-square w-full max-w-xs overflow-hidden rounded-xl border-2 border-ocean-200 bg-white">
            <img
              src={value}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all group-hover:bg-opacity-50">
              <button
                type="button"
                onClick={handleRemove}
                className="translate-y-4 rounded-full bg-error-500 p-2 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all
              ${
                isDragging
                  ? "border-brand-500 bg-brand-50"
                  : error
                  ? "border-error-300 bg-error-50"
                  : "border-ocean-300 bg-ocean-50 hover:border-brand-400 hover:bg-brand-50"
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3">
              <div
                className={`rounded-full p-4 ${
                  isDragging ? "bg-brand-100" : "bg-ocean-100"
                }`}
              >
                <Upload
                  className={`h-8 w-8 ${
                    isDragging ? "text-brand-600" : "text-ocean-600"
                  }`}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {isDragging ? "Déposez votre image ici" : "Glissez-déposez votre image"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  ou cliquez pour parcourir
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-px w-12 bg-gray-300"></div>
                <span className="text-xs text-gray-500">ou</span>
                <div className="h-px w-12 bg-gray-300"></div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUrlInput(true);
                }}
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Coller une URL
              </button>
            </div>
          </div>

          {showUrlInput && (
            <div className="mt-3 flex gap-2">
              <input
                type="url"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder="https://exemple.com/image.jpg"
                className="flex-1 rounded-lg border border-ocean-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleUrlSubmit();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUrlInput(false);
                  setUrlValue("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500">
        Formats acceptés : JPG, PNG, GIF (max 5 Mo)
      </p>
    </div>
  );
}
