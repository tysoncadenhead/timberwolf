let metaMaskToggled = true;

export const disableMetaMask = () => {
  metaMaskToggled = false;
};

export const enableMetaMask = () => {
  metaMaskToggled = true;
};

export const getMetaMaskToggled = () => metaMaskToggled;
