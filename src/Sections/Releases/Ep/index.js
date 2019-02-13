import React from 'react';
import { withRelease } from 'Hoc'

import Cover from './Cover';
import Story from './Story';
import './index.scss'

const ReleaseEp = ({ story, state, onNext, onMounted }) => (
  <Cover
    state={state}
    onRest={onNext}
  >
    <Story
      story={story}
      // story={state.matches('ready.releases.mounted.story')}
    />
  </Cover>
);

export default withRelease(ReleaseEp, { release: 'ep', assets: ['a'] });
