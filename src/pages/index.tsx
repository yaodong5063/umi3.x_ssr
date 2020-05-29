import { IGetInitialProps } from 'umi';
import React from 'react';
import { connect } from 'umi';
// import styles from './index.less'
class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.test();
  }

  static getInitialProps = (async ctx => {
    const { store } = ctx;
    store.dispatch({
      type: 'Test/users',
    });

    return Promise.resolve({
      data: {
        title: 'Hello World',
        Test: store.getState(),
      },
    });
  }) as IGetInitialProps;

  test = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'Test/users',
    });
  };

  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div className="pt10">
        {data?.title}
        <p>{data?.Test?.users?.userName}</p>
      </div>
    );
  }
}
export default connect(({ Test, loading }) => ({
  Test,
  loading,
}))(Home);
