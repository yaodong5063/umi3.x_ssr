import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';

export default () => {
  return (
    <div className={'pt50 pb10'}>
      <div
        className={'page404Img mgAuto'}
        style={{
          backgroundImage:
            'url(https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg)',
        }}
      ></div>
      <div className={'mt20 fz30 ac'}>您访问的页面不存在</div>
      <Button
        type="primary"
        size="large"
        className={'mgAuto block mt20'}
        onClick={() => history.goBack()}
      >
        返回
      </Button>
    </div>
  );
};
