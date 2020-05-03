const ip = 'http://127.0.0.1:7001/default/'

const servicePath = {
  getArticleList: ip + 'getarticlelist',  //列表页
  getArticleById: ip + 'getarticlebyid/', //根据id获取详情页
  getTypeInfo: ip + 'gettypeinfo', //分类
  getListById: ip + 'getlistbyid/', //根据id获取列表页
}

export default servicePath