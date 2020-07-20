import { users } from '@/api/api';

export default {
  namespace: 'Test',
  state: {
    users: {},
  },
  effects: {
    //demo
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
