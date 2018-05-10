import React              from 'react'

import Image              from 'Views/Image'
import Page, { PageLine } from 'Views/Page'

import './styles.css'

const Index = () =>
  <Page id="2">
    <div className="page">
      <PageLine>
        <Image path="split/band-1" />
      </PageLine>
      <PageLine portrait>
        <Image path="album/img-2" portrait />
      </PageLine>
      <PageLine>
        <Image path="album/video-1" video />
      </PageLine>
    </div>
  </Page>

export default Index
