import React, { useState, useEffect } from 'react';
import './index.css'
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import marked from 'marked'
import { getType } from '../../config/service'

const { Option } = Select


function AddArticle(props) {

  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState(1) //选择的文章类别

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
  })

  const changeContent = e => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = e => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  const getTypeInfo = () => {
    // axios({
    //   method: 'get',
    //   url: servicePath.typeInfo,
    //   Authorization: localStorage.getItem('token') 
    // })
    getType()
      .then(res => {
        console.log(res)
        if (res.data.data == '没有登陆') {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(res.data.data)
        }
      })
  }

  useEffect(() => {
    getTypeInfo()
  }, [])


  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} style={{marginBottom:'20px'}}>
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                />
            </Col>
            <Col span={4}>
              <Select defaultValue="Sign Up" size="large">
                  <Option value="Sign Up">视频教程</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
                />
            </Col>
            <Col span={12}>
              <div className="show-html"
                dangerouslySetInnerHTML={{__html: markdownContent}}
                >

              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24} style={{marginBottom: '20px'}}>
              <Button size="large" style={{marginRight: '20px'}}>暂存文章</Button>
              <Button type="primary" size="large" >发布文章</Button>
            </Col>
            <Col span={24}>
              <TextArea
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroduce}
                />
              <div className="introduce-html"
                dangerouslySetInnerHTML={{__html: introducehtml}}
                ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle