export type CameraDevice = {
  deviceId: string;
  deviceName: string;
};

function getDevices(mediaDevices: MediaDeviceInfo[]) {
  let count = 0;
  return mediaDevices
    .map((mediaDevice) => {
      if (mediaDevice.kind === 'videoinput') {
        return {
          deviceId: mediaDevice.deviceId,
          // eslint-disable-next-line no-plusplus
          deviceName: mediaDevice.label || `Camera ${count++}`,
        } as CameraDevice;
      }
      return null;
    })
    .filter((t) => t) as CameraDevice[];
}

let currentStream: MediaStream | null = null;
function stopMediaTracks(stream: MediaStream) {
  if (!stream) return;
  stream.getTracks().forEach(track => {
    track.stop();
    console.log("STOPPING STREAM...")
  });
}

export const getCameraDevices = (
  callback: (devices: (CameraDevice )[]) => void
) => {
  navigator.mediaDevices
    .enumerateDevices()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      return getDevices(mediaDevices);
    })
    // eslint-disable-next-line promise/no-callback-in-promise
    .then(callback)
    .catch((err) => {
      console.log('COULD NOT GET DEVICES ', err);
      return err;
    });
};

export const startWebcamVideo = (videoNode: HTMLVideoElement, constraints = {video: true, audio: false}) => {
  stopMediaTracks(currentStream as MediaStream);
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      videoNode.srcObject = stream;
    })
    .catch(error => {
      console.error(error);
    });
}

export const utils = () => {};
