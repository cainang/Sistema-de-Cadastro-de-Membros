import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './preview.css';
import Logo from './assets/logo.png';
import api from '../../services/api';

const PreviewPage = () => {
    const {id} = useParams();
    let idUser = id - 1;

    const [data, setData] = useState([])

    useEffect(async () => {
        await api.get('membro').then(res => {
            setData(res.data);
        })
    }, []);

    const ids = [...data.map(res => res.id)];
    const nomes = [...data.map(res => res.nome)];
    const cargos = [...data.map(res => res.cargo)];
    const congregacoes = [...data.map(res => res.congregacao)];
    const cpfs = [...data.map(res => res.cpf)];
    const rgs = [...data.map(res => res.rg)];
    const ruas = [...data.map(res => res.endereco.rua)];
    const numeros = [...data.map(res => res.endereco.numero)];
    const bairros = [...data.map(res => res.endereco.bairro)];
    const cidades = [...data.map(res => res.endereco.cidade)];
    const naturalidades = [...data.map(res => res.naturalidade)];
    const estado_civils = [...data.map(res => res.estado_civil)];
    const data_batismos = [...data.map(res => res.data_batismo.dateString)];
    const data_membros = [...data.map(res => res.data_membro.dateString)];
    const data_nascimentos = [...data.map(res => res.data_nascimento.dateString)];

    return (
        <div className="App">
            <header className="App-header">
                {data.length !== 0 && (
                    <div id='card'>
                        <div id='carteirinha2'>
                            <div id="cabeca">
                                <img style={{width: '300px', height: '75px', marginBottom: '17px', marginTop: '17px'}} src={Logo} alt=""/>
                                <p style={{backgroundColor: '#8B0000', color: 'white'}}>Carteira de Membro</p>
                            </div>
                            <div id="corpo">
                                <div id='parte1'>
                                    <div id="foto" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', border: '#8B0000 solid 1px'}}></div>
                                    <div>
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>ID</p>
                                        <p id='id2'>{ids[idUser]}</p>
                                    </div>
                                </div>
                                <div id='parte2'>
                                    
                                    <div id="linha1">
                                        <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>Nome</p>
                                        <p id='nome2'>{nomes[idUser]}</p>
                                    </div>
                                    <div id="linha2">
                                        <div id="cpf">
                                            <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>CPF</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '20px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{cpfs[idUser]}</p>
                                        </div>
                                        <div id="rg">
                                            <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>RG</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '20px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{rgs[idUser]}</p>
                                        </div>
                                    </div>
                                    <div id="linha3">
                                        <div id="cargo3">
                                            <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>Cargo</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '20px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{cargos[idUser]}</p>
                                        </div>
                                        <div id="congregacao">
                                            <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>Congregação</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '20px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{congregacoes[idUser]}</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div id='carteirinha3'>
                            <div id="corpo2">
                                <div id="parte1-2" style={{display: 'flex', marginTop: '10px', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <div id="naturalidade">
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Naturalidade</p>
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{naturalidades[idUser]}</p>  
                                    </div>
                                    <div id="estadocivil">
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Estado Civil</p>
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{estado_civils[idUser]}</p>  
                                    </div>
                                </div>
                                <div id="parte2-2" style={{display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <div id="databatismo">
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Data de Batismo</p>
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{data_batismos[idUser]}</p>  
                                    </div>
                                    <div id="datamembro">
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Data de Aceitação</p>
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{data_membros[idUser]}</p>  
                                    </div>
                                    <div id="datanascimento">
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Data de Nascimento</p>
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{data_nascimentos[idUser]}</p>  
                                    </div>
                                </div>
                                <div id="parte3-2" style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <div id="top" style={{width: '100%'}}>
                                        <p style={{color: 'white', backgroundColor: '#8B0000', fontSize: '23px', marginBottom: '5px'}}>Endereço</p>
                                    </div>
                                    <div id="content" style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                                        <div id="rua">
                                            <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Rua</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{ruas[idUser]}</p>  
                                        </div>
                                        <div id="numero">
                                            <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Número</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{numeros[idUser]}</p>  
                                        </div>
                                        <div id="bairro">
                                            <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Bairro</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{bairros[idUser]}</p>  
                                        </div>
                                        <div id="cidade">
                                            <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Cidade</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{cidades[idUser]}</p>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="footer">

                            </div>
                        </div>
                    </div>
            
                )}
            </header>
        </div>
    );
}

export default PreviewPage;