import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';

declare const window: any;

export interface IRemoteComponentReceiver {
  urlCss: string[];
  urlJs: string[];
}

export const RemoteComponentReceiver = (props: IRemoteComponentReceiver) => {
  const { urlCss, urlJs } = props;
  const mountRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<any>();

  useEffect(() => {
    const div = mountRef.current;

    // After all scripts are loaded, render component
    const resolves: any[] = [];
    const promises = urlJs.map((_item, idx) => new Promise(resolve => resolves[idx] = resolve));
    Promise.all(promises).then(onAllScriptsLoaded);

    // Inject all scripts
    urlJs.forEach((jsUrl: string, idx: number) => {
      // Need to manually recreate the script or Chrome will not actually fetch and execute its code
      const script = document.createElement('script');
      script.src = jsUrl;
      script.onload = resolves[idx];
      div!.after(script);
    })
  }, []);

  // If props change, rerender
  useEffect(() => {
    if (componentRef.current) {
      renderChild();
    }
  }, [props]);

  const onAllScriptsLoaded = () => {
    componentRef.current = window.remoteComponent;
    delete window.remoteComponent;
    renderChild();
  }

  const renderChild = () => {
    const Component = componentRef.current;
    ReactDOM.render(<Component {...props} />, mountRef.current);
  };

  return (
    <>
      <span ref={mountRef} className="remote-root"></span>
      {urlCss.map((cssUrl) => (
        <link rel="stylesheet" key={cssUrl} href={cssUrl} />
      ))}
    </>
  );
};
