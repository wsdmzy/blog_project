import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Head from 'next/head'
import {  
  Row, 
  Col,
  List,
  Breadcrumb
 } from 'antd'
 import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons'
import servicePath from '../config/apiUrl'
import moment from 'moment'
import axios from 'axios'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


const MyList = (props) => {
  // console.log(props)
  const [mylist, setMylist] = useState(props.data)
  // spa  这里没用ssr渲染
  useEffect(() => {
    setMylist(props.data)
  })
  const renderer = new marked.Renderer()
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
  return (
    <div>
      <Head>
        <title>List</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>

          <div className="bread-div" >  
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <List 
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed', query:{id: item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon"> 
                  <span><CalendarOutlined />{moment(item.addtime).format('YYYY-MM-DD')}</span>
                  <span><FolderOutlined />{item.typename}</span>
                  <span><FireOutlined />{item.view_count}人</span>
                </div>
                <div 
                  className="list-context"
                  dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                  >
                </div>
              </List.Item>
            )}
            />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

MyList.getInitialProps = async (context) => {
  const id = context.query.id
  // console.log(id)
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id)
      .then(res => {
        resolve(res.data)
      })
  })
  // console.log(promise,'+++')
  return await promise
}

export default MyList