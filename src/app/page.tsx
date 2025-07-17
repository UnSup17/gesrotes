"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <div className="border-4 border-slate-500 rounded-xl bg-neutral-200 p-14 flex flex-col">
        <form className="flex flex-col gap-4">
          <p className="text-center font-bold">Inicio de sesión</p>
          <div className="flex flex-col italic">
            <label htmlFor="username">Usuario</label>
            <input id="username" type="text" />
          </div>
          <div className="flex flex-col italic">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" />
          </div>
          <div className="text-center">
            <Link
              href="/home"
              className="bg-emerald-700 rounded-md px-4 py-2 text-white"
            >
              Entrar
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
