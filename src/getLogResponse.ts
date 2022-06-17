export const getLogResponse = (msg: string, _meta?: object) => {
  return {
    throw: (errorMessage?: string) => {
      throw new Error(errorMessage || msg);
    },
  };
};
