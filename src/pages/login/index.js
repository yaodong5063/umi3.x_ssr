import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { connect, history } from 'umi';
import styles from './index.less';

function Login(props) {
  const { dispatch } = props;

  function onFinish(value) {
    dispatch({
      type: 'Test/users',
      payload: value,
    }).then(res => {
      const { data, code } = res;
      if (!code) {
        message.success(res.message);
        localStorage.userInfo = JSON.stringify(data);
        history.push('/');
      }
    });
  }

  function onFinishFailed() {
    console.log('Failed:', errorInfo);
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginFlex}>
        <div className={styles.loginFlexHead}>
          <img
            src="https://data.paat.vip/static/logo-data.b78afc6d.png"
            width="44"
          />
        </div>
        <h3>这边是平台提示</h3>
        <div className={styles.loginCon}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="手机号"
              name="username"
              rules={[{ required: true, message: '请输入账号' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={styles.loginFooter}>
        Copyright 2019 普道（上海）信息科技有限公司
      </div>
    </div>
  );
}

Login.title = '登录';
export default connect(({ Test, loading }) => ({
  Test,
  loading,
}))(Login);
