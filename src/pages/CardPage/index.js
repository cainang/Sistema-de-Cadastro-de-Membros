import React, { useState, useEffect } from 'react';
import './home.css';
import { Layout, Menu, Statistic, Table, Input, Button, Space, Divider, ConfigProvider, Descriptions } from 'antd';
import { TeamOutlined, PieChartOutlined, UserAddOutlined, UserSwitchOutlined, IdcardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, InboxOutlined } from '@ant-design/icons';
import api from '../../services/api';
import firebase from 'firebase';

const { Header, Content, Footer, Sider } = Layout;

const CardPage = () => {
    var storage = firebase.storage();

        // Create a reference from a Google Cloud Storage URI
    var gsReference = storage.refFromURL('gs://cad-membros.appspot.com');
    const keyActive = 5;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedsMember, setSelectedsMember] = useState(null || []);

    useEffect(() => {
      api.get('/membro').then(res => {
        setData(res.data);
      })
    }, []);

    const [colapso, setColapso] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState([]);
    let style;

    if (colapso == true) {
      style = {
        marginLeft: 0
      }
    } else {
      style = {marginLeft: 240}
    }

    const [selectId, setSelectId] = useState([]);

    const [estado, setEstado] = useState({
      searchText: '',
      searchedColumn: '',
    });

    const [searchInput, setSearchInput] = useState(null);
    
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

      const [selectionType, setSelectionType] = useState('checkbox');
      const [customize, setCustomize] = useState(true);
      const [sizeDescription, setSizeDescription] = useState('default');

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setSelectId(selectedRows);
          setSelectedsMember(selectedRowKeys);
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

      const handleDownload = async () => {
        setIsLoading(true);

        var dataMembro = {
          membros: selectedsMember
        }

        await api.post('carteira/create', dataMembro).then(res => {
          var repo = res.data;
          for (let index = 0; index < repo.length; index++) {
            gsReference.child(`carteiras/${repo[index]}`).getDownloadURL()
            .then(url => {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', `${url}`, true);
              xhr.responseType = 'blob';
              xhr.onload = function(e) {
                if (this.status == 200) {
                  var myBlob = this.response;
                  const url2 = window.URL.createObjectURL(new Blob([myBlob]));
                  const link = document.createElement('a');
                        link.href = url2;
                        link.setAttribute(
                          'target',
                          `_blank`,
                        );
                        link.setAttribute(
                          'download',
                          `${repo[index]}`
                        );
                    
                        // Append to html link element page
                        document.body.appendChild(link);
                    
                      setTimeout(() => {
                        
                        // Start download
                        link.click();
                        document.body.removeChild(link);
                      }, 2000);
                      
                    setIsLoading(false);
                  // myBlob is now the blob that the object URL pointed to.
                }
              };
              xhr.send();
            });
            
          }
        });

        
      };

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
                <h1>Confeccionar Carteiras de Membro</h1>
                <p>Selecione os membros para confecção:</p>
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
                title="Informações:"
                size={sizeDescription}
              >
                <Descriptions.Item label="Membros Selecionados">{selectId !== null ? selectId.length : 0}</Descriptions.Item>
              </Descriptions>
              <Divider />
              <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                
                {selectId.length == 0
                ? 
                (<Button type="primary" disabled>Confeccionar Carteira</Button>)
                :
                isLoading == true ? (<Button type="primary" loading>Confeccionar Carteira</Button>) : (<Button type="primary" onClick={handleDownload}>Confeccionar Carteira</Button>)
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

export default CardPage;