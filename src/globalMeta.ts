let globalMeta = {};

export const addMeta = (value: object) => {
  globalMeta = {
    ...globalMeta,
    ...value,
  };
};

export const clearMeta = () => {
  globalMeta = {};
};

export const getMeta = () => globalMeta;
