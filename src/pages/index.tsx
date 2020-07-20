import { IGetInitialProps } from 'umi';
import React from 'react';
import { connect, history } from 'umi';
import styles from './index.less';

class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.test();
  }

  static getInitialProps = (async ctx => {
    const { store } = ctx;
    let { data, code } = await store.dispatch({
      type: 'Test/users',
    });

    return Promise.resolve({
      data: {
        title: 'Hello World',
        name: data.userName,
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
    const { data, Test } = this.props;
    return (
      <div className="pt10">
        <div>{data?.name}</div>
        {data?.title}
        <button onClick={() => history.push('/demo')}>tiaozhuan</button>
      </div>
    );
  }
}
export default connect(({ Test, loading }) => ({
  Test,
  loading,
}))(Home);
