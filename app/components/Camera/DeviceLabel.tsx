import React from 'react';
import {CameraOutlined, VideoCameraOutlined} from "@ant-design/icons"

type Props = {
  name: string | undefined;
  deviceId: string;
  isActive?: boolean,
  onClick: (deviceId: string) => void;
};

const WebcamDevice = ({ name, deviceId, isActive, onClick }: Props) => {
  // eslint-disable-next-line
  return (
    <div className={`webcam-device ${isActive?"active":""}`} onClick={() => onClick(deviceId)}>
      <VideoCameraOutlined /> 
      <span className="name">{name?.substring(0, name.lastIndexOf("("))}</span>
    </div>
  );
};

export default WebcamDevice;
