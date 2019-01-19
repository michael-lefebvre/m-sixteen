
import React, { PureComponent } from 'react'
import { Link } from "react-router-dom";
import { Spring, animated } from 'react-spring'
import { Parallax, ParallaxLayer } from './Parallax.js'
import { ImagePath, PhotoPath } from 'Utils'
import { withApp } from 'Contexts/App'
// import Video from 'Views/PageVideo'
import Tracks from './Tracks'

import './index.scss'

class ReleaseAlbumStory extends PureComponent {
  state = {
    displayStory: this.props.displayStory,
    displayBkgd: this.props.displayBkgd,
    viewPort: this.props.viewPort
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { viewPort, displayStory, displayBkgd } = nextProps;
    if(
      prevState.displayBkgd !== displayBkgd ||
      prevState.displayStory !== displayStory ||
      prevState.viewPort !== viewPort
    )
      return {
        displayBkgd,
        displayStory,
        viewPort,
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnScroll = (scrollTop) => {
    const { offsetWidth } = this.state.viewPort
    this.props.onScroll({scrollTop, offsetWidth })
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { displayStory, displayBkgd, viewPort } = this.state;

    if(!displayBkgd) return null

    const transition = {
      active: {
        from: { opacity: 0, marginLeft: viewPort.offsetWidth * .2 },
        to: { opacity: 1, marginLeft: 0 }
      },
      notactive: {
        from: { opacity: 1 },
        to: { opacity: 0 }
      }
    }[displayStory ? 'active' : 'notactive']

    return (
      <Spring
        native
        config={{ delay: displayStory ? 300 : 0 }}
        {...transition}
        onRest={this.props.onRest('story')}
        >
        {style => (
        <animated.div className="release__story release__story--album" style={style}>
          <Parallax ref={ref => (this.parallax = ref)} pages={2} className="release__story__content" style={{ paddingTop: viewPort.offsetWidth * .8}} innerStyle={{ columnWidth: viewPort.offsetHeight }} onScroll={this.handleOnScroll}>
            <div className="slide">
              <div>
                <ParallaxLayer offset={0} speed={.25}>
                  <img src={PhotoPath('album/img-1-md')} width={viewPort.offsetHeight * .5} alt="" />
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={.3}>
                  <h3 className="album__title_1">
                    self-titled<small>:2007</small>
                  </h3>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={.2}>
                  <p className="album__paragraph album__paragraph--intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a <Link to="/releases/split">Split</Link> nibh eu nisi feugiat pretium. </p>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={.1}>
                  <p className="album__paragraph album__paragraph--labels">
                    This record was released in France by <strong>STSnework</strong>, in Germany and UK by <strong>Fond Of Life</strong> and in Italia by <strong>Chorus Of One</strong>.
                  </p>
                  <div className="album__labels">
                    <img src={ImagePath('logo-sts.png')} alt="STSnework logo" className="img__label" />
                    <img src={ImagePath('logo-coo.png')} alt="Chorus Of One logo" className="img__label" />
                    <img src={ImagePath('logo-fol.png')} alt="Fond Of Life logo" className="img__label" />
                  </div>
                </ParallaxLayer>
              </div>
            </div>{/* /.slide */}
            <div className="slide">
              <div>
                <ParallaxLayer offset={0} speed={.3}>
                  <div className="album__block album__block--loko">
                    <img src={PhotoPath('album/loko-md')} width={viewPort.offsetHeight * .4} alt="" className="album__img album__img--loko" />
                    <div>
                      <p className="album__paragraph album__paragraph--loko">
                        <strong>Sebastien Langle</strong> and <strong>Guillaume André</strong> from <strong>Loko Studio</strong>. These guys must have adamantium made nerves to handle us!
                      </p>
                    </div>
                  </div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={.1}>
                  <div className="album__block album__block--jp">
                    <div>
                      <p className="album__paragraph album__paragraph--jp">
                        Kinda amazed when our friend Anaïs found our album in a Tokyo record shop.
                      </p>
                    </div>
                    <img src={PhotoPath('album/jp-md')} height={viewPort.offsetHeight * .2} alt="" className="album__img--jp" />
                  </div>
                </ParallaxLayer>
              </div>
            </div>
            <div className="slide" /*style={{ height: '110%' }}*/>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column' }}>
                <Tracks />
                <p style={{ fontSize: 14, textAlign: 'right', display: 'none'}}>
                  <em>
                    broken life in a non-sense game we play, I lost a piece of my self-program in the station.<br />
                    broken life in a non-sense game we play, my world just lacking self-affection.<br />
                    you ate the bread I paid, you didn't share to anyone, where have we failed.<br />
                    with no faith, forced to smile again, I cling myself to an illusion<br />
                    in their plans, I didn't see my name<br />
                  </em>
                </p>
              </div>
            </div>{/* /.slide */}
            <div className="slide">
              <div>
                <img src={PhotoPath('album/img-2-md')} width={viewPort.offsetHeight * .6} alt="" />
                <div className="album__block album__block--press" style={{ marginTop: 30}}>
                  <h3 className="album__title_2">Press</h3>
                  <div>
                    <p className="album__paragraph">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat et lectus vitae rhoncus. Vestibulum dui lectus, luctus eu lorem fermentum, placerat porta diam. Integer gravida, mauris et viverra pharetra, nibh enim laoreet risus, nec mattis dolor leo nec mi. Praesent at accumsan arcu, eu ultrices nisl. Donec auctor lorem vehicula mi dignissim, vel scelerisque lectus egestas. Pellentesque facilisis, diam quis aliquet cursus, est enim mollis massa, vitae egestas tellus est sed mauris. Donec non pharetra risus, in consequat dui. Curabitur sodales hendrerit augue, vel consectetur purus ullamcorper id.
                    </p>
                    <p className="album__paragraph">
                      Phasellus pharetra aliquet neque, sed condimentum nisi fringilla eget. Nulla mollis maximus quam. Mauris mollis, mauris eu pulvinar aliquet, diam nulla cursus nisi, et ultricies massa ex non erat. Donec sit amet eros at justo porta congue. Duis luctus ante vitae finibus lacinia. Maecenas in lectus viverra, consequat erat ut, dapibus metus. Curabitur in justo est.
                    </p>
                  </div>
                </div>
              </div>
              {/*<div>
                              <ParallaxLayer offset={1} speed={.28}>
                                <img src={PhotoPath('album/img-2-md')} width={viewPort.offsetHeight * .6} alt="" />
                              </ParallaxLayer>
                              <ParallaxLayer offset={1} speed={.24}>
                                <div className="album__block album__block--press" style={{ marginTop: 30}}>
                                  <h3 className="album__title_2">Press</h3>
                                  <div>
                                    <p className="album__paragraph">
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat et lectus vitae rhoncus. Vestibulum dui lectus, luctus eu lorem fermentum, placerat porta diam. Integer gravida, mauris et viverra pharetra, nibh enim laoreet risus, nec mattis dolor leo nec mi. Praesent at accumsan arcu, eu ultrices nisl. Donec auctor lorem vehicula mi dignissim, vel scelerisque lectus egestas. Pellentesque facilisis, diam quis aliquet cursus, est enim mollis massa, vitae egestas tellus est sed mauris. Donec non pharetra risus, in consequat dui. Curabitur sodales hendrerit augue, vel consectetur purus ullamcorper id.
                                    </p>
                                    <p className="album__paragraph">
                                      Phasellus pharetra aliquet neque, sed condimentum nisi fringilla eget. Nulla mollis maximus quam. Mauris mollis, mauris eu pulvinar aliquet, diam nulla cursus nisi, et ultricies massa ex non erat. Donec sit amet eros at justo porta congue. Duis luctus ante vitae finibus lacinia. Maecenas in lectus viverra, consequat erat ut, dapibus metus. Curabitur in justo est.
                                    </p>
                                  </div>
                                </div>
                              </ParallaxLayer>
                            </div>*/}
            </div>{/* /.slide */}
            {/*<div className="slide" />*/}
            <div className="slide">
              <div>
                <p className="album__paragraph">
                  Integer id turpis lacus. Curabitur sodales eget neque a suscipit. Pellentesque vel nulla lorem. Aliquam viverra, ipsum ut facilisis scelerisque, dui ligula suscipit mauris, eleifend consectetur dolor ipsum a turpis. Maecenas imperdiet nunc at fermentum venenatis. Vestibulum commodo aliquam aliquam. Vestibulum auctor turpis non nisl rhoncus, mollis dignissim nibh ullamcorper. Sed vestibulum sem non tortor tempus iaculis. Morbi dictum finibus lectus. Nullam sit amet tristique nibh, sit amet efficitur odio. Quisque pharetra nisl felis, laoreet sollicitudin odio scelerisque in. Nunc vehicula nunc sit amet augue pharetra tempus. Donec velit magna, ultricies in turpis ut, ultricies mattis mi. Ut eget ante dolor. Donec sapien velit, semper sed rutrum at, dignissim at nulla.
                </p>
                <p className="album__paragraph">
                  Etiam vel vulputate velit, at commodo metus. Sed ut justo vitae augue fringilla vehicula hendrerit sed metus. In elementum, justo sed lobortis facilisis, dolor urna suscipit risus, vel efficitur dui est non enim. Nunc maximus erat molestie justo luctus euismod. Duis magna dui, sagittis nec sapien a, vestibulum placerat nibh. Integer justo ligula, aliquam vitae mollis sed, congue ut libero. Sed fringilla risus diam. Curabitur mattis tempor nunc, at hendrerit orci sagittis eu. Quisque dapibus tortor sit amet justo faucibus, a viverra elit elementum. Sed iaculis consequat augue pretium cursus. Nam ornare nunc a leo interdum sollicitudin. Fusce cursus enim id quam condimentum, eget dignissim mauris euismod. Sed quis nisl sed urna sollicitudin porta.
                </p>
              </div>
            </div>{/* /.slide */}
            <div className="slide">
              <div>
                <div className="album__block">
                  <div>
                    <h3>Live</h3>
                    <p className="album__paragraph">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat et lectus vitae rhoncus. Vestibulum dui lectus, luctus eu lorem fermentum, placerat porta diam. Integer gravida, mauris et viverra pharetra, nibh enim laoreet risus, nec mattis dolor leo nec mi. Praesent at accumsan arcu, eu ultrices nisl. Donec auctor lorem vehicula mi dignissim, vel scelerisque lectus egestas. Pellentesque facilisis, diam quis aliquet cursus, est enim mollis massa, vitae egestas tellus est sed mauris. Donec non pharetra risus, in consequat dui. Curabitur sodales hendrerit augue, vel consectetur purus ullamcorper id.
                    </p>
                    <p className="album__paragraph">
                      Phasellus pharetra aliquet neque, sed condimentum nisi fringilla eget. Nulla mollis maximus quam. Mauris mollis, mauris eu pulvinar aliquet, diam nulla cursus nisi, et ultricies massa ex non erat. Donec sit amet eros at justo porta congue. Duis luctus ante vitae finibus lacinia. Maecenas in lectus viverra, consequat erat ut, dapibus metus. Curabitur in justo est.
                    </p>
                  </div>
                </div>
                {/*<Video videoId="We_Mjjsi2Kk" className="page__video--album-tour-1" />*/}
                <img src={PhotoPath('album/live-1-md')} width={viewPort.offsetHeight * .6} alt="" style={{ marginTop: 30}} />
              </div>
            </div>{/* /.slide */}
            <div className="slide">
              <div>
                <ParallaxLayer offset={2} speed={.2}>
                  <div className="album__block album__block--jp">
                    <div>
                      <p className="album__paragraph album__paragraph--jp">
                        Kinda amazed when our friend Anaïs found our album in a Tokyo record shop.
                      </p>
                    </div>
                    <img src={PhotoPath('album/jp-md')} height={viewPort.offsetHeight * .2} alt="" className="album__img--jp" />
                  </div>
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={.26}>
                  <div className="album__block album__block--loko">
                    <img src={PhotoPath('album/loko-md')} width={viewPort.offsetHeight * .4} alt="" className="album__img album__img--loko" />
                    <div>
                      <p className="album__paragraph album__paragraph--loko">
                        <strong>Sebastien Langle</strong> and <strong>Guillaume André</strong> from <strong>Loko Studio</strong>. These guys must have adamantium made nerves to handle us!
                      </p>
                    </div>
                  </div>
                </ParallaxLayer>
              </div>
            </div>{/* /.slide */}
            <div className="slide" />
            <div className="slide">
              <div>
                <div className="album__pictures">
                  <img src={PhotoPath('album/img-2-md')} alt="" />
                  <img src={PhotoPath('album/loko-md')} alt="" />
                  <img src={PhotoPath('album/jp-md')} alt="" />
                  <img src={PhotoPath('album/live-1-md')} alt="" />
                  <img src={PhotoPath('album/tour-2-md')} alt="" />
                  <img src={PhotoPath('album/img-2-md')} alt="" />
                  <img src={PhotoPath('album/jp-md')} alt="" />
                  <img src={PhotoPath('album/img-1-md')} alt="" />
                </div>
              </div>
            </div>{/* /.slide */}
            <div className="slide" />
            <div className="slide">
              <div>
                <ParallaxLayer offset={2} speed={.1}>
                  <div className="album__block album__block--jp">
                    <div>
                      <p className="album__paragraph album__paragraph--jp">
                        Kinda amazed when our friend Anaïs found our album in a Tokyo record shop.
                      </p>
                    </div>
                    <img src={PhotoPath('album/jp-md')} height={viewPort.offsetHeight * .2} alt="" className="album__img--jp" />
                  </div>
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={.2}>
                  <div className="album__block album__block--loko">
                    <img src={PhotoPath('album/loko-md')} width={viewPort.offsetHeight * .4} alt="" className="album__img album__img--loko" />
                    <div>
                      <p className="album__paragraph album__paragraph--loko">
                        <strong>Sebastien Langle</strong> and <strong>Guillaume André</strong> from <strong>Loko Studio</strong>. These guys must have adamantium made nerves to handle us!
                      </p>
                    </div>
                  </div>
                </ParallaxLayer>
              </div>
            </div>{/* /.slide */}
            <div className="slide" />
          </Parallax>
        </animated.div>
        )}
      </Spring>
    )
  }
}

const mapAppContextToProps = state => ({
  viewPort: state.getViewPort()
});
export default withApp(mapAppContextToProps)(ReleaseAlbumStory);
