import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { CameraOutlined, VideoCameraOutlined } from '@ant-design/icons';
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
  const [isCameraMode, setCameraMode] = useState<boolean>(true);
  const [selectedDevice, setSelectedDevice] = useState<CameraDevice | null>(
    null
  );
  const videoNodeRef = useRef(null);

  const startWebcam = () => {
    startWebcamVideo(
      // eslint-disable 
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

  const refreshDevicesList = ()=> {
    getCameraDevices((cameras) => {
      setDevices(cameras);
    });
  }

  const cameraAction = () => {
    setCameraMode(!isCameraMode);
  }

  useEffect(() => {
    refreshDevicesList()
  }, []);

  useEffect(() => {
    startWebcam();
  }, [selectedDevice]);

  return (
    <Block matchParent>
      <Header onRefreshDevices={refreshDevicesList} />
      <FlexBlock matchParent>
        <FlexBlock flexOne alignCenter justifyCenter column>
          <Camera.Display videoRef={videoNodeRef} width="600" currentDevice={selectedDevice} isCameraMode={isCameraMode} />
          <Button type="primary" onClick={cameraAction} size="large"> 
            {isCameraMode ? 
              <> <CameraOutlined /> DETECT FACE </>
              :
              <> <VideoCameraOutlined /> WEBCAM </>
            }
          </Button>
        </FlexBlock>
        <FlexBlock column style={{paddingRight: "20px"}}>
          <h3 className={styles.webcamsTitle}>Detected Webcams</h3>
          <FlexBlock width={300} column flexOne style={{padding:"0 15px"}}>
            {devices.map((device, ind) => (
              <Camera.WebcamDevice
                key={device?.deviceId}
                deviceId={device.deviceId}
                name={device?.deviceName}
                isActive={selectedDevice?.deviceId == device?.deviceId}
                onClick={() => onSetSelectedDevice(device)}
              />
            ))}
          </FlexBlock>
        </FlexBlock>
      </FlexBlock>
    </Block>
  );
}
