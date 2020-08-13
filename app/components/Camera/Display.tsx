import React, { useEffect, useState, useRef } from 'react';
import CSS from 'csstype';
import Block from '../Utils/Block';
import { CameraDevice } from './utils';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import axios from 'axios';

const AZURE_FACE_URL = 'https://australiaeast.api.cognitive.microsoft.com';
const AZURE_FACE_KEY = '9f84aa8a60224fd98b1f34c1951d7ed1';

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
  isCameraMode?: boolean;
  onImageProcessComplete?: () => void
};

const captureImage = (videoNode, videoDimens) => {
  let canvasNode = document.createElement('canvas');
  canvasNode.style.position = 'absolute';
  canvasNode.style.top = '-99999px';
  document.body.appendChild(canvasNode);
  canvasNode.width = videoDimens.width;
  canvasNode.height = videoDimens.height;

  let canvasCtx = canvasNode.getContext('2d');
  canvasCtx?.drawImage(videoNode, 0, 0);

  return { data: canvasNode.toDataURL('image/jpeg'), canvasNode };
};

const detectFacesFromAPI = (dataURL, callbacks) => {
  let data = dataURL.split(',')[1];
  let mimeType = dataURL.split(';')[0].slice(5);

  let bytes = window.atob(data);
  let buf = new ArrayBuffer(bytes.length);
  let byteArr = new Uint8Array(buf);

  for (let i = 0; i < bytes.length; i++) {
    byteArr[i] = bytes.charCodeAt(i);
  }
  axios
    .post(`${AZURE_FACE_URL}/face/v1.0/detect`, byteArr, {
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_FACE_KEY,
        'Content-Type': 'application/octet-stream',
      },
    })
    .then((resp) => {
      callbacks.forEach((callback: (arg0: any) => void) => {
        callback(resp.data || []);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const drawFacesOnImage = (
  imageCanvas: HTMLCanvasElement,
  imageNode: HTMLImageElement
) => {
  return (facesData) => {
    let canvasCtx = imageCanvas.getContext('2d');
    facesData.forEach((face) => {
      let faceRect = face['faceRectangle'];
      canvasCtx?.beginPath();
      canvasCtx!.strokeStyle = '#01f382';
      canvasCtx!.lineWidth = 4;
      canvasCtx?.rect(
        faceRect.left,
        faceRect.top,
        faceRect.width,
        faceRect.height
      );
      canvasCtx?.stroke();
      canvasCtx?.closePath();
      canvasCtx!.fillStyle = '#01f382';
      canvasCtx!.font = '20px Verdana';
      canvasCtx?.fillText('Face Detected', faceRect.left, faceRect.top - 10);
    });
    let dataURL = imageCanvas.toDataURL('image/jpeg');
    imageNode.src = dataURL;
    imageCanvas.remove();
  };
};

const CameraDisplay = ({
  videoRef,
  width,
  height,
  currentDevice,
  isCameraMode,
  onImageProcessComplete,
}: Props) => {
  const containerRef = useRef<any>();
  const capturedImgRef = useRef<any>();
  const [videoDimens, setVideoDimens] = useState({ width: 0, height: 0 });
  const [faceDisplay, setFaceDisplay] = useState(!isCameraMode);
  const [isProcessingFace, setProcessingFace] = useState(false);

  useEffect(() => {
    let videoNode = ReactDOM.findDOMNode(videoRef?.current);
    let rect = videoNode?.getBoundingClientRect();
    setVideoDimens({ width: rect.width, height: rect.height });
  }, [currentDevice]);

  useEffect(() => {
    let node = ReactDOM.findDOMNode(containerRef.current) as HTMLElement;
    if (!isCameraMode && node) {
      node.className = node.className + ' animate-snap';
      setProcessingFace(true);
      setTimeout(() => {
        node.classList.remove('animate-snap');
        setFaceDisplay(true);

        let videoNode = ReactDOM.findDOMNode(
          videoRef?.current
        ) as HTMLVideoElement;
        let imageNode = ReactDOM.findDOMNode(
          capturedImgRef.current
        ) as HTMLImageElement;

        let capture = captureImage(videoNode, videoDimens);
        let dataURL = capture.data;
        let canvasNode = capture.canvasNode;

        imageNode.src = dataURL;

        // let apiCall = remote.require('./components/Camera/api.ts').default;
        detectFacesFromAPI(dataURL, [
          drawFacesOnImage(canvasNode, imageNode),
          () => setProcessingFace(false),
          onImageProcessComplete
        ]);
      }, 700);
    } else if (isCameraMode) {
      setFaceDisplay(false);
    }
  }, [isCameraMode]);

  return (
    <Block>
      {currentDevice && (
        <div className="display-label">
          {currentDevice?.deviceName.substring(
            0,
            currentDevice?.deviceName.lastIndexOf('(')
          )}
          <span className="display-dimens">
            {videoDimens.width + ' x ' + videoDimens.height}
          </span>
        </div>
      )}
      <div className="display-container" ref={containerRef}>
        <div></div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          width={width}
          height={height}
          autoPlay
          style={{ display: faceDisplay ? 'none' : undefined }}
        />
        <div
          className="captured-image-container"
          style={{ display: faceDisplay ? undefined : 'none' }}
        >
          <img ref={capturedImgRef} />
          <div className={`loading ${isProcessingFace ? 'active' : ''}`}>
            Processing...
          </div>
        </div>
      </div>
    </Block>
  );
};

export default CameraDisplay;
