import React, { useState } from 'react'
import axios from 'axios'


const Form = () => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [send, setSend] = useState(null)
    const [load, setLoad] = useState(false)

    function formSubmit(e) {
        e.preventDefault();
        let data = {
            name: name,
            lastName: lastName,
            email: email,
            message: message
        }

        if (name && lastName && email && message) {

            console.log('Entrou na condição')
            axios.post('/api/form/', data)
            .then(res => {
                setSend(true)
                resetForm()
                console.log('resposta/Sucesso', res)
            })
            .catch((error) => {
                setSend(false)
                console.log('Error:', error.stack)
                resetForm()
            })
        } else {
            setLoad(false)
            console.log('entrou no else')
        }
    }

    // form reseting initial data
    function resetForm() {
        setName('')
        setLastName('')
        setEmail('')
        setMessage('')
        setLoad(false)

        setTimeout(()=>{
            setSend(null)
        },4000)
    }

    function loading() {
        setLoad(true)
    }

    return (
        <div className='container'>
            <form onSubmit={formSubmit}>
                {/* single item */}
                <div className='singleItem'>
                    <label htmlFor='name'>Nome</label>
                    <input 
                        type='text'
                        name='name'
                        className='name'
                        placeholder='Seu nome...'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                {/* end of single item */}

                {/* single item */}
                <div className='singleItem'>
                    <label htmlFor='lastname'>Sobrenome</label>
                    <input 
                        type='text' 
                        name='lastname'
                        className='lastname'
                        placeholder='Seu sobrenome...'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                {/* end of single item */}

                {/* single item */}
                <div className='singleItem'>
                    <label htmlFor='email'>E-mail</label>
                    <input 
                        type='text'
                        name='email'
                        className='email'
                        placeholder='Seu e-mail...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                {/* end of single item */}

                {/* single item */}
                <div className='singleItem'>
                    <label htmlFor='message'>Mensagem</label>
                    <textarea
                        name='message'
                        id=''
                        cols='30'
                        rows='5'
                        placeholder='Sua mensagem...'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    >
                    </textarea>
                </div>
                {/* end of single item */}

                { load !== false ?
                <div className={load === true ? 'modal block' : 'modal'}>
                    <div className='container'>
                        <div className='loader'></div>
                        <p>Enviando...</p>
                    </div>
                </div>
                : 
                <></>
                }

                {send !== null ?
                <>
                    <div className={send === true ? 'modal msgSuccess block' : 'modal msgSuccess'}>
                        <div className='container'>
                            <p>
                                Mensagem enviada com sucesso!
                            </p>
                        </div>
                    </div>
                    <div className={send === false ? 'modal msgError block' : 'modal msgError'}>
                        <div className='container'>
                            <p>
                                Falha ao enviar mensagem!
                            </p>
                        </div>
                    </div>
                </>
                :
                <></>}
                <div className='btn'>
                    <button type='submit' onClick={loading}>
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form