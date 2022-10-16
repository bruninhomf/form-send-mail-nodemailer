import React, { useState } from 'react'
import axios from 'axios'


const Form = () => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [sent, setSent] = useState(false)

    function formSubmit(e) {
        e.preventDefault();
        let data = {
            name: name,
            lastName: lastName,
            email: email,
            message: message
        }

        axios.post('/api/forma', data)
        .then(res => {
            setSent(true)
            resetForm()
            console.log('resposta/Sucesso', res);
        })
        .catch((error) => {
            console.log('menssagem não enviada', error);
        })
    }

    // form reseting initial data
    function resetForm() {
        setName('')
        setLastName('')
        setEmail('')
        setMessage('')

        setTimeout(()=>{
            setSent(false)
        },3000)
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

                <div className={sent ? 'msg msgAppear' : 'msg'}>
                    Mensagem enviada com sucesso!
                </div>
                <div className='btn'>
                    <button type='submit'>
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form