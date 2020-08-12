import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../../constants/routes.json';
import {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync,
  selectCount,
} from './counterSlice';

export default function Counter() {
  useEffect(() => {
    navigator.getUserMedia(
      { video: true, audio: false },
      (localMediaStream) => {
        const video = document.querySelector('video');
        video!.srcObject = localMediaStream;
        video!.autoplay = true;
      },
      (e) => {}
    );
  }, []);

  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video id="video" height="480" width="800" autoPlay />
    </div>
  );
}
