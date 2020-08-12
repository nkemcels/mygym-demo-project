import React, { useEffect, useState } from 'react';
import CSS from 'csstype';
import Block from '../Utils/Block';
import { CameraDevice } from './utils';
import ReactDOM from 'react-dom';

type Props = {
  videoRef:
    | string
    | ((instance: HTMLVideoElement | null) => void)
    | React.RefObject<HTMLVideoElement>
    | null
    | undefined;
  width?: CSS.Property.Width;
  height?: CSS.Property.Height;
  currentDevice?: CameraDevice | null;
};

const CameraDisplay = ({ videoRef, width, height, currentDevice }: Props) => {
  const [videoDimens, setVideoDimens] = useState({width:0, height:0})
  useEffect(() => {
    let videoNode = ReactDOM.findDOMNode(videoRef?.current);
    let rect = videoNode?.getBoundingClientRect();
    setVideoDimens({width: rect.width, height: rect.height})
  }, [videoRef])
  return (
    <Block>
      {currentDevice &&
        <div className="display-label">
          {currentDevice?.deviceName.substring(0, currentDevice?.deviceName.lastIndexOf("("))}
          <span className="display-dimens">{videoDimens.width+" x "+videoDimens.height}</span>
        </div>
      }
      <Block className="display-container" inline>
        <div></div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={videoRef} width={width} height={height} autoPlay />
      </Block>
    </Block>
  );
};

export default CameraDisplay;
