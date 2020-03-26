import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(event) {
        // Evita que o comportamente padrão do envio de formulários (que é o recarregamento da página) ocorra.
        event.preventDefault();

        const dados = {
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        };

        try {
            // Executa o request da API com endereço '/ongs' e parâmtros (automaticamente enviados como JSON) 'dados'. A response é armazenada em 'resp'
            const resp = await api.post('ongs', dados);
            // Informa o  ID gerado à ONG registrada 
            alert(`Seu ID de acesso: ${resp.data.id}`);
            // Redireciona o usuário para a página de Logon
            history.push('/');
        }
        catch (err) {
            alert('Erro no cadastro. Tente novamente.');
        }
    }

    return (    
        <div className = 'register-container'>
            <div className = 'content'>
                <section>
                    <img src = {logoImg} alt = 'Be The Hero' />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

                    <Link className = 'back-link' to='/'>
                        <FiArrowLeft size = {16} color = '#e02041' />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit = {handleRegister}>
                    <input placeholder = 'Nome da ONG' value = {nome} onChange = { event => setNome(event.target.value)} />
                    <input type = 'email' placeholder = 'E-mail' value = {email} onChange = { event => setEmail(event.target.value)}/>
                    <input placeholder = 'Whatsapp' value = {whatsapp} onChange = { event => setWhatsapp(event.target.value)} />
                    <div className = 'input-group'>
                        <input placeholder = 'Cidade' value = {cidade} onChange = { event => setCidade(event.target.value)} />
                        <input placeholder = 'UF' style = {{width: 80}} value = {uf} onChange = { event => setUf(event.target.value)} />
                    </div>
                    <button className = 'button' type = 'submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}