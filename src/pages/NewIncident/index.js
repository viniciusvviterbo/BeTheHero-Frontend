import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const history = useHistory(); 

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    const ong_id = localStorage.getItem('ong_id');

    async function handleNewIncident(event) {
        event.preventDefault();
        
        const dados = {
            titulo,
            descricao,
            valor,
        };

        try {
            await api.post('casos', dados, {
                headers: {
                    Authorization: ong_id,
                }
            });

            history.push('/perfil');
        }
        catch (err) {
            alert('Erro ao cadastrar caso. Tente novamente.');
        }
    }

    return (   
        <div className = 'newincident-container'>
            <div className = 'content'>
                <section>
                    <img src = {logoImg} alt = 'Be The Hero' />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className = 'back-link' to='/perfil'>
                        <FiArrowLeft size = {16} color = '#e02041' />
                        Voltar para Home
                    </Link>
                </section>
                <form>
                    <input placeholder = 'Título do Caso' value = { titulo } onChange = {event => setTitulo(event.target.value) } />
                    <textarea placeholder = 'Descrição' value = { descricao } onChange = {event => setDescricao(event.target.value) } />
                    <input placeholder = 'Valor em reais' value = { valor } onChange = {event => setValor(event.target.value) } />
                    <button className = 'button' type = 'submit' onClick = { handleNewIncident } >Cadastrar</button>
                </form>

            </div>
        </div>
    );
}