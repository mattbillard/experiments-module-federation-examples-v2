import * as _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Switch, RouteProps, Redirect } from 'react-router-dom';

import { ButtonSharedTools, DynamicModFedLoader } from '@company/core-team__shared-tools';
import '@company/core-team__shared-tools/dist/main.css'; // Need to import CSS

import { ButtonSite } from '../button/button';
import logo1 from '../../../public/logo.svg';
import teamDefinitions from '../../../public/team-definition-urls.json';

import './app.scss';

// TODO: the module federation community is still figuring out the best way to do types. For now, these are hand-coded in /core-team/site/types/
const ButtonApp1 = React.lazy(() => import('exampleTeam1__app1/button'));
const ButtonApp2 = React.lazy(() => import('exampleTeam1__app2/button'));

export const AppSite = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [definitions, setDefinitions] = useState<any>({ nav: {} });

  useEffect(() => {
    getTeamDefinitions(definitions, setDefinitions, setIsLoading);
  }, []);

  if (isLoading) {
    return null;
  }

  // prettier-ignore
  return (
    <BrowserRouter>
      <h1>Module Federation - Full Example</h1>

      <div className="box">
        <h2>Site</h2>
        
        <h3>Loading Components Various Ways</h3>
        <ButtonSite /> - regular import<br />
        <ButtonSharedTools /> - imported from shared-tools/dist<br /> 
        <React.Suspense fallback="Loading...">
          <ButtonApp1 /> - imported from app1 via module federation hardcoded in webpack config<br />
          <ButtonApp2 /> - imported from app2 via module federation hardcoded in webpack config<br />
        </React.Suspense>
        <br />
        <br /> 

        <h3>Proving Webpack Can Handle Various File Types</h3>
        <img src={logo1} className="logo-svg" /> - Example SVG <br />
        <img src="/assets/core-team__site/logo.png" className="logo-png" /> - Example PNG
        <br />
        <br />
       
        <div className="navigation">
          {definitions.nav.map((definition: any) => {
            const { text, url } = definition;

            return (
              <React.Fragment key={url}>
                <Link to={url}>{text}</Link>
              </React.Fragment>
            );
          })}
        </div>

        Imported dynamically via module federation...
        <div className="box">
          <Switch>
            {definitions.nav.map((definition: any) => {
              const { modFedComponentId, url } = definition;
              const { module, remoteEntryUrl, scope } = definitions.dynamicModFedComponents[modFedComponentId];

              return (
                <Route
                  key={url}
                  path={url}
                  render={(routeProps: RouteProps) => (
                    <DynamicModFedLoader
                      module={module}
                      remoteEntryUrl={remoteEntryUrl}
                      scope={scope}
                    />
                  )}
                />
              );
            })}
            <Redirect to="/site-url/example-team1-url/app1-url" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

const getTeamDefinitions = async (definitions: any, setDefinitions: any, setIsLoading: any) => {
  await Promise.all(
    teamDefinitions.map(async (teamDefinitionUrl: string) => {
      const res = await fetch(teamDefinitionUrl);
      const teamDefinition = await res.json();

      const newDefinitions = {
        nav: [...definitions.nav, ...teamDefinition.nav],
        dynamicModFedComponents: {
          ...definitions.dynamicModFedComponents,
          ...teamDefinition.dynamicModFedComponents,
        },
      };
      setDefinitions(newDefinitions);
    }),
  );

  setIsLoading(false);
};

declare const __webpack_init_sharing__: any;
declare const __webpack_share_scopes__: any;
declare const window: any;

/**
 * NOTE: necessary if you want to import DynamicModFedLoader from dist
 *
 * The sample code Module Federation provides for dynamic imports does not work if you consume it from dist, throwing the error "Invalid hook call...You might be breaking the Rules of Hooks".
 * However, in a real life project, this probably should be shared code that's distributed as part of a package to multiple teams.
 * After trying many permutations of marking React as external and aliasing it in or providing it via ModuleFederationPlugin, this was the only solution that worked.
 * Perhaps they will solve this in the future.
 *
 * See dynamic-module-federation-loader.tsx for the corresponding change
 */
const setUpDynamicModFedLoader = () => {
  window.__webpack_init_sharing__ = __webpack_init_sharing__;
  window.__webpack_share_scopes__ = __webpack_share_scopes__;
};
setUpDynamicModFedLoader();
