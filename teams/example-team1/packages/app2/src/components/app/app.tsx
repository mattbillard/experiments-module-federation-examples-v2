import * as React from 'react';
import { ButtonSharedTools } from '@company/core-team_shared-tools';
import { ButtonApp2 } from '../button/button';

export const App2 = () => {
  // prettier-ignore
  return (
    <div>
      <h2>App 2</h2>
      <ButtonApp2 /> - regular import<br />
      <ButtonSharedTools /> - imported from shared-tools/dist<br />
    </div>
  );
};

export default App2;
