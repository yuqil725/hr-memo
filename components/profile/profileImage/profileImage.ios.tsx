import { ImageBackground, TouchableOpacity } from "react-native";
import styles from "../../../assets/styles";

export const ProfileImage = (props: any) => {
  console.debug("profileImage IOS version");
  return (
    <TouchableOpacity onPress={props.onPressCallback}>
      <ImageBackground source={{ uri: props.url }} style={styles.photo} />
    </TouchableOpacity>
  );
};

export default ProfileImage;
