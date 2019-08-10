import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { useDevicePhotos } from './useDevicePhotos';

export const withDevicePhotos = (Wrapped: any) => {
  const Enhanced = (props: any) => {
    const { photos } = useDevicePhotos();
    return <Wrapped photos={photos} {...props} />;
  };
  hoistNonReactStatic(Enhanced, Wrapped);
  return Enhanced;
};
