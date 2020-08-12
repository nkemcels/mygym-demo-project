import React from 'react';
import CSS from 'csstype';

type Props = {
  videoRef:
    | string
    | ((instance: HTMLVideoElement | null) => void)
    | React.RefObject<HTMLVideoElement>
    | null
    | undefined;
  width?: CSS.Property.Width;
  height?: CSS.Property.Height;
};

const CameraDisplay = ({ videoRef, width, height }: Props) => {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} width={width} height={height} autoPlay />
    </>
  );
};

export default CameraDisplay;
