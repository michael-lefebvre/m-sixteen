
const NOOP  = () => {}

const easeInOutQuad = ( t, b, c, d ) =>
{
  t /= d/2

  if( t < 1 )
    return c/2*t*t + b

  t--
  return -c/2 * (t*(t-2) - 1) + b
}

const animatedScrollTo = ({ element, to = 0, duration = 350, callback = NOOP }) =>
{
  if( !element )
    element = window

  var isWindowElm    = element === window
    , start          = isWindowElm ? element.scrollY : element.scrollTop
    , change         = to - start
    , animationStart = +new Date()
    , animating      = true
    , lastpos        = null

  var _scrollTop = val => {
    if( isWindowElm )
      return window.scrollTo( window.scrollX, val)

    element.scrollTop = val
  }

  var animateScroll = () =>
  {
    if( !animating )
      return callback()

    requestAnimationFrame( animateScroll )

    var now = +new Date()
      , val = Math.floor( easeInOutQuad( now - animationStart, start, change, duration ) )

    if( lastpos )
    {
      if( lastpos === ( isWindowElm ? element.scrollY : element.scrollTop ) )
      {
        lastpos = val
        _scrollTop( val )
      }
      else
        animating = false
    }
    else
    {
      lastpos = val
      _scrollTop( val )
    }

    if( now > animationStart + duration )
    {
      _scrollTop( to )
      animating         = false
    }
  }

  requestAnimationFrame( animateScroll )
}

export default animatedScrollTo
