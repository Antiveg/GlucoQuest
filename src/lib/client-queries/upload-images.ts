import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// upload images
async function uploadImages(files: File[], context: string): Promise<{ urls: string[] }> {
    const formData = new FormData();
    files.forEach(file => formData.append("file", file));
    formData.append("context", context);
    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload image(s)");
    return res.json();
}

export function useUploadImages() {
  return useMutation({
    mutationFn: ({ files, context } : {files: File[], context: string}) => uploadImages(files, context),
    onSuccess: (data) => {
      toast.success(`${data.urls.length} image(s) uploaded successfully!`)
    },
    onError: (error) => {
      toast.success(error.message)
    },
  });
}