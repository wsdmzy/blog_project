'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    this.ctx.body = 'hello';
  }

  async login() {
    const username = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    // console.log(username, password);
    const sql = `SELECT username FROM admin_user WHERE username = '${username}' AND password = '${password}'`;
    // console.log(sql);
    const result = await this.app.mysql.query(sql);
    // console.log(result);
    if (result.length > 0) {
      const token = this.app.jwt.sign({ foo: 'bar' }, this.app.config.jwt.secret);
      console.log(token);
      // const openId = new Date().getTime();
      // 登陆成功进行session缓存
      // console.log(openId);
      this.ctx.body = {
        data: '登陆成功',
        token,
      };
    } else {
      this.ctx.body = {
        data: '登陆失败',
      };
    }
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = {
      data: result,
    };
  }

}

module.exports = MainController;
