import React from 'react';
import styles from './DefaultLoader.module.scss';

function DefaultLoader() {
  return (
    <div className={styles.df_loading_grid} style={{ borderTopColor: "rgb(106, 185, 216)"}} id = "defaultLoader" >
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div >
  );
}

export default DefaultLoader;