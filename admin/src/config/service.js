import request from './request'

// 登陆
const login = ({username, password}) => {
  return request.post('login', {username, password})
}

const getType = () => {
  return request.get('typeinfo')
}

const addArticle = (data) => {
  return request.post('addarticle', data)
}

const updateArticle = (data) => {
  return request.put('updatearticle', data)
}

const getArticleList = () => {
  return request.get('getarticlelist')
}

const deleteArticle = (id) => {
  return request.delete('deletearticle/'+ id)
}

const getArticleById = (id) => {
  return request.get('getarticlebyid/' + id)
}

export  {
  login,
  getType,
  addArticle,
  updateArticle,
  getArticleList,
  deleteArticle,
  getArticleById
}