/* eslint-disable @typescript-eslint/no-explicit-any */
const uploadImage = async (file: any) => {
  if (file) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=64eef6df0e97169ecf97e50f5575206c`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};

export default uploadImage;
