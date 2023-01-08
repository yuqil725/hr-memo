import { FileUploader } from "react-drag-drop-files";
import { ImageBackground, TouchableOpacity } from "react-native";
import styles from "../../../assets/styles";

export const ProfileImage = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPressCallback}>
      <FileUploader onDrop={props.onDrop}>
        <ImageBackground source={{ uri: props.url }} style={styles.photo} />
      </FileUploader>
    </TouchableOpacity>
  );
};

export default ProfileImage;
