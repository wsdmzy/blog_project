import React, { useState, useEffect } from 'react';
import './index.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import marked from 'marked'
import { getType, addArticle, updateArticle, getArticleById } from '../../config/service'

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
  const [selectedType,setSelectType] = useState("请选择类型") //选择的文章类别

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
    getType()
      .then(res => {
        // console.log(res)
        if (res.data.data == '没有登陆') {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(res.data.data)
        }
      })
  }

  const getArticle = id => {
    getArticleById(id)
      .then(res => {
        console.log(res)
        setArticleTitle(res.data.data[0].title)
        setArticleContent(res.data.data[0].article_content)
        const html = marked(res.data.data[0].article_content)
        setMarkdownContent(html)
        setIntroducemd(res.data.data[0].introduce)
        let temp = marked(res.data.data[0].introduce)
        setIntroducehtml(temp)
        setShowDate(res.data.data[0].addtime)
        setSelectType(res.data.data[0].typeid)
      })
  }

  useEffect(() => {
    getTypeInfo()
    const temId = props.match.params.id
    if (temId) {
      setArticleId(temId)
      getArticle(temId)
    }
  }, [])

  const selectTypeHandler = (value) => {
    // console.log(value)
    setSelectType(value)
  }

  const saveArticle = ()=>{
    if(selectedType === '请选择类型'){
        message.error('必须选择文章类别')
        return false
    }else if(!articleTitle){
        message.error('文章名称不能为空')
        return false
    }else if(!articleContent){
        message.error('文章内容不能为空')
        return false
    }else if(!introducemd){
        message.error('简介不能为空')
        return false
    }else if(!showDate){
        message.error('发布日期不能为空')
        return false
    }
    // console.log(showDate)
    const date = showDate.replace('-','/')
    // console.log(new Date(date).getTime())
    // message.success('检验通过')
    const data = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce : introducemd,
      addtime: (new Date(date).getTime()),
    }
    // console.log(data)
    if (articleId === 0) {
      data.view_count = 0
      addArticle(data)
        .then(res => {
          // console.log(res)
          setArticleId(res.data.insertId)
          if (res.data.isOk) {
            message.success("文章发布成功")
          } else {
            message.error("文章发布失败")
          }
        })
    } else {
      data.id = articleId
      updateArticle(data)
        .then(res => {
          console.log(res)
          // setArticleId(res.data.insertId)
          if (res.data.isOk) {
            message.success("文章修改成功")
          } else {
            message.error("文章修改失败")
          }
        })
    }
}

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} style={{marginBottom:'20px'}}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={e => setArticleTitle(e.target.value)}
                />
            </Col>
            <Col span={4}>
              <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                  {
                    typeInfo.map(item => (
                      <Option key={item.id} value={item.id}>{item.typename}</Option>
                    ))
                  }
              </Select>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
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
              <Button type="primary" size="large" onClick={saveArticle} >发布文章</Button>
            </Col>
            <Col span={24}>
              <TextArea
                rows={4}
                value={introducemd}
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
                  onChange={(date,dateString) => setShowDate(dateString)}
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