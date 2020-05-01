'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/default')(app);
};


// RestFul 简单 约束性
// get post put delete
