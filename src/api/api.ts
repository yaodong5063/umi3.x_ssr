import request from '../utils/request';

const url = 'http://localhost:8002';

// 测试
export async function users(data: any) {
  return request(`${url}/test/users`, {
    method: 'get',
    data,
  });
}
