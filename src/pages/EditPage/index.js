import React, { useState, useEffect } from 'react';
import './home.css';
import { Layout, Menu, Form, Input, Button, Select, DatePicker, Space, Modal } from 'antd';
import { TeamOutlined, PieChartOutlined, UserAddOutlined, UserSwitchOutlined, IdcardOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';


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



const EditPage = ({history}) => {
    const {id} = useParams();
    const [congregacoes, setCongregacoes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let nomeM,
    cargoM,
    congregacaoM,
    naturalidadeM,
    rgM,
    cpfM,
    estado_civilM,
    data_batismoM,
    data_nascimentoM,
    data_membroM,
    ruaM,
    numeroM,
    bairroM,
    cidadeM;

    let nomeD,
    cargoD,
    congregacaoD,
    naturalidadeD,
    rgD,
    cpfD,
    estado_civilD,
    data_batismoD,
    data_nascimentoD,
    data_membroD,
    ruaD,
    numeroD,
    bairroD,
    cidadeD;

    const [data, setData] = useState([]);

    if(data.length > 0){
      data.map(res => {
        nomeM = res.nome;
        cargoM = res.cargo;
        congregacaoM = res.congregacao;
        naturalidadeM = res.naturalidade;
        rgM = res.rg;
        cpfM = res.cpf;
        estado_civilM = res.estado_civil;
        data_batismoM = res.data_batismo.dateString;
        data_nascimentoM = res.data_nascimento.dateString;
        data_membroM = res.data_membro.dateString;
        ruaM = res.endereco.rua;
        bairroM = res.endereco.bairro;
        numeroM = res.endereco.numero;
        cidadeM = res.endereco.cidade;

        nomeD = res.nome;
        cargoD = res.cargo;
        congregacaoD = res.congregacao;
        naturalidadeD = res.naturalidade;
        rgD = res.rg;
        cpfD = res.cpf;
        estado_civilD = res.estado_civil;
        data_batismoD = res.data_batismo;
        data_nascimentoD = res.data_nascimento;
        data_membroD = res.data_membro;
        ruaD = res.endereco.rua;
        bairroD = res.endereco.bairro;
        numeroD = res.endereco.numero;
        cidadeD = res.endereco.cidade;
      })
    }

    useEffect(() => {
      api.get(`membro/${id}`).then(res => {
        setData(res.data);
      });
      api.get('/congregacao').then(res => {
        setCongregacoes(res.data);
      })
    }, []);

    const [colapso, setColapso] = useState(false);
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

      if (nome !== nomeM && nome !== undefined) {
        nomeD = nome;
      } 
      if (rg !== rgM && rg !== undefined) {
        rgD = rg;
      } 
      if (cpf !== cpfM && cpf !== undefined) {
        cpfD = cpf;
      } 
      if (rua !== ruaM && rua !== undefined) {
        ruaD = rua;
      } 
      if (numero !== numeroM && numero !== undefined) {
        numeroD = numero;
      } 
      if (cidade !== cidadeM && cidade !== undefined) {
        cidadeD = cidade;
      } 
      if (bairro !== bairroM && bairro !== undefined) {
        bairroD = bairro;
      } 
      if (naturalidade !== naturalidadeM && naturalidade !== undefined) {
        naturalidadeD = naturalidade;
      } 
      if (congregacao !== congregacaoD && congregacao !== '') {
        congregacaoD = congregacao;
      } 
      if (cargo !== cargoD && cargo !== '') {
        cargoD = cargo;
      } 
      if (estadoCivil !== estado_civilD && estadoCivil !== '') {
        estado_civilD = estadoCivil;
      }
      if (dataAceitacao !== data_membroD && Object.keys(dataAceitacao).length !== 0) {
        data_membroD = dataAceitacao;
      }
      if (dataBatismo !== data_batismoD && Object.keys(dataBatismo).length !== 0) {
        data_batismoD = dataBatismo;
      }
      if (dataNascimento !== data_nascimentoD && Object.keys(dataNascimento).length !== 0) {
        data_nascimentoD = dataNascimento;
      }

      const data = {
        nome: nomeD,
        cargo: cargoD,
        congregacao: congregacaoD,
        naturalidade: naturalidadeD,
        rg: rgD,
        cpf: cpfD,
        estado_civil: estado_civilD,
        data_batismo: data_batismoD,
        data_nascimento: data_nascimentoD,
        data_membro: data_membroD,
        rua: ruaD,
        numero: numeroD,
        bairro: bairroD,
        cidade: cidadeD
      }
      setIsLoading(true);
      try {
        await api.put(`membro/edit/${id}`, data);
        Modal.success({
          content: 'Membro Editado com Sucesso!!',
          afterClose: () => {
            history.push('/edit');
            setIsLoading(false);
        }
        })
      } catch (error) {
        Modal.error({
          content: `${error}`,
          afterClose: () => {
            history.push('/edit');
            setIsLoading(false);
          }
        })
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
      <Menu style={{background: '#8B0000'}} theme="dark" mode="inline" >
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
                <h1>Editando Dados do Membro...</h1>
            </div>
            <br/>
            <div style={{marginRight: '12.5rem'}}>
            {data.length <= 0 && <p>Carregando...</p>}
            {data.length > 0 && (
              <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                  name={['nome']}
                  label="Nome"
                 
                >
                  <Input defaultValue={`${nomeM}`} />
                </Form.Item>
                <Form.Item
                  label={'Cargo'}
                 
                >
                <Select defaultValue={`${cargoM}`} style={{ width: 190 }} onChange={handleChange}>
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
                 
                >
                  <Select defaultValue={`${congregacaoM}`} style={{ width: 220 }} onChange={handleChange3}>
                    <Option disabled value='congregacao'>Escolha uma Congregação:</Option>
                    {congregacoes.map(res => {
                      return <Option key={res.id} value={res.nome_congregacao}>{res.nome_congregacao}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={['naturalidade']}
                  label="Naturalidade"
                 
                >
                  <Input defaultValue={`${naturalidadeM}`} placeholder='Ex.: Fortaleza - CE' />
                </Form.Item>
                <Form.Item
                  name={['rg']}
                  label="RG"
                  
                >
                  <Input defaultValue={`${rgM}`} />
                </Form.Item>
                <Form.Item
                  name={['cpf']}
                  label="CPF"
                  
                >
                  <Input defaultValue={`${cpfM}`} />
                </Form.Item>
                <Form.Item
                  label={'Estado Civil'}
                 
                >
                <Select defaultValue={`${estado_civilM}`} style={{ width: 190 }} onChange={handleChange2}>
                  <Option disabled value='estado'>Escolha um Estado Civil:</Option>
                  <Option value="Solteiro">Solteiro</Option>
                  <Option value="Casado">Casado</Option>
                  <Option value="Viúvo">Viúvo</Option>
                  <Option value="Divorciado">Divorciado</Option>
                </Select>
                </Form.Item>
                <Form.Item
                  label={'Data de Batismo'}
                 
                >
                  <Space direction="vertical">
                    <DatePicker defaultValue={moment(`${data_batismoM}`, 'DD-MM-YYYY')} format='DD-MM-YYYY' onChange={onChange} />
                  </Space>
                </Form.Item>
                <Form.Item
                  label={'Data de Nascimento'}
                 
                >
                  <Space direction="vertical">
                    <DatePicker defaultValue={moment(`${data_nascimentoM}`, 'DD-MM-YYYY')} format='DD-MM-YYYY' onChange={onChange2} />
                  </Space>
                </Form.Item>
                <Form.Item
                  label={'Data de Aceitação'}
                 
                >
                  <Space direction="vertical">
                    <DatePicker defaultValue={moment(`${data_membroM}`, 'DD-MM-YYYY')} format='DD-MM-YYYY' onChange={onChange3} />
                  </Space>
                </Form.Item>
                <br/>
                <h1>Endereço</h1>
                <br/>
                <Form.Item
                  name={['rua']}
                  label="Rua"
                 
                >
                  <Input defaultValue={`${ruaM}`} />
                </Form.Item>
                <Form.Item
                  name={['numero']}
                  label="Número"
                  
                >
                  <Input defaultValue={`${numeroM}`} />
                </Form.Item>
                <Form.Item
                  name={['bairro']}
                  label="Bairro"
                  
                >
                  <Input defaultValue={`${bairroM}`} />
                </Form.Item>
                <Form.Item
                  name={['cidade']}
                  label="Cidade"
                  
                >
                  <Input defaultValue={`${cidadeM}`} placeholder='Ex.: Fortaleza - CE' />
                </Form.Item>

                
                
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  {isLoading == true
                  ?
                  (<Button loading type="primary" htmlType="submit">
                  Editar
                </Button>)
                  :
                  (<Button type="primary" htmlType="submit">
                  Editar
                </Button>)}
                  
                  <Button style={{marginLeft: '20px'}} type="secundary" onClick={() => {history.push('/edit')}}>
                    Cancelar
                  </Button>
                </Form.Item>
              </Form>
            )}
            </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Assembleia de Deus IADEP ©2021 Created by Cainã Gonçalves</Footer>
    </Layout>
  </Layout>
    );
}

export default EditPage;