import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './preview.css';
import Logo from './assets/logo.png';
import api from '../../services/api';

const PreviewPage = () => {
    const {id} = useParams();
    let idUser = id - 1;

    const [id, setId] = useState(null);
    const [nome, setNome] = useState(null);
    const [cargo, setCargo] = useState(null);
    const [congregacao, setCongregacao] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [rg, setRg] = useState(null);
    const [rua, setRua] = useState(null);
    const [numero, setNumero] = useState(null);
    const [bairro, setBairro] = useState(null);
    const [cidade, setCidade] = useState(null);
    const [naturalidade, setNaturalidade] = useState(null);
    const [estadoCivil, setEstadoCivil] = useState(null);
    const [dataBatismo, setDataBatismo] = useState(null);
    const [dataMembro, setDataMembro] = useState(null);
    const [dataNascimento, setDataNascimento] = useState(null);

    useEffect(async () => {
        await api.get(`membro/${id}`).then(res => {
            setId(res.data.id);
            setNome(res.data.nome);
            setCargo(res.data.cargo);
            setCongregacao(res.data.congregacao);
            setCpf(res.data.cpf);
            setRg(res.data.rg);
            setRua(res.data.endereco.rua);
            setNumero(res.data.endereco.numero);
            setBairro(res.data.endereco.bairro);
            setCidade(res.data.endereco.cidade);
            setNaturalidade(res.data.naturalidade);
            setEstadoCivil(res.data.estado_civil);
            setDataBatismo(res.data.data_batismo.dateString);
            setDataMembro(res.data.data_membro.dateString);
            setDataNascimento(res.data.data_nascimento.dateString);
        })
    }, []);

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
                                        <p id='id2'>{id}</p>
                                    </div>
                                </div>
                                <div id='parte2'>
                                    
                                    <div id="linha1">
                                        <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>Nome</p>
                                        <p id='nome2'>{nome}</p>
                                    </div>
                                    <div id="linha2">
                                        <div id="cpf">
                                            <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>CPF</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '20px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{cpf}</p>
                                        </div>
                                        <div id="rg">
                                            <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>RG</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '20px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{rg}</p>
                                        </div>
                                    </div>
                                    <div id="linha3">
                                        <div id="cargo3">
                                            <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>Cargo</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '20px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{cargo}</p>
                                        </div>
                                        <div id="congregacao">
                                            <p style={{color: 'black', fontSize: '23px', marginBottom: '5px'}}>Congregação</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '20px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{congregacao}</p>
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
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{naturalidade}</p>  
                                    </div>
                                    <div id="estadocivil">
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Estado Civil</p>
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{estadoCivil}</p>  
                                    </div>
                                </div>
                                <div id="parte2-2" style={{display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <div id="databatismo">
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Data de Batismo</p>
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{dataBatismo}</p>  
                                    </div>
                                    <div id="datamembro">
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Data de Aceitação</p>
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{dataMembro}</p>  
                                    </div>
                                    <div id="datanascimento">
                                        <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Data de Nascimento</p>
                                        <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{dataNascimento}</p>  
                                    </div>
                                </div>
                                <div id="parte3-2" style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <div id="top" style={{width: '100%'}}>
                                        <p style={{color: 'white', backgroundColor: '#8B0000', fontSize: '23px', marginBottom: '5px'}}>Endereço</p>
                                    </div>
                                    <div id="content" style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                                        <div id="rua">
                                            <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Rua</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{rua}</p>  
                                        </div>
                                        <div id="numero">
                                            <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Número</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{numero}</p>  
                                        </div>
                                        <div id="bairro">
                                            <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Bairro</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{bairro}</p>  
                                        </div>
                                        <div id="cidade">
                                            <p style={{color: 'black', fontSize: '20px', marginBottom: '5px'}}>Cidade</p>
                                            <p style={{marginBottom: '2px', color: 'white', fontSize: '17px', backgroundColor: '#8B0000', borderRadius: '10px', padding: '0px 5px 0px 5px'}}>{cidade}</p>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="footer">
                                <div id="top">
                                    <p style={{color: 'black', marginBottom: 0, marginTop: '25px'}}>________________________</p>
                                </div>
                                <div id="down">
                                    <p style={{color: 'black', fontSize: '17px', marginBottom: 0}}>Ass. Pastor Presidente</p>
                                    <p style={{color: 'black', fontSize: '15px', marginBottom: 0}}>Pastor Fabio Santos</p>
                                </div>
                            </div>
                        </div>
                    </div>
            
                )}
            </header>
        </div>
    );
}

export default PreviewPage;
