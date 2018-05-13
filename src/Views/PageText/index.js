import React      from 'react'
import classNames from 'classnames'

import './styles.css'

const PageText = ({ className = '', title = null, paragraphs = [], children }) =>
  <div className={classNames('page__text', className)}>
    <div className="page__text__content">
      { title && <h3 className="page__text__title">{title}</h3> }
      { paragraphs.map( ( p, i ) => (
        <p key={`page__text__paragraph__${i}`} className="page__text__paragraph" dangerouslySetInnerHTML={{ __html: p }} />
      ) )}
    </div>
    {children}
  </div>

export default PageText
