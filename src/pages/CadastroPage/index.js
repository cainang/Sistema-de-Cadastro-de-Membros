import React, { useEffect, useState } from 'react';
import './home.css';
import { Layout, Menu, Form, Input, Button, Select, DatePicker, Space, Modal } from 'antd';
import { TeamOutlined, PieChartOutlined, UserAddOutlined, UserSwitchOutlined, IdcardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Redirect } from "react-router";


const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} é obrigatório!',
  types: {
    email: '${label} o email não é válido!',
    number: '${label} o número não é válido!',
  },
  number: {
    range: '${label} somente entre ${min} e ${max}',
  },
};



const CadastroPage = ({history}) => {
    const keyActive = 2;
    const [colapso, setColapso] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [congregacoes, setCongregacoes] = useState([]);

    useEffect(() => {
      api.get('/congregacao').then(res => {
        setCongregacoes(res.data);
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
    const [congregacao, setCongregacao] = useState('');
    const [cargo, setCargo] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');

    const [dataBatismo, setDataBatismo] = useState({});
    const [dataNascimento, setDataNascimento] = useState({});
    const [dataAceitacao, setDataAceitacao] = useState({});

    const onFinish = async (values) => {
      const {nome, rg, cpf, rua, numero, cidade, bairro, naturalidade} = values;
      if (congregacao == '' || cargo == '' || estadoCivil == '' || Object.keys(dataAceitacao).length == 0 || Object.keys(dataBatismo).length == 0 || Object.keys(dataNascimento).length == 0) {
        Modal.error({
          content: `Ops.. Você Deixou Algo em Branco..`,
          afterClose: () => {return}
        })
      } else {
        const data = {
          nome,
          cargo,
          congregacao,
          naturalidade,
          rg,
          cpf,
          estado_civil: estadoCivil,
          data_batismo: dataBatismo,
          data_nascimento: dataNascimento,
          data_membro: dataAceitacao,
          rua,
          numero,
          bairro,
          cidade
        }
        try {
          setIsLoading(true);
          await api.post('membro/create', data);
          Modal.success({
            content: 'Membro Cadastrado com Sucesso!!',
            afterClose: () => {history.push('/')}
          })
        } catch (error) {
          Modal.error({
            content: `${error}`,
            afterClose: () => {history.push('/')}
          })
        }
      }

      
    }

    function handleChange(value) {
      setCargo(value);
    }

    function handleChange2(value) {
      setEstadoCivil(value);
    }

    function handleChange3(value) {
      setCongregacao(value);
    }

    function onChange(date, dateString) {
      setDataBatismo({data: date, dateString: dateString});
    }

    function onChange2(date, dateString) {
      setDataNascimento({data: date, dateString: dateString});
    }

    function onChange3(date, dateString) {
      setDataAceitacao({data: date, dateString: dateString});
    }

    return (
        <Layout>
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
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div id="cabecario">
                <h1>Cadastrar Novo Membro</h1>
            </div>
            <br/>
            <div style={{marginRight: '12.5rem'}}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
              <Form.Item
                name={['nome']}
                label="Nome"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={'Cargo'}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <Select defaultValue="cargo" style={{ width: 190 }} onChange={handleChange}>
                <Option disabled value='cargo'>Escolha um Cargo:</Option>
                <Option value="Membro">Membro</Option>
                <Option value="Diácono">Diácono</Option>
                <Option value="Presbitero">Presbitero</Option>
                <Option value="Evangelista">Evangelista</Option>
                <Option value="Pastor">Pastor</Option>
              </Select>
              </Form.Item>
              <Form.Item
                label="Congregação"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select defaultValue="congregacao" style={{ width: 220 }} onChange={handleChange3}>
                  <Option disabled value='congregacao'>Escolha uma Congregação:</Option>
                  {congregacoes.map(res => {
                    return <Option key={res.id} value={res.nome_congregacao}>{res.nome_congregacao}</Option>
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name={['naturalidade']}
                label="Naturalidade"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder='Ex.: Fortaleza - CE' />
              </Form.Item>
              <Form.Item
                name={['rg']}
                label="RG"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['cpf']}
                label="CPF"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={'Estado Civil'}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <Select defaultValue="estado" style={{ width: 190 }} onChange={handleChange2}>
                <Option disabled value='estado'>Escolha um Estado Civil:</Option>
                <Option value="Solteiro">Solteiro</Option>
                <Option value="Casado">Casado</Option>
                <Option value="Viúvo">Viúvo</Option>
                <Option value="Divorciado">Divorciado</Option>
              </Select>
              </Form.Item>
              <Form.Item
                label={'Data de Batismo'}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space direction="vertical">
                  <DatePicker format='DD-MM-YYYY' onChange={onChange} />
                </Space>
              </Form.Item>
              <Form.Item
                label={'Data de Nascimento'}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space direction="vertical">
                  <DatePicker format='DD-MM-YYYY' onChange={onChange2} />
                </Space>
              </Form.Item>
              <Form.Item
                label={'Data de Aceitação'}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space direction="vertical">
                  <DatePicker format='DD-MM-YYYY' onChange={onChange3} />
                </Space>
              </Form.Item>
              <br/>
              <h1>Endereço</h1>
              <br/>
              <Form.Item
                name={['rua']}
                label="Rua"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['numero']}
                label="Número"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['bairro']}
                label="Bairro"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['cidade']}
                label="Cidade"
                rules={[
                  {
                    required: true
                  },
                ]}
              >
                <Input placeholder='Ex.: Fortaleza - CE' />
              </Form.Item>

              
              
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                {isLoading == true
                ?
                (
                  <Button type="primary" loading htmlType="submit">
                    Cadastrar
                  </Button>
                )
                :
                (
                  <Button type="primary" htmlType="submit">
                    Cadastrar
                  </Button>
                )
                }
              </Form.Item>
            </Form>
            </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Assembleia de Deus IADEP ©2021 Created by Cainã Gonçalves</Footer>
    </Layout>
  </Layout>
    );
}

export default CadastroPage;