import React, { Suspense } from 'react';
import  LoadingScreen  from './LoadingScreen';

function LazyLoad({ children }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}

export default LazyLoad;