'use strict';

module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth;
  router.get('/admin/index', auth, controller.admin.main.index);
  router.post('/admin/login', controller.admin.main.login);
  router.get('/admin/typeinfo', auth, controller.admin.main.getTypeInfo);
  router.post('/admin/addarticle', auth, controller.admin.main.addArticle);
  router.put('/admin/updatearticle', auth, controller.admin.main.updateArticle);
  router.get('/admin/getarticlelist', auth, controller.admin.main.getArticleList);
  router.delete('/admin/deletearticle/:id', auth, controller.admin.main.deleteArticle);
  router.get('/admin/getarticlebyid/:id', auth, controller.admin.main.getArticleById);
};
