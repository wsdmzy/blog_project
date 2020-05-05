import React, { useState, useEffect } from 'react';
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import { getArticleList, deleteArticle } from '../../config/service'
import moment from 'moment'
import './index.css'

const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([])

  const getList = () => {
    getArticleList()
      .then(res => {
        // console.log(res)
        setList(res.data.list);
      })
  }

  const handleDelete = (id) => {
    confirm({
      title: '你确定要删除该文章吗?',
      content: '如果你点击了确定，文章将会被删除!',
      onOk() {
        deleteArticle(id)
          .then(res => {
            // console.log(res)
            message.success('文章删除成功!');
            getList()
          })
      },
      onCancel() {
        message.success('没有任何变化。');
      }
    })
  }

  const handleUpdate = id =>  {
    props.history.push('/index/add/' + id);
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <List 
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
              <Row className="list-div">
            <Col span={8}>
             <b>{item.title}</b>
            </Col>
            <Col span={4}>
              <b>{item.typename}</b>
            </Col>
            <Col span={4}>
              <b>{moment(item.addtime).format('YYYY-MM-DD')}</b>
            </Col>
            <Col span={4}>
              <b>{item.view_count}</b>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={() => handleUpdate(item.id)}>修改</Button>&nbsp;
              <Button onClick={() => handleDelete(item.id)}>删除</Button>
            </Col>
          </Row>
          </List.Item>
        )}
        />
    </div>
  )

}

export default ArticleList