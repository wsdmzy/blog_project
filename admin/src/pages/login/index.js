import React, { useState } from 'react'
import { Card, Input, Button, Spin, message } from 'antd'
import {UserOutlined, KeyOutlined} from '@ant-design/icons'
import './index.css'
import { login } from '../../config/service'
 
function Login(props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    setIsLoading(true)
    if (!userName || !password) {
      message.error("用户名或密码不能为空!")
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
      return false
    }

    const dataProps = {
      username: userName,
      password,
    }
    login(dataProps)
      .then(res => {
        console.log(res.data)
        setIsLoading(false)
        if (res.data.data === '登陆成功') {
          localStorage.setItem('token', res.data.token)
          props.history.push('/index')
        } else {
          message.error('用户名或密码错误!')
        }
      })

  }

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Ziogie Blog System" bordered={true} style={{width:400}}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}} />}
            onChange={e => setUserName(e.target.value)}
            />
          <br /><br />
          <Input.Password 
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}} />}
            onChange={e => setPassword(e.target.value)}
            />
          <br /><br />
          <Button type="primary" size="large" block onClick={checkLogin}> Login In </Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login