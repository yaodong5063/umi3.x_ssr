import React, { PureComponent } from 'react';

class BasicLayout extends PureComponent {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { children, location } = this.props;
    // console.log(location)
    return <div>{children}</div>;
  }
}

export default BasicLayout;
