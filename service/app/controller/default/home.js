'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hello';
  }
  // FROM_UNIXTIME(article.addtime, "%Y-%m-%d %H:%i:%s")
  // 文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.addtime as addtime,' +
                'article.view_count as view_count,' +
                'type.typename as typename ' +
                'FROM article LEFT JOIN type ON article.type_id=type.id';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }

  // 根据id获取文章详情
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    'article.article_content as article_content,' +
    'article.addtime as addtime,' +
    'article.view_count as view_count,' +
    'type.typename as typename,' +
    'type.id as typeid ' +
    'FROM article LEFT JOIN type ON article.type_id=type.id ' +
    'WHERE article.id = ' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = {
      data: result,
    };
  }

  // 根据id获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.addtime as addtime,' +
                'article.view_count as view_count,' +
                'type.typename as typename ' +
                'FROM article LEFT JOIN type ON article.type_id=type.id ' +
                'WHERE type_id =' + id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }

}

module.exports = HomeController;
