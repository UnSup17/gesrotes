import LateralMenu from "@/app/components/LateralMenu";
import TopNavBar from "@/app/components/topNavBar";
import { getMenuOptions } from "@/app/util/lateralMenuOptions";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const options = getMenuOptions();
  return (
    <main className="flex min-h-screen max-h-screen bg-white">
      <LateralMenu menus={options.menus} />
      <div className="flex flex-col w-full py-8 pr-8">
        <TopNavBar />
        <div className="mt-8 flex flex-col h-full">{children}</div>
      </div>
    </main>
  );
}
