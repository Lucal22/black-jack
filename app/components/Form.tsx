"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import handleCadastro from "../services/cadastro";
import handleLogin from "../services/login";
import { JogadorResponse } from "../context/interface";

type FormType = {
  formText: string;
  formSubmit: string;
};

export default function Form({ formText, formSubmit }: FormType) {
  const router = useRouter();

  const [text, setText] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function handleForm(e: React.SubmitEvent) {
    e.preventDefault();
    const r: JogadorResponse =
      formText === "Cadastro"
        ? await handleCadastro(text, senha)
        : await handleLogin(text, senha);

    if (r.id !== -1) {
      router.replace(`/${r.id}`);
    } else {
      setError(r.message);
    }
  }
  return (
    <form onSubmit={handleForm} className="flex flex-col gap-2.5 w-75">
      <h1>{formText}</h1>

      <input
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        type="text"
        placeholder="Usuário"
        name={formText}
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <input
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        type="password"
        placeholder="Senha"
        name={formSubmit}
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <button
        className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition hover:bg-blue-700 active:scale-95"
        type="submit"
      >
        {formSubmit}
      </button>
      {error && (
        <div className="bg-red-500 text-white p-2 rounded">{error}</div>
      )}
    </form>
  );
}
