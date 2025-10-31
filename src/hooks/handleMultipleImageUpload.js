import toast from "react-hot-toast";

const uploadImagesToCloudinary = async (images = []) => {
  const cloudName = "dha51flmf";
  const uploadPreset = "demo_for_project";

  if (!images.length) return [];

  try {
    const uploadPromises = images.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      return data.secure_url;
    });

    const prom = Promise.all(uploadPromises);
    toast.promise(prom, {
      loading: "Uploading Products Images",
      success: "Image Upload  successfully!",
      error: (err) => err.message || "Something went wrong!",
    });

    const uploadedUrls = await prom;
    return uploadedUrls;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return [];
  }
};
export default uploadImagesToCloudinary;
