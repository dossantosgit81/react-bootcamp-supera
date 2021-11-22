import * as Yup from 'yup';

export default Yup.object().shape({
    login: Yup.string().min(11, "A senha conter 11 caracteres").max(11,"A senha conter 11 caracteres"),
    password: Yup.string().min(6, "Senha deve ter ao menos 6").max(16, "senha deve ter no maximo 16 caracteres")
 .matches("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])", "A senha deve conter letras maisculas, minusculas e numeros")
});