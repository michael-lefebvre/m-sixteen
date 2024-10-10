import React, { PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { BkgdContext } from 'Contexts/Bkgd';
import { getComponentName } from 'Utils';

const withBkgd = (mapContextToProps = v => v) => WrappedComponent => {
  class BkgdHoc extends PureComponent {
    static contextType = BkgdContext;

    //
    // Helpers
    // --------------------------------------------------

    //
    // Events Handlers
    // --------------------------------------------------

    // Renderers
    // --------------------------------------------------

    render() {
      const { props } = this;
      // console.log(this.context)
      return (
        <WrappedComponent
          {...mapContextToProps(this.context, props)}
          {...props}
        />
      );
    }
  }

  BkgdHoc.displayName = `withBkgd(${getComponentName(WrappedComponent)})`;

  hoistStatics(BkgdHoc, WrappedComponent);

  return BkgdHoc;
};

export default withBkgd;
