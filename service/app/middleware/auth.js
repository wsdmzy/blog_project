'use strict';

module.exports = async function auth(ctx, next) {
  console.log(ctx.requset.method.header.authorization, '+++');
  if (ctx.requset.header.method.authorization) {
    await next();
  } else {
    ctx.body = {
      data: '没有登陆',
    };
  }
};
