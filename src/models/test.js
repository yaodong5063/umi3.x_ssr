import { users, logout, menu } from '@/api/test';

export default {
  namespace: 'Test',
  state: {
    users: {},
  },
  effects: {
    //登录
    *users({ payload }, { call, put }) {
      const response = yield call(users, payload);
      yield put({
        type: 'responseData',
        payload: {
          users: response.data || {},
        },
      });
      return response;
    },
    //退出
    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      return response;
    },
    //菜单
    *menu({ payload }, { call, put }) {
      const response = yield call(menu, payload);
      return response;
    },
  },

  reducers: {
    responseData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
