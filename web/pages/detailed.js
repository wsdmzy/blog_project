import React from 'react'
import {  Row, Col, Breadcrumb, Affix } from 'antd'
import Head from 'next/head'
import '../public/style/pages/detailed.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import moment from 'moment'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

const Detailed = (props) => {
  const renderer = new marked.Renderer()
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level)
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })
  // console.log(props)
  const html = marked(props.article_content)

 
  

  return  (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div"> 
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/list">视频列表</a></Breadcrumb.Item>
              <Breadcrumb.Item>xxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="detailed-title">
            {props.title}
          </div>
          <div className="list-icon center">
            <span><CalendarOutlined />{moment(props.addtime).format('YYYY-MM-DD HH:mm:ss')}</span>
            <span><FolderOutlined />{props.typename}</span>
            <span><FireOutlined />{props.view_count}人</span>
          </div>
          <div className="detailed-content"
            dangerouslySetInnerHTML={{__html:html}}
            >
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Detailed.getInitialProps = async (context) => {
  // console.log(context.query.id)
  const id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id)
      .then(res => {
        // console.log(res.data)
        resolve(res.data.data[0]) 
      })
  })
  
  return await promise
}

export default Detailed