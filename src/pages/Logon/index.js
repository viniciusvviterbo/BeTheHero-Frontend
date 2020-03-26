import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api'
// Importa o arquivo CSS e o aplica ao objeto HTML retornado
import './styles.css'
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const resp = await api.post('sessao', { id });
            
            // Torna disponível os dados 'id' e 'resp.data.nome' a todo o navegador
            localStorage.setItem('ong_id', id);
            localStorage.setItem('ong_nome', resp.data.nome);
            // Redireciona o usuário para Home
            history.push('/perfil');
        }
        catch (err) {
            alert('Falha no LogIn. Tente novamente.');
        }

    }

    return(
        <div className = 'logon-container'>
            <section className = 'form'>
                <img src = {logoImg} alt = 'Be The Hero' />
                <form onSubmit = {handleLogin} >
                    <h1>Faça seu Logon</h1>
                    <input placeholder = 'Sua ID' value = {id} onChange = {event => setId(event.target.value)}/>
                    <button className = 'button' type = 'submit'>Entrar</button>

                    <Link className = 'back-link' to='/cadastro'>
                        <FiLogIn size = {16} color = '#e02041' />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src = {heroesImg} alt = 'Heroes' />
        </div>
    );
}
