import React              from 'react'

import Image              from 'Views/Image'
import Page, { PageLine } from 'Views/Page'

import './styles.css'

const Index = () =>
  <Page id="1">
    <div className="page">
      <PageLine>
        <Image path="album/img-1" className="page__image--album1" />
        <div className="page__box page__box--album1">
          <h3>
            <span>self-entitled</span>
            <span>2008</span>
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.<br /> Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.
          </p>
        </div>
      </PageLine>
      <PageLine flyer>
        <Image path="album/fly-1" flyer className="page__image--album2" />
        <Image path="album/fly-2" flyer className="page__image--album3" />
        <Image path="album/fly-3" flyer className="page__image--album4" />
      </PageLine>
      <PageLine>
        <div className="page__box page__box--album2">
          <h3>
            <span>Rouge</span>
            <span>music video</span>
          </h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere ex non nisl rutrum dapibus. Nullam eleifend maximus libero at maximus.</p>
        </div>
        <Image path="album/video-1" video="Fj8WOeQamvw" className="page__image--album6" />
      </PageLine>
    </div>
  </Page>

export default Index
