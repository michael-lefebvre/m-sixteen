import React      from 'react'
import classNames from 'classnames'

import './styles.css'

const PageRow = ({ children, center = false, right = false, left = false, portrait = false, portraitSmall = false, className = '' }) =>
{
  const cx = {
      'page__row--center':         center
    , 'page__row--right':          right
    , 'page__row--left':           left
    , 'page__row--portrait':       portrait
    , 'page__row--portrait-small': portraitSmall
  }

  return (
    <div className={classNames('page__row', className, cx)}>
      {children}
    </div>
  )
}

export default PageRow
