import React, { useState, useEffect } from 'react';
import './home.css';
import { Button, Layout, Menu, Statistic } from 'antd';
import { TeamOutlined, PieChartOutlined, UserAddOutlined, UserSwitchOutlined, IdcardOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import app from "./../../firebase/base";
import firebase from 'firebase';
import api from '../../services/api';

const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
    const keyActive = 1;
    const [colapso, setColapso] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
      api.get('/membro').then(res => {
        setData(res.data);
      })
    }, []);
    let style;

    if (colapso == true) {
      style = {
        marginLeft: 0
      }
    } else {
      style = {marginLeft: 240}
    }

    return (
        <Layout style={{width: '100%', height: '100%'}}>
    <Sider
      breakpoint="lg"
      width={240}
      style={{position: 'fixed', top: 0, bottom: 0, background: '#8B0000'}}
      collapsedWidth="0"
      onBreakpoint={broken => {
        //console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        //console.log(collapsed, type);
        setColapso(collapsed);
      }}
    >
      <div id="logo">
          Cadastro de Membros IADEP
      </div>
      <Menu style={{background: '#8B0000'}} theme="dark" mode="inline" defaultSelectedKeys={[`${keyActive}`]}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to={'/'}>
            Visão Geral
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserAddOutlined />}>
          <Link to={'/cadastro'}>
            Cadastro de Membros
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          <Link to={'/view'}>
            Vizualizar Membros
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserSwitchOutlined />}>
          <Link to={'/edit'}>
            Editar Membros
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<IdcardOutlined />}>
          <Link to={'/card'}>
            Confeccionar Carteiras
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={style}>
      <Header className="site-layout-sub-header-background" style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Button onClick={() => app.auth().signOut()} style={{marginRight: '20px'}} danger><LogoutOutlined /> Sair</Button>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div id="cabecario">
                <h1>Sistema de Cadastro de Membros IADEP</h1>
                <p>Neste sitema será possivel realizar o cadastro de novos membros, a manuntenção de membros antigos e a confeccão de carteirinhas!</p>
            </div>
            <br/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Statistic title="Membros Ativos" value={data.length} />
            </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Assembleia de Deus IADEP ©2021 Created by Cainã Gonçalves</Footer>
    </Layout>
  </Layout>
    );
}

export default withRouter(HomePage);