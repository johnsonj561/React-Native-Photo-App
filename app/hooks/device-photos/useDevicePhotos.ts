import { useState, useEffect } from 'react';
import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';

const defaultPhotos: PhotoIdentifier[] = [];

export const useDevicePhotos = () => {
  const [photos, setPhotos] = useState(defaultPhotos);

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
