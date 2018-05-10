import React              from 'react'

import Image              from 'Views/Image'
import Page, { PageLine } from 'Views/Page'

import './styles.css'

const Index = () =>
  <Page id="3">
    <div className="page">
      <PageLine>
        <Image path="ep/band-1" />
      </PageLine>
    </div>
  </Page>

export default Index
