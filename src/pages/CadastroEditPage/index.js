import React, { useState, useEffect } from 'react';
import './home.css';
import { Layout, Menu, Table, Input, Button, Space, Divider, ConfigProvider, Descriptions, Modal } from 'antd';
import { TeamOutlined, PieChartOutlined, UserAddOutlined, UserSwitchOutlined, IdcardOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, InboxOutlined } from '@ant-design/icons';
import api from '../../services/api';

const { Header, Content, Footer, Sider } = Layout;
const { confirm } = Modal;

const CadastroEditPage = ({history}) => {
    const keyActive = 4;

    const [data, setData] = useState([]);

    useEffect(() => {
      api.get('/membro').then(res => {
        setData(res.data);
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

    const [selectId, setSelectId] = useState(null);

    const [estado, setEstado] = useState({
      searchText: '',
      searchedColumn: '',
    });

    const [searchInput, setSearchInput] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null || []);

    let id, nome, cargo, congregacao, naturalidade, rg, cpf, estado_civil, data_batismo, data_nascimento, data_membro, rua, numero, bairro, cidade;

    if (selectedMember !== null) {
      selectedMember.map(res => {
        id = res.id;
        nome = res.nome;
        cargo = res.cargo;
        congregacao = res.congregacao;
        naturalidade = res.naturalidade;
        rg = res.rg;
        cpf = res.cpf;
        estado_civil = res.estado_civil;
        data_batismo = res.data_batismo.dateString;
        data_nascimento = res.data_nascimento.dateString;
        data_membro = res.data_membro.dateString;
        rua = res.endereco.rua;
        bairro = res.endereco.bairro;
        numero = res.endereco.numero;
        cidade = res.endereco.cidade;
      })
    }

    const handleDelete = async (id) => {
      confirm({
        title: 'Deseja realmente deletar esse membro?',
        icon: <ExclamationCircleOutlined />,
        content: 'Você está prestes a deletar um membro!!',
        okText: 'Sim',
        okType: 'danger',
        okButtonProps: {
          disabled: false,
        },
        cancelText: 'Não',
        async onOk() {
          try {
            await api.delete(`membro/delete/${id}`);
            Modal.success({
              content: 'Membro Deletado com Sucesso!!',
              afterClose: () => {history.push('/')}
            })
          } catch (error) {
            Modal.error({
              content: `${error}`
            })
          }
        },
        onCancel() {
          return;
        },
      });
    }

    
      const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                setSearchInput(node);
              }}
              placeholder={`Procurar por ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Procurar
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Resetar
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setEstado({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                Filtro
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
          }
        },
        render: text =>
          estado.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[estado.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setEstado({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      const handleReset = clearFilters => {
        clearFilters();
        setEstado({ searchText: '' });
      };
      
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: '5%',
          ...getColumnSearchProps('id'),
        },
        {
          title: 'Nome',
          dataIndex: 'nome',
          key: 'nome',
          width: '30%',
          ...getColumnSearchProps('nome'),
        },
        {
          title: 'Cargo',
          dataIndex: 'cargo',
          key: 'cargo',
          width: '20%',
          ...getColumnSearchProps('cargo'),
        },
        {
          title: 'Congregação',
          dataIndex: 'congregacao',
          key: 'congregacao',
          ...getColumnSearchProps('congregacao'),
        },
      ];

      const [selectionType, setSelectionType] = useState('radio');
      const [customize, setCustomize] = useState(true);
      const [sizeDescription, setSizeDescription] = useState('default');

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setSelectId(selectedRowKeys);
          setSelectedMember(selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };

      const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
          <InboxOutlined style={{ fontSize: 50 }} />
          <p>Nenhum Membro Cadastrado!!</p>
        </div>
      );

    return (
        <Layout style={{minHeight: '100%'}}>
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
                <h1>Editar Dados do Membro</h1>
                <p>Selecione um membro para editar:</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <Divider />
              {data.length > 0 
              ? (<Table 
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }} 
                columns={columns} 
                dataSource={data}
              />) 
              : (<ConfigProvider renderEmpty={customize && customizeRenderEmpty}>
                <Table
                  columns={columns}
                />
              </ConfigProvider>)}
              <Divider />
              <Descriptions
                title="Mais Informações"
                size={sizeDescription}
              >
                <Descriptions.Item label="ID">{id}</Descriptions.Item>
                <Descriptions.Item label="Nome">{nome}</Descriptions.Item>
                <Descriptions.Item label="Cargo">{cargo}</Descriptions.Item>
                <Descriptions.Item label="Congregação">{congregacao}</Descriptions.Item>
                <Descriptions.Item label="Naturalidade">{naturalidade}</Descriptions.Item>
                <Descriptions.Item label="Data de Batismo">{data_batismo}</Descriptions.Item>
                <Descriptions.Item label="Data de Nascimento">{data_nascimento}</Descriptions.Item>
                <Descriptions.Item label="Data de Aceitação">{data_membro}</Descriptions.Item>
                <Descriptions.Item label="RG">{rg}</Descriptions.Item>
                <Descriptions.Item label="CPF">{cpf}</Descriptions.Item>
              </Descriptions>
              <Descriptions
                title="Endereço"
                size={sizeDescription}
              >
                <Descriptions.Item label="Rua">{rua}</Descriptions.Item>
                <Descriptions.Item label="Número">{numero}</Descriptions.Item>
                <Descriptions.Item label="Bairro">{bairro}</Descriptions.Item>
                <Descriptions.Item label="Cidade">{cidade}</Descriptions.Item>
              </Descriptions>
              <Divider />
              <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                
                {selectId == null 
                ? 
                (<Button type="primary" disabled><Link to={`/edit/${selectId}`}>Editar Membro</Link></Button>)
                :
                (<Button type="primary"><Link to={`/edit/${selectId}`}>Editar Membro</Link></Button>)
                }
                {selectId == null 
                ? 
                (<Button danger disabled>Deletar Membro</Button>)
                :
                (<Button danger onClick={() => handleDelete(selectId)}>Deletar Membro</Button>)
                }
                
              </div>
            </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Assembleia de Deus IADEP ©2021 Created by Cainã Gonçalves</Footer>
    </Layout>
  </Layout>
    );
}

export default CadastroEditPage;