let AppInstance = null;

export const registerApp = vue => {
  AppInstance = vue;
};

export const publishEvent = (event, data) => {
  AppInstance.$emit(event, data);
};

export const subscribeEvent = (event, callBack) => {
  AppInstance.$on(event, callBack);
};
