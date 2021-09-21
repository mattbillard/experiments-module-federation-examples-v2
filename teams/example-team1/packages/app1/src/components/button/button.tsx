import * as React from 'react';
import { useEffect } from 'react';
import styles from './button.module.scss';

export interface IButtonApp1 {
  text?: string;
}

export const ButtonApp1 = (props: IButtonApp1) => {
  useEffect(() => {
    console.log('....Hooks are working, proving React is shared between packages: ButtonApp1');
  }, []);

  return <button className={styles.buttonApp1}>Button - {props.text || 'App1'}</button>;
};

export default ButtonApp1;
