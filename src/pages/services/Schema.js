import * as Yup from 'yup';

export default Yup.object().shape({
    login: Yup.number(),
    password: Yup.string().required("Senha requerida").min(6, "Senha deve ter ao menos 6").max(16, "senha deve ter no maximo 16 caracteres")
});