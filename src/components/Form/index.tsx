import React from 'react';
import { Button } from '../Button';
import { ControlledInput } from '../ControlledInput';
import { Container } from './styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const schema = yup.object({
  name: yup.string().required("Informe o seu nome"),
  email: yup.string().email("E-mail inválido").required("Informe o e-mail"),
  password: yup.string().min(6, "A senha deve ter ao menos 6 digítos").required("Informe a senha"),
  passwordConfirm: yup.string().oneOf([yup.ref('password')], 'A senha de confirmação não condiz com a senha')
})

export function Form() {


  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  function handleUserRegister(data: FormData) {
    console.log(data )
  }

  
  return (
    <Container>
      <ControlledInput
        name="name"
        control={control}
        icon="user"
        placeholder="Nome"
      />
      <ControlledInput
        icon="mail"
        name="email"
        control={control}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
      />
      <ControlledInput
        name="senha"
        control={control}
        icon="lock"
        placeholder="Senha"
        secureTextEntry
      />
      <ControlledInput
        name="confirm password"
        control={control}
        icon="lock"
        placeholder="Confirme a senha"
        secureTextEntry
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}