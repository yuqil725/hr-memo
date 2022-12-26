export const objectFilterKey = (o: any, map: any) => {
  return Object.keys(o).reduce((acc, key) => {
    if (Object.keys(map).includes(key)) {
      return {
        ...acc,
        ...{ [key]: o[key] },
      };
    } else {
      return { ...acc };
    }
  }, {});
};

export const objectMapKey = (o: any, map: any) => {
  return Object.keys(o).reduce((acc, key) => {
    return {
      ...acc,
      ...{ [map[key] || key]: o[key] },
    };
  }, {});
};
