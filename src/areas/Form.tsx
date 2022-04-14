import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

/* SCSS */
import "../sass/Form.scss";

const Form: React.FC = () => {
    type FormInputs = {  // Defino esse TYPE para passar como parâmetro pro 'useForm'
        // Defino os inputs que eu terei
        firstName: string,
        email: string,
        password: string,
    }

    const { register, handleSubmit } = useForm<FormInputs>({
        mode: 'onSubmit',
    })

    // Função que é acionada quando eu dou um submit no Formulário
    const onSubmit: SubmitHandler<FormInputs> = data => {
        axios.post('/auth/client', data).then(response => {
            console.log('Deu certo!')
        }).catch(err => {
            console.log("Algo deu errado")
            console.log(err)
        });
    }

    return (
        <form className='main-form' onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <legend>Nomes</legend>

                <label htmlFor="name">Nome:</label>
                <input id="name" {...register("firstName", {
                    required: true,
                })} />

                <label htmlFor="email">E-mail:</label>
                <input id="email" type="email" {...register("email", {
                    required: true,
                })} />

                <label htmlFor="password">Password:</label>
                <input id="password" type="password" {...register("password", {
                    required: true,
                })} />
            </fieldset>
            <button type='submit'>ENVIAR</button>
        </form>
    );
}

export default Form;