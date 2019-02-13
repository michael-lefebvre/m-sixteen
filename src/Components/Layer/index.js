import React from 'react'
import { HotKeys } from "react-hotkeys";
import classNames from 'classnames';
import { withApp } from 'Hoc'
import "./index.scss";

const Layer = ({ children, history, isCurrentSection, section, className = "" }) => {

  const handleOnEsc = () => {
    // history.push('/')
    console.log('handleOnEsc')
  };

  const isActive = isCurrentSection(section)

  // if(!isActive) return null

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

const mapContextToProps = (context, ownProps) => ({
  history: null, //context.getHistory(),
  // isActive: context.currentSection === ownProps.section
});

export default withApp(mapContextToProps)(Layer);
