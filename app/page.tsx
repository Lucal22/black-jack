"use client";

import Form from "./components/Form";
export default function Home() {
  return (
    <>
      <Form formText="Login" formSubmit="Entrar" />
      <Form formText="Cadastro" formSubmit="Cadastrar" />
    </>
  );
}
