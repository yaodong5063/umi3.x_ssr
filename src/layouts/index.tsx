import React, { PureComponent } from 'react';
import { Helmet, connect } from 'umi';
class BasicLayout extends PureComponent {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { children, location, Test } = this.props;
    return (
      <>
        <Helmet encodeSpecialCharacters={false}>
          <html lang="en" data-direction="666" />
          <title>{Test?.users?.userName}</title>
        </Helmet>
        <div>{children}</div>
      </>
    );
  }
}

export default connect(({ Test, loading }) => ({
  Test,
  loading,
}))(BasicLayout);
