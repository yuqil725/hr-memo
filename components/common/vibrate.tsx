import { Platform, Vibration } from "react-native";

function vibrate() {
  const timeout = 500;
  if (Platform.OS === "ios") {
    // this logic works in android too. you could omit the else statement
    const interval = setInterval(() => Vibration.vibrate(), 100);
    // it will vibrate for 5 seconds
    setTimeout(() => clearInterval(interval), timeout);
  } else {
    Vibration.vibrate(timeout);
  }
}

export default vibrate;
