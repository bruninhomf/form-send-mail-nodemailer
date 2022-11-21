require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors');

const app = express()

const PORT=process.env.REACT_APP_PORT
const SMTP_PORT=process.env.REACT_APP_SMPT_PORT
const HOST=process.env.REACT_APP_HOST
const USER=process.env.REACT_APP_USER
const PASS=process.env.REACT_APP_PASSWORD

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.post('/api/form/', (req, res) => {

    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        host: HOST,
        port: SMTP_PORT,
        auth: {
          user: USER,
          pass: PASS
        }
    })
    let mailOptions = {}
    
    console.log('mail options', mailOptions)
    
    if (data.name && data.lastName && data.email && data.message) {
        mailOptions = {
            from: data.email,
            to: USER,
            subject: `Mensagem de ${data.name}`,
            html: `
            <h3>Informações do Formulário</h3>
            <ul>
                <li>Name: ${data.name}</li>
                <li>Sobrenome: ${data.lastName}</li>
                <li>E-mail: ${data.email}</li>
            </ul>
            <h3>Mensagem</h3>
            <p>${data.message}</p>
            `
        }
    } else {        
        res.status(400).json({
            erro: true,
            mensagem: "Erro: E-mail não foi enviado!"
        })
    }

    smtpTransport.sendMail(mailOptions, (error) => {
        if(error) {
            console.info("entrou no erro!")
            res.status(400).json({
                erro: true,
                mensagem: "Erro: E-mail não foi enviado!"
            })
        }
        else {
            console.info("Entrou no else");
            res.json({
                erro: false,
                mensagem: "E-mail enviado com sucesso!"
            })
        }
    })

    smtpTransport.close();

})

app.listen(PORT, ()=> {
    console.log(`Sessão iniciada na porta ${PORT}`);
})
