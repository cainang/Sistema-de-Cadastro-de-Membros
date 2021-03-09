import React, { useCallback, useContext, useState } from 'react';
import './home.css';
import { Form, Input, Button, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import app from "./../../firebase/base";
import { AuthContext } from "./../../firebase/Auth";
import firebase from 'firebase';
import { withRouter, Redirect } from "react-router";


const LoginPage = ({history}) => {
  
  const [isLoading, setIsLoading] = useState(false);


  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }



  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await app
        .auth()
        .signInWithEmailAndPassword(values.username, values.password);
        setIsLoading(false);
      history.push("/");
    } catch (error) {
      Modal.error({
        title: 'Ops... Algo deu Errado!!',
        content: `${error}`,
        afterClose: () => setIsLoading(false)
      });
    }
  };




    return (
        <div style={{display: 'flex', backgroundColor: '#8B0000', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
          <h1 style={{color: 'white'}}>Sistema de Cadastro de Membros IADEP</h1>
          <Form
            name="normal_login"
            className="login-form"
            style={{width: '300px'}}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Por favor preencha o campo com o Email!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Por favor preencha o campo com a Senha!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              {isLoading == true 
              ?
              (<Button loading type="primary" htmlType="submit" className="login-form-button">
              Entrar
            </Button>)
              :
              (<Button type="primary" htmlType="submit" className="login-form-button">
              Entrar
            </Button>)}
            </Form.Item>
          </Form>
        </div>
    );
}

export default LoginPage;