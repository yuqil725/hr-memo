export const AChangeMetaProfile = (p: any) => {
  return {
    type: "CHANGE_META_PROFILE",
    payload: p,
  };
};

export const AChangeDisplayProfile = (p: any) => {
  return {
    type: "CHANGE_DISPLAY_PROFILE",
    payload: p,
  };
};

export const AChangeProfileScreenActivity = (p: any) => {
  return {
    type: "CHANGE_PROFILE_SCREEN_ACTIVITY",
    payload: p,
  };
};
