import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api'
import './styles.css'
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [casos, setCasos] = useState([]);  
    const history = useHistory();

    // Lê o valor de 'ong_nome' e 'ong_id' do armazenamento local do navegador
    const ong_nome = localStorage.getItem('ong_nome');
    const ong_id = localStorage.getItem('ong_id');
    
    // Dispara a função referenciada no primeiro parâmetro quando algum dos valores presentes no array que é o segundo parâmetro mudarem
    useEffect(() => { 
        api.get('perfil', {
            headers: {
                Authorization: ong_id
            }
        }).then(resp => {
            setCasos(resp.data);
        })
    }, [ong_id]);

    async function handleDeleteCaso(id) {
        try {
            await api.delete(`/casos/${ id }`, {
                headers: {
                    Authorization: ong_id,
                }
            });
            // Atualiza os casos na tela filtrando-os e buscando qual deles foi o recém-deletado para não ser mais exibido
            setCasos(casos.filter(caso => caso.id !== id)); 
        }
        catch (err){
            alert('Erro ao deletar caso. Tente novamente.');
        }
    }

    async function handleLogout() {
        // Limpas os dados locais com a identificação da ONG logada.
        localStorage.clear()
        // Redireciona o usuário para a tela de Login
        history.push('/');
    }

    return (
        <div className = 'profile-container'>
            <header>
                <img src = {logoImg} alt = 'Be The Hero' />
                <span>Bem vindo, { ong_nome }</span>

                <Link className = 'button' to = '/caso/novo'>Cadastrar novo caso</Link>
                <button type = 'button' onClick = { handleLogout }>
                    <FiPower size = {18} color = '#e02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                { 
                    // Percorre cada um dos 'casos' e retorna algo
                    // Quanto ao botão de deleção, o onClick recebe uma função que chama uma função pois, caso recebesse apenas handleDeleteCaso(), a função seria executada assim que o caso carregasse.
                    // Deste novo modo, o botão recebe a função que ele irá executar quando clicado.
                    casos.map(caso => (
                        <li key = { caso.id }>
                            <strong>CASO:</strong>
                            <p>{ caso.titulo }</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{ caso.descricao }</p>

                            <strong>VALOR:</strong>
                            <p>{ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor) }</p>

                            
                            <button type = 'button' onClick = {() => handleDeleteCaso(caso.id)}>
                                <FiTrash2 size = {20} color = '#a8a8b3' />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}