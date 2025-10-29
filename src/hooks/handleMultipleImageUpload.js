const uploadImagesToCloudinary = async (images = []) => {
  const cloudName = "dha51flmf";
  const uploadPreset = "demo_for_project";
  console.log("called");
  console.log(images);
  if (!images.length) return [];

  try {
    console.log("called");
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

    const uploadedUrls = await Promise.all(uploadPromises);
    console.log(uploadedUrls);
    return uploadedUrls;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return [];
  }
};
export default uploadImagesToCloudinary;
