import React from 'react';
import Lottie from 'react-lottie';
import system from 'system-components';

import * as animationData from './loading_animation.json';

const LoaderWrapper = system({
  display: 'flex',
  flex: '1 0 auto',
  justifyContent: 'center',
  alignItems: 'center',
});

const animationOptions = {
  animationData,

  loop: true,
  autoplay: true,
  renderSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function Loader(props) {
  const { size = 300 } = props;

  return (
    <LoaderWrapper>
      <div>
        <Lottie
          options={animationOptions}
          height={size}
          width={size}
          isPaused={false}
          isStopped={false}
          isClickToPauseDisabled
        />
      </div>
    </LoaderWrapper>
  );
}
