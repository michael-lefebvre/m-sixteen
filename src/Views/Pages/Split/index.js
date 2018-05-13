import React     from 'react'

import Figure    from 'Views/Image'
import Page      from 'Views/Page'
import PageRow   from 'Views/PageRow'
import Video     from 'Views/PageVideo'

import './styles.css'

// F4U3HbXfEVA

const Index = () =>
    <Page id="split">
      <PageRow>
        <Figure path="split/band-1" />
        <div className="page__text">
          <div className="page__text__content page__text__content--split1">
            <h3 className="page__text__title">
              Split w/ the Missing 23rd
            </h3>
            <p className="page__text__paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.
            </p>
            <p className="page__text__paragraph">
              Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.
            </p>
            <p className="page__text__paragraph">
              Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.
            </p>
          </div>
        </div>
      </PageRow>
      <PageRow center className="page__row--loko">
        <div className="page__text page__text--loko">
          <div className="page__text__content">
            <h3 className="page__text__title">
              <span>self-entitled</span>
              <span>2008</span>
            </h3>
            <p className="page__text__paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.<br /> Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.
            </p>
          </div>
          <Video videoId="K9yGAYd_Jjk" className="page__video--small" opts={{ width: 320, height: 214 }} />
        </div>
      </PageRow>{/* /.page__row */}
      <PageRow right portraitSmall>
        <div className="page__text">
          <div className="page__text__content page__text__content--right page__text__content--bottom- page__text__content--furia">
            <h3 className="page__text__title">
              <span>Furia</span>
              <span>2005</span>
            </h3>
            <p className="page__text__paragraph">
              Lorem ipsum
            </p>
          </div>
        </div>
        <Figure path="furia/img-1" portrait small legend="Furia Small" className="page__img--furia1" />
      </PageRow>{/* /.page__row */}
    </Page>

export default Index
