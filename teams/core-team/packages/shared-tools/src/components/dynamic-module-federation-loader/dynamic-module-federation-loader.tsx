import * as React from 'react';

/**
 * CODE MODIFIED FROM: https://github.com/module-federation/module-federation-examples/blob/master/dynamic-system-host/app1/src/App.js
 */

declare const window: any;

const loadComponent = (scope: string, module: string) => {
  return async () => {
    /**
     * NOTE: necessary if you want to import DynamicModFedLoader from dist
     *
     * The sample code Module Federation provides for dynamic imports does not work if you consume it from dist, throwing the error "Invalid hook call...You might be breaking the Rules of Hooks".
     * However, in a real life project, this probably should be shared code that's distributed as part of a package to multiple teams.
     * After trying many permutations of marking React as external and aliasing it in or providing it via ModuleFederationPlugin, this was the only solution that worked.
     * Perhaps they will solve this in the future.
     *
     * See site-team/~/app.tsx for the corresponding change
     */
    const { __webpack_init_sharing__, __webpack_share_scopes__ } = window;

    await __webpack_init_sharing__('default'); // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    const container = window[scope]; // or get the container somewhere else
    await container.init(__webpack_share_scopes__.default); // Initialize the container, it may provide shared modules
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
};

const useDynamicScript = (url: string) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

export interface IDynamicModFedLoader {
  module: string;
  remoteEntryUrl: string;
  scope: string;
}

export const DynamicModFedLoader = (props: IDynamicModFedLoader) => {
  const { module, scope, remoteEntryUrl } = props;
  const { ready, failed } = useDynamicScript(remoteEntryUrl);

  if (!props) return <span>Error: no system specified</span>;
  if (!ready) return <span>Loading...</span>;
  if (failed) return <span>Error: failed to load dynamic script: {remoteEntryUrl}</span>;

  const Component = React.lazy(loadComponent(scope, module));

  return (
    <React.Suspense fallback="Loading...">
      <Component />
    </React.Suspense>
  );
};
