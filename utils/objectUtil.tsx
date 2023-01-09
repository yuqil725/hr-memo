export const objectFilterKey = (o: any, map: any) => {
  return Object.keys(map).reduce((acc, key) => {
    if (Object.keys(o).includes(key)) {
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

export const objectAddEmptyStrToArray = (
  o: any,
  exception: string[] = ["imagePath", "education", "livingAddress"]
) => {
  return Object.keys(o).reduce((acc, key) => {
    if (
      Array.isArray(o[key]) &&
      (o[key].length == 0 || o[key].at(0) != "") &&
      !exception.includes(key)
    ) {
      const newValue = ["", ...o[key]];
      return {
        ...acc,
        ...{ [key]: newValue },
      };
    }
    return {
      ...acc,
      ...{ [key]: o[key] },
    };
  }, {});
};

export const objectRemoveEmptyStr = (o: string[]) => {
  return o.filter((v: string) => {
    return v.length > 0;
  });
};
