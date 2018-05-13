import React     from 'react'

import Figure    from 'Views/Image'
import Page      from 'Views/Page'
import PageRow   from 'Views/PageRow'
import Text      from 'Views/PageText'
import Video     from 'Views/PageVideo'

import './styles.css'

const Index = () =>
    <Page id="album">
      <PageRow>
        <Figure path="album/img-1" />
        <Text
         className="page__text--album1"
         title="self-entitled, 2007"
         paragraphs={[
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.',
          'Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.'
         ]} />
      </PageRow>
      <PageRow>
        <Figure path="album/loko" small className="page__img--album-loko" />
        <Text
         className="page__text--album-loko"
         paragraphs={[
          '<strong>Sebastien Langle</strong> and <strong>Guillaume André</strong> from <strong>Loko Studio</strong>. These guys must have adamantium made nerves to handle us!'
         ]} />
        <Text
         className="page__text--album-labels"
         paragraphs={[ 'This record was released in France by <strong>STSnework</strong>, in Germany and UK by <strong>Fond Of Life</strong> and in Italia by <strong>Chorus Of One</strong>.' ]}>
          <div className="album__labels">
            <img src={ process.env.PUBLIC_URL + '/static/images/logo-sts.png'} alt="STSnework logo" className="img__label" />
            <img src={ process.env.PUBLIC_URL + '/static/images/logo-coo.png'} alt="Chorus Of One logo" className="img__label" />
            <img src={ process.env.PUBLIC_URL + '/static/images/logo-fol.png'} alt="Fond Of Life logo" className="img__label" />
          </div>
        </Text>
      </PageRow>
      <PageRow right>
        <Text
         className="page__text--ablum-jp"
         paragraphs={[
          'Kinda amazed when our friend Anaïs found our album in a Tokyo record shop.'
         ]} />
        <Figure path="album/jp" small className="page__img--album-jp" />
      </PageRow>
      <PageRow className="page__row--album-tours">
        <Figure path="album/tours-1" transparent />
        {/*<Figure path="album/img-2" small className="page__img--album-tours" />*/}
      </PageRow>
      <PageRow>
        <Text
         className="page__text--album-tour1"
         title="European tour w/ Nine Eleven, part 1"
         paragraphs={[
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.<br /> Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.'
         ]} />
        <Figure path="album/live-1" />
      </PageRow>{/* /.page__row */}
      <PageRow>
        <Video videoId="We_Mjjsi2Kk" className="page__video--album-tour-1" />
        <Figure path="album/tour-2" small className="page__img--album-tour-2" />
        <Text
         className="page__text--album-tour2"
         paragraphs={[
          '21/02/08 – Le rocher – Paris<br />22/02/08 – The point club – Besigheim (Germany)<br />23/02/08 – Diwadlo – Prievidza (Slovakia)<br />24/02/08 – Irish Pub - Banska Bystrika (Slovakia)<br />25/02/08 – Garaboncia – Szgeden (Hungary)<br />26/02/08 – The Rocktogon – Budapest (Hungary)<br />27/02/08 – K-Set Club – Zagreb (Croatia)<br />28/02/08 – Booka – Rijeka (Croatia)<br />29/02/08 – Orto Bar – Ljubljana (Slovenia)<br />30/02/08 – L\'écurie de l\'ilot 13 – Genève (Switzerland)'
         ]} />
      </PageRow>{/* /.page__row */}
    </Page>

export default Index
