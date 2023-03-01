// Used to check the type's attributes
export const ISSearchCard = {
  Name: "name",
  $id: "documentId",
  ImagePath: "imagePath",
  Tag: "tag",
};

export interface ISearchCard {
  name: string;
  documentId: string;
  imagePath?: any;
  oneline?: boolean;
  tag?: string[];
}

export interface ISearchCardScreen {
  selectedCard: ISearchCard;
  searchCard: ISearchCard[];
  longPress: boolean;
  searchText: string;
  tagSelected: string[];
  // it is string because we only need its value to be changed
  renderScreen?: number;
  tagSelection?: string[];
}
