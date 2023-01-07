import * as ImagePicker from "expo-image-picker";

export const UrlToObject = async (url: string, fileName: string) => {
  const response = await fetch(url);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};

export const PickImage = async () => {
  // No permissions request is necessary for launching the image library
  return await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
};
