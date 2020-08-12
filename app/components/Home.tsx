import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import styles from './Home.css';
import Block from './Utils/Block';
import Header from './Header/Header';
import Camera from './Camera';
import FlexBlock from './Utils/FlexBlock';
import {
  getCameraDevices,
  CameraDevice,
  startWebcamVideo,
} from './Camera/utils';

export default function Home(): JSX.Element {
  const [devices, setDevices] = useState<(CameraDevice | null)[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<CameraDevice | null>(
    null
  );
  const videoNodeRef = useRef(null);

  const startWebcam = () => {
    startWebcamVideo(
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(videoNodeRef.current) as HTMLVideoElement,
      selectedDevice
        ? {
            video: {
              deviceId: { exact: selectedDevice.deviceId },
            },
            audio: false,
          }
        : undefined
    );
  };

  const onSetSelectedDevice = (device: CameraDevice | null) => {
    setSelectedDevice(device);
  };

  useEffect(() => {
    getCameraDevices((cameras) => {
      setDevices(cameras);
    });
  }, []);

  useEffect(() => {
    startWebcam();
  }, [selectedDevice]);

  return (
    <Block matchParent>
      <Header />
      <FlexBlock matchParent>
        <FlexBlock flexOne alignCenter justifyCenter>
          <Camera.Display videoRef={videoNodeRef} width="600" height="500" />
        </FlexBlock>
        <FlexBlock width={300}>
          {devices.map((device, ind) => (
            <Camera.CameraLabel
              key={device?.deviceId}
              deviceId={device.deviceId}
              name={device?.deviceName}
              onClick={() => onSetSelectedDevice(device)}
            />
          ))}
        </FlexBlock>
      </FlexBlock>
      <Button onClick={startWebcam}> START WEBCAM </Button>
    </Block>
  );
}
