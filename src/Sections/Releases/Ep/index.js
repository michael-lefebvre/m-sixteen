import React from 'react';
import withRelease from 'Hoc/Release';
import Cover from './Cover';
import Story from './Story';
import './index.scss'

const ReleaseEp = ({ state, onNext, onMounted }) => (
  <Cover
    stage={state.toStrings()[0]}
    onRest={onNext}
  >
    <Story
      story={state.matches('mounted.story')}
    />
  </Cover>
);

export default withRelease(ReleaseEp, { release: 'ep', assets: ['a'] });
