import * as React from 'react';
import { useEffect } from 'react';
import './button.css';

export const ButtonSite = () => {
  useEffect(() => {
    console.log('....Hooks are working, proving React is shared between packages: ButtonSite');
  }, []);

  return <button className="button-site">Button - Site</button>;
};
