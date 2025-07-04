import { useMutation } from "@tanstack/react-query";

// upload images
async function uploadImages(files: File[], context: string): Promise<{ urls: string[] }> {
    const formData = new FormData();
    files.forEach(file => formData.append("file", file));
    formData.append("context", context);
    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload images");
    return res.json();
}

export function useUploadImages() {
  return useMutation({
    mutationFn: ({ files, context } : {files: File[], context: string}) => uploadImages(files, context),
    onSuccess: (data) => {
      console.log("Upload success:", data.urls);
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });
}