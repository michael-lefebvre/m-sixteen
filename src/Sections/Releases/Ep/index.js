import React, { Fragment} from 'react';
import withRelease from '../Release';
import Cover from './Cover';
import './index.scss'

const ReleaseEp = ({ stage, onRest }) => {
  const handleOnRest = (el) => () => {
    if(stage === 'entering' && el === 'inner')
      return onRest()
    if(stage === 'leaving' && el === 'bkgd')
      return onRest()
  };
  return (
    <Fragment>
      <Cover stage={stage} onRest={handleOnRest} />
      <div className={`release__story release__story--ep release__story--ep--${stage}`} />
      <h1 style={{ top: 100, left: 100, position: 'absolute', zIndex: 1000 }}>{stage}</h1>
    </Fragment>
  )
}

export default withRelease(ReleaseEp, { id: 'ep' });
