import React from 'react'
import { HotKeys } from "react-hotkeys";
import classNames from 'classnames';
import { withApp } from 'Contexts/App';
import "./index.scss";

const Layer = ({ children, history, isActive, className = "" }) => {

  const handleOnEsc = () => {
    history.push('/')
  };

  const cx = classNames('layer', {
    'layer--active': isActive
  }, className)

  return (
    <HotKeys
      focused={isActive}
      attach={window}
      className={cx}
      keyMap={{
        esc: "esc"
      }}
      handlers={{
        esc: handleOnEsc
      }}
    >
      {children}
    </HotKeys>
  );
};

const mapContextToProps = (state, ownProps) => ({
  history: state.getHistory(),
  isActive: state.currentSection === ownProps.section
});

export default withApp(mapContextToProps)(Layer);
