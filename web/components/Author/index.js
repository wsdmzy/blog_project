import { Avatar, Divider } from 'antd'
import './index.css'
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=466636099,2440212896&fm=111&gp=0.jpg"  />
        <div className="author-introduction">
          html,css,javascript,vue,react, typescript,
         nodejs,koa,egg,go,gin,
          mongodb,mysql,nginx,
          <Divider>社交账号</Divider>
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
          <Avatar size={28} icon={<QqOutlined />} className="account" />
          <Avatar size={28} icon={<WechatOutlined />} className="account" />
        </div>
      </div>
    </div>
  )
}

export default Author