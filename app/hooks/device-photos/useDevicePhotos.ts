import { useState, useEffect } from 'react';
import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';

export const useDevicePhotos = () => {
  const [photos, setPhotos] = useState([] as PhotoIdentifier[]);

  useEffect(() => {
    console.log('Running photos effect');
    CameraRoll.getPhotos({
      first: 10,
      groupTypes: 'All',
      assetType: 'Photos',
    })
      .then(resp => {
        setPhotos(resp.edges);
      })
      .catch(err => console.log(err));
  }, []);

  return {
    photos,
  };
};
