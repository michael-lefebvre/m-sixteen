import React, { Fragment } from 'react';
import { withRelease } from 'Hoc';

import assets from './Assets';

import Cover from './Cover';
import Story from './Story';

import './index.scss';

const ReleaseEp = ({ story, state, onNext, onMounted }) => (
  <Fragment>
    <Cover state={state} onRest={onNext} />
    <Story state={state} story={story} />
  </Fragment>
);

export default withRelease(ReleaseEp, { release: 'ep', assets });
