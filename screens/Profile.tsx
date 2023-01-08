import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { useSelector } from "react-redux";
import styles, { WHITE } from "../assets/styles";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import { ApiProfileBucket } from "../backend/appwrite/service/storage/bucket/profile";
import { Icon, ProfileItem } from "../components";
import { ProfileImage } from "../components/profile/profileImage/profileImage";
import { Constants } from "../Constants";
import {
  IProfileItem,
  ISProfileDisplayItem,
  ISProfileMetaItem,
} from "../interfaces/profile";
import { ISearchCardScreen } from "../interfaces/search";
import store, { RootState } from "../redux_modules";
import {
  AChangeDisplayProfile,
  AChangeMetaProfile,
  AChangeSingleSearchCard,
} from "../redux_modules/action";
import {
  EMPTY_CARD,
  NEW_CARD,
} from "../redux_modules/reducer/change_search_card_screen";
import { PickImage } from "../utils/cameraUtil";
import { objectFilterKey, objectMapKey } from "../utils/objectUtil";
import { snakeCase } from "../utils/stringUtil";

const Profile = ({ navigation }: { navigation: any }) => {
  let apiProfileCollection = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  let apiProfileBucket = new ApiProfileBucket(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.BKT_NAMECARD_ID
  );

  let searchCardScreen: ISearchCardScreen = useSelector(
    (state: RootState) => state.searchCardScreen
  );

  let profileItem: IProfileItem = useSelector(
    (state: RootState) => state.profile
  );

  const updateImage = async (url: string, fileName: string, file?: File) => {
    profileItem.display.imagePath.map((img: string) => {
      apiProfileBucket.deleteFile(img);
    });
    console.log("Uploading new image");
    const response: any = await apiProfileBucket.createFile(
      url,
      fileName,
      file
    );
    const fileId = response.$id;
    const newImagePath: string[] = [fileId];
    // Update states
    store.dispatch(AChangeDisplayProfile({ imagePath: newImagePath }));
    store.dispatch(
      AChangeSingleSearchCard({
        documentId: profileItem.meta.documentId,
        imagePath: newImagePath,
      })
    );

    // Update DB
    apiProfileCollection.updateByDocumentId(profileItem.meta.documentId, {
      ImagePath: newImagePath,
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result: any = await PickImage();

    const fileName = snakeCase(profileItem.display.name + " 1");

    if (!result.canceled) {
      updateImage(result.assets[0].uri, fileName);
    }
  };

  const dropImage = async (file: File) => {
    console.log("received dropping file", file);
    const fileName = snakeCase(profileItem.display.name + " 1");
    updateImage("", fileName, file);
  };

  useEffect(() => {
    if (
      searchCardScreen.selectedCard.documentId &&
      searchCardScreen.selectedCard.documentId !== EMPTY_CARD.documentId &&
      searchCardScreen.selectedCard.documentId !== NEW_CARD.documentId
    ) {
      let promise = apiProfileCollection.queryByDocumentId(
        searchCardScreen.selectedCard.documentId
      );
      promise.then(
        function (response: any) {
          let newDisplayState = objectMapKey(
            objectFilterKey(response.documents[0], ISProfileDisplayItem),
            ISProfileDisplayItem
          );
          let newMetaState = objectMapKey(
            objectFilterKey(response.documents[0], ISProfileMetaItem),
            ISProfileMetaItem
          );
          console.log("set profile state", {
            display: newDisplayState,
            meta: newMetaState,
          });
          store.dispatch(AChangeDisplayProfile(newDisplayState));
          store.dispatch(AChangeMetaProfile(newMetaState));
        },
        function (error: any) {
          console.error(error);
        }
      );
    }
  }, [searchCardScreen.selectedCard.documentId]);

  const ProfileImageCaller = () => {
    return (
      <ProfileImage
        onPressCallback={async () => {
          console.log("Opening photo library");
          return await pickImage();
        }}
        url={
          profileItem.display.imagePath &&
          profileItem.display.imagePath.length > 0
            ? apiProfileBucket
                .getFilePreview(profileItem.display.imagePath.at(0))
                .toString()
            : undefined
        }
        onDrop={dropImage}
      ></ProfileImage>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{
        height: "100%",
        alignItems: "center",
      }}
    >
      <ScrollView style={styles.containerProfile}>
        <GestureRecognizer
          style={{ flex: 1 }}
          onSwipeRight={() => {
            navigation.goBack();
          }}
        >
          <ProfileImageCaller />
        </GestureRecognizer>
        <View style={styles.top}>
          <TouchableOpacity>
            <Icon
              name="chevron-back"
              size={20}
              color={WHITE}
              style={styles.topIconLeft}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon
              name="ellipsis-vertical"
              size={20}
              color={WHITE}
              style={styles.topIconRight}
            />
          </TouchableOpacity>
        </View>
        <ProfileItem />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
