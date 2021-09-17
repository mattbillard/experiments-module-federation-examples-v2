import * as React from 'react';
import { ButtonSharedTools } from '@company/core-team__shared-tools';
import { ButtonApp1 } from '../button/button';

export const App1 = () => {
  // prettier-ignore
  return (
    <div>
      <h2>App 1</h2>
      <ButtonApp1 /> - regular import<br />
      <ButtonSharedTools /> - imported from shared-tools/dist<br />
    </div>
  );
};

export default App1;
