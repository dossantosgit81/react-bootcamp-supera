import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik'
import api from '../services/Api'
import Schema from '../services/Schema'
import FieldInput from '../../components/Field'
import { useState } from 'react'


const mascaraCpf = (value) =>{
    return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function cleanLoginMask(value){
    return value.replace(/[^0-9]/g, '');
}

function Login(){
    
    const [sucesso, setSucesso] = useState(false)
    const [errosServidor, setErrorsServidor] = useState([])
    
    const onSubmit = async (values, actions) => {
        try{
            values.login = cleanLoginMask(loginMask)
            const result = await api.post("auth", values)
            const token = result.data.token
            localStorage.setItem("token", token)
            setSucesso(true)
        }catch(e){
            e.response.data.errors.map(msg =>{
                errosServidor.push(msg)
            })
            // // errosServidor = e.response.data.errors
             console.log(errosServidor)
        }
    }
    const [loginMask, setLoginMask] = useState("");

    function handleMaskInput(e){
        e.target.value = mascaraCpf(e.target.value);
        setLoginMask(e.target.value)
    }

    return ( 
      
        <div>
                 
            <Formik
            onSubmit={onSubmit}
            validationSchema={Schema}
            validateOnMount
            initialValues={
                {
                    login:'',
                    password:''
                }
            }>
            {(values, errors)=>(
                        
                <Form>             
                        <ErrorMessage name="login" />
                        {!sucesso && 
                            errosServidor.map(msgErrors=>{
                                return (
                                    <div>{msgErrors}</div>
                                )
                            })
                        }
                    <div>  
                        <label>CPF*:</label>                  
                        <FieldInput 
                        name="login" 
                        type="text" 
                        onChange={handleMaskInput}
                        value={loginMask}
                    />       
                    </div>
                        <ErrorMessage name="password" />
                    <div>
                        <label>Password*:</label>
                        <Field name="password" type="password"/>
                    </div>
                    <button type="submit">Acessar</button>
                </Form>
            )}
            </Formik>
        </div>
     );
}


export default Login;