// Used to check the type's attributes
export const ISSearchCard = {
  Name: "name",
};

export interface ISearchCard {
  name: string;
}

export interface ISearchCardScreen {
  selectedName: string;
  searchCard: ISearchCard[];
}
