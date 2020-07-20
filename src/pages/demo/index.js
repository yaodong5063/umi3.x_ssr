import React from 'react';
import { connect } from 'umi';

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.test();
  }

  static getInitialProps = async ctx => {
    const { store } = ctx;
    let { data, code } = await store.dispatch({
      type: 'Test/users',
    });

    return {
      data: {
        title: 'Hello World',
        name: data.userName,
      },
    };
  };

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
      </div>
    );
  }
}
export default connect(({ Test, loading }) => ({
  Test,
  loading,
}))(Demo);
