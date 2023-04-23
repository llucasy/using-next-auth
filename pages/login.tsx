import { useState, FormEventHandler } from 'react';
import { signIn } from 'next-auth/react';
import router from 'next/router';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      name: username,
      password: password,
      redirect: false,
      callbackUrl: '/',
    })

    if (res?.error) setError(res.error);
    if (res?.url) router.push(res.url);

    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className='m-auto w-1/3 p-4 mt-52 bg-violet-950 rounded-md'>
      <div className="mb-4">
        <label className="block text-white font-bold mb-2" htmlFor="username">
          Nome de usuário
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          id="username"
          type="text"
          placeholder="Digite seu nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-2" htmlFor="password">
          Senha
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          id="password"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && (
        <div className="mb-4 text-red-500">{error}</div>
      )}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Entrar
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Esqueceu a senha?
        </a>
      </div>
    </form>
  );
}


