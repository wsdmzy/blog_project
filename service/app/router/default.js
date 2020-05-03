'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getarticlelist', controller.default.home.getArticleList);
  router.get('/default/getarticlebyid/:id', controller.default.home.getArticleById);
  router.get('/default/gettypeinfo', controller.default.home.getTypeInfo);
  router.get('/default/getlistbyid/:id', controller.default.home.getListById);
};
