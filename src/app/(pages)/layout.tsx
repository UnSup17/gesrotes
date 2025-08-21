import LateralMenu from "@/app/components/LateralMenu";
import TopNavBar from "@/app/components/topNavBar";
import { getMenuOptions } from "@/app/util/lateralMenuOptions";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const options = getMenuOptions();

  return (
    <main className="flex min-h-screen max-h-screen bg-white">
      <Suspense fallback={<div className="w-64">Cargando menú…</div>}>
        <LateralMenu menus={options.menus} />
      </Suspense>

      <div className="flex flex-col w-full py-8 pr-8">
        <Suspense fallback={<div>…</div>}>
          <TopNavBar />
        </Suspense>

        <div className="mt-8 flex flex-col h-full">{children}</div>
      </div>
    </main>
  );
}
