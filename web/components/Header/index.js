import React, {useState, useEffect} from 'react';
import './index.css'
import { Row, Col, Menu } from 'antd'
import servicePath from  '../../config/apiUrl'
import Router from 'next/router'
import axios from 'axios'

const Header = () => {

  let [navArr, setNavArr] = useState([])

  useEffect(() => {
   axios(servicePath.getTypeInfo)
      .then(res => {
        // console.log(res.data.data)
        setNavArr(res.data.data)
      })
  }, [])

  // 跳转到列表页
  const handleClick = e => {
    if (e.key == 0) {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
      // Router.push('/list')
    }
  }

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">Ziogie</span>
          <span className="header-txt">练习时长三年半的前端实习生</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu
            mode="horizontal"
            onClick={handleClick} 
            >
            <Menu.Item key="0">    
              首页
            </Menu.Item>
            {
              navArr.map(item => {
                return (
                  <Menu.Item key={item.id}>
                    {item.typename}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header