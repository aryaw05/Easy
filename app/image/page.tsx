"use client";

import { supabase } from "@/lib/supabase/utils";
import { useState } from "react";
export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle file input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  // Upload file ke Supabase Storage
  const handleUpload = async () => {
    if (!file) return alert("Pilih gambar terlebih dahulu!");

    setLoading(true);
    const res = await fetch(
      "http://localhost:3000/api/dashboard/image_storage/upload",
      {
        method: "POST",
        body: file,
      },
    );

    if (res.ok) {
      const data = await res.json();
      setUploadUrl(data.url);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Upload Gambar ke Supabase</h1>

      {/* Input File */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Preview Gambar */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mb-4 h-40 w-40 rounded object-cover"
        />
      )}

      {/* Tombol Upload */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Tampilkan Link Gambar */}
      {uploadUrl && (
        <div className="mt-4">
          <p>Gambar berhasil diunggah:</p>
          <a
            href={uploadUrl}
            target="_blank"
            className="text-blue-500 underline"
          >
            {uploadUrl}
          </a>
        </div>
      )}
    </div>
  );
}
