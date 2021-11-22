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

function Login(){

    const onSubmit = async (values, actions) => {
        try{
            console.log(teste)
             const result = await api.post("auth", values)
            console.log(result)
            
        }catch(e){
            console.log(e.request)
        }
    }
    const [teste, setTeste] = useState("");
    function handleMaskInput(e){
        e.target.value = mascaraCpf(e.target.value);
        setTeste(e.target.value)

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
                    <div>
                       
                        <FieldInput 
                        name="login" 
                        type="text" 
                        onChange={handleMaskInput}
                        value={teste}/>       
                        <ErrorMessage name="login" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <Field name="password" type="password"/>
                        <ErrorMessage name="password" />
                    </div>
                    <button type="submit">Acessar</button>
                </Form>
            )}
            </Formik>
        </div>
     );
}


export default Login;