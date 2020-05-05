'use strict';

module.exports = async function auth(ctx, next) {
  // console.log(typeof ctx.header.authorization.slice(7));
  if (ctx.header.authorization.slice(7) !== 'null') {
    await next();
  } else {
    console.log('---');
    ctx.body = {
      data: '没有登陆',
    };
    return false;
  }
};
