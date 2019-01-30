
import React from 'react'
import { withApp } from 'Contexts/App'
import { PhotoPath, roundToEven } from 'Utils'
import './index.scss'

const SlideRecord = ({left, height}) => (
  <div className="album__record album--onmounted" style={{ left }}>
    <div className="album__record__stripes">
      <div />
      <div />
      <div />
      <div />
    </div>
    <div className="album__record__texts">
      <div className="album__record__row">
        <img src={PhotoPath('album/loko-md')} width={roundToEven(height * .3)} alt="" className="album__photo album__photo--left" />
        <div className="album__text">
          <p className="album__paragraph">
            <strong>Sebastien Langle</strong> and <strong>Guillaume André</strong> from <strong>Loko Studio</strong>. These guys must have adamantium made nerves to handle us!
          </p>
          <p className="album__paragraph">Ruismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium. </p>
        </div>
      </div>
      <div className="album__record__row album__record__row--jp">
        <img src={PhotoPath('album/jp-md')} width={roundToEven(height * .3)} alt="" className="album__photo album__photo--right" />
        <div className="album__text">
          <p className="album__paragraph album__paragraph--right">
            Kinda amazed when our friend Anaïs found our album in a Tokyo record shop.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const mapAppContextToProps = (state, { offset }) => ({
  left: roundToEven(state.getViewPort().offsetWidth * offset),
  height: state.getViewPort().offsetHeight
});

export default withApp(mapAppContextToProps)(SlideRecord);

