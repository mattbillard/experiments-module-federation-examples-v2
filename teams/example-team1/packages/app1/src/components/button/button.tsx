import * as React from 'react';
import { useEffect } from 'react';
import styles from './button.module.scss';

export const ButtonApp1 = () => {
  useEffect(() => {
    console.log('....Hooks are working, proving React is shared between packages: ButtonApp1');
  }, []);

  return <button className={styles.buttonApp1}>Button - App1</button>;
};

export default ButtonApp1;
