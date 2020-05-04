import request from './request'

// 登陆
const login = ({username, password}) => {
  return request.post('login', {username, password})
}

const getType = () => {
  return request.get('typeinfo')
}

export  {
  login,
  getType
}