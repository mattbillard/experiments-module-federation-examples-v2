declare const window: any;

export const exportRemoteComponent = (component: any) => {
  window.remoteComponent = component;
};
