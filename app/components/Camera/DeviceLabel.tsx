import React from 'react';

type Props = {
  name: string | undefined;
  deviceId: string;
  onClick: (deviceId: string) => void;
};

const Preview = ({ name, deviceId, onClick }: Props) => {
  // eslint-disable-next-line
  return <div onClick={() => onClick(deviceId)}>{name}</div>;
};

export default Preview;
