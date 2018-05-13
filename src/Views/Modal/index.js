import React, { PureComponent } from 'react'

import './styles.css'

export default class Index extends PureComponent
{
  constructor( props )
  {
    super( props )

    this.state = {
        children:  null
      , active: false
    }

    this.handleOnClose = this.handleOnClose.bind( this )
  }

  componentWillReceiveProps( nextProps )
  {
    if( nextProps.children )
      this.setState({ children: nextProps.children, active: true })
  }

  handleOnClose()
  {
    this.setState({ active: null, children: null }, this.props.onClose )
  }

  render()
  {
    return (
      <div className={`modal ${ this.state.active ? 'modal--active': ''}`}>
        <div className="modal__close" onClick={this.handleOnClose} />
        {this.state.children}
      </div>
    )
  }
}
