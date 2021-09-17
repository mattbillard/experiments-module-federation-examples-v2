import * as React from 'react';
import { useEffect } from 'react';
import styles from './button.module.scss';

export const ButtonApp2 = () => {
  useEffect(() => {
    console.log('....Hooks are working, proving React is shared between packages: ButtonApp2');
  }, []);

  return <button className={styles.buttonApp2}>Button - App2</button>;
};

export default ButtonApp2;
