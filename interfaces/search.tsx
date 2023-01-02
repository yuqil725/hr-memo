// Used to check the type's attributes
export const ISSearchCard = {
  Name: "name",
  FriendshipStage: "friendshipStage",
  LivingAddress: "livingAddress",
  Education: "education",
  Activity: "activity",
  Comment: "comment",
  Todo: "todo",
  Image: "image",
};

export interface ISearchCard {
  name: string;
  livingAddress?: string[];
  friendshipStage?: string[];
  education?: string[];
  activity?: string[];
  comment?: string[];
  todo?: string[];
  image?: any;
}
