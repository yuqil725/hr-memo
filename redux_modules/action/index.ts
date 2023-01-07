// Profile
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

// Search
export const AChangeSearchCardScreen = (p: any) => {
  return {
    type: "CHANGE_SEARCH_CARD_SCREEN",
    payload: p,
  };
};

export const AChangeSingleSearchCard = (p: any) => {
  return {
    type: "CHANGE_SINGLE_SEARCH_CARD",
    payload: p,
  };
};
