import request from '../utils/request';

const url = 'http://localhost:8999';

// 登录
export async function users(data) {
  return request(`${url}/test/users`, {
    method: 'get',
    data,
  });
}

// 退出
export async function logout(data) {
  return request(`${url}/test/users/logout`, {
    method: 'delete',
    data,
  });
}

//菜单
export async function menu(data) {
  return request(`${url}/test/menu`, {
    method: 'get',
    data,
  });
}
