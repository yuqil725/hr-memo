import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SLogin } from "../assets/styles/login";
import { ApiAuth } from "../backend/appwrite/service/database/auth";
import { Constants } from "../Constants";
import store from "../redux_modules";
import { AChangeSession } from "../redux_modules/action";

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const passwordRef: React.MutableRefObject<TextInput | null> = useRef(null);

  function submit() {
    let apiAuth = new ApiAuth(Constants.API_ENDPOINT, Constants.P_NAMECARD_ID);

    apiAuth.createSessionIfNoLogin(email, password, () => {
      store.dispatch(AChangeSession({ loggedIn: true }));
    });

    setTimeout(() => {
      navigation.navigate("Login");
    }, 500);
  }

  useFocusEffect(
    useCallback(() => {
      submit();
    }, [])
  );

  return (
    <View style={SLogin.screenView}>
      <ImageBackground source={require("../assets/images/bg.png")}>
        <View style={SLogin.textInputView}>
          <TextInput
            autoCompleteType="email"
            placeholder="email"
            style={SLogin.textInput}
            value={email}
            autoFocus={email.length > 0 ? true : undefined}
            onChangeText={setEmail}
          />
          <TextInput
            autoCompleteType="password"
            ref={passwordRef}
            placeholder="password"
            secureTextEntry={true}
            style={SLogin.textInput}
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => {
              submit();
            }}
            onLayout={() => {
              passwordRef.current?.focus();
            }}
          />
          <Pressable
            style={SLogin.submitButton}
            onPress={() => {
              submit();
            }}
          >
            <Text>submit</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
