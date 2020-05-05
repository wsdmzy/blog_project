'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    this.ctx.body = 'hello';
  }

  async login() {
    const username = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    const sql = `SELECT username FROM admin_user WHERE username = '${username}' AND password = '${password}'`;
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      const token = this.app.jwt.sign({ username }, this.app.config.jwt.secret);
      // console.log(token);
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

  async addArticle() {
    const temp = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', temp);

    this.ctx.body = {
      isOk: result.affectedRows === 1,
      insertId: result.insertId,
    };
  }

  async updateArticle() {
    const temp = this.ctx.request.body;
    const result = await this.app.mysql.update('article', temp);

    this.ctx.body = {
      isOk: result.affectedRows === 1,
    };
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.addtime as addtime,' +
                'article.view_count as view_count,' +
                'type.typename as typename ' +
                'FROM article LEFT JOIN type ON article.type_id=type.id ' +
                'ORDER BY article.id DESC ';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      list: result,
    };
  }

  async deleteArticle() {
    const id = this.ctx.params.id;
    const result = await this.app.mysql.delete('article', { id });
    this.ctx.body = {
      data: result,
    };
  }

  async getArticleById() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                'article.addtime as addtime,' +
                'article.view_count as view_count ,' +
                'type.typename as typename ,' +
                'type.id as typeid ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'WHERE article.id=' + id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: result,
    };

  }

}

module.exports = MainController;
