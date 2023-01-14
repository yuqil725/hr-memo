import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "../../assets/styles";
import { ICheckbox } from "../../interfaces/general";

const Checkbox = ({ checked, onChecked, textInputProps }: ICheckbox) => {
  return (
    <View style={styles.checkboxView}>
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={onChecked}
      >
        {checked ? (
          <Ionicons name="checkmark" size={20} style={styles.checkIcon} />
        ) : undefined}
      </Pressable>
      <TextInput
        {...textInputProps}
        style={{
          ...textInputProps.style,
          textDecorationLine: checked ? "line-through" : undefined,
        }}
      />
    </View>
  );
};

export default Checkbox;
