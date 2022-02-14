import React, { FC } from 'react';
import styles from './Loading.module.scss';
import ReactLoading from 'react-loading';


const Loading: FC = () => (
  <div className={styles.Loading}>
    <ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
  </div>
);

export default Loading;
