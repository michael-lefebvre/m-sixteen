import React     from 'react'

import Figure    from 'Views/Image'
import Page      from 'Views/Page'
import PageRow   from 'Views/PageRow'

import './styles.css'

const Index = () =>
    <Page id="ep">
      <PageRow>
        <Figure path="ep/band-1" />
        <div className="page__text">
          <div className="page__text__content page__text__content--ep1">
            <h3 className="page__text__title">
              EP, 2003
            </h3>
            <p className="page__text__paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.
            </p>
          </div>
        </div>
      </PageRow>
    </Page>

export default Index
