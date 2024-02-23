import Image from "next/image";
import Link from "next/link";

export interface ILateralMenu {
  menus: {
    menuLabel: string;
    items: {
      iconRoute: string;
      itemLabel: string;
      redirectUrl: string;
    }[];
  }[];
}
export default function LateralMenu({ menus }: ILateralMenu) {
  return (
    <div className="w-3/12 hidden sm:block p-8">
      <div className="bg-[#F7F7F7] h-full rounded-3xl">
        <p className="font-semibold text-center py-5 px-3 border-b-2 mb-10">
          SISTEMA DE PLANEACIÓN DE PRÁCTICAS
        </p>
        <div className="flex flex-col gap-5">
          {menus &&
            menus.map((menu, index) => (
              <section key={index} className="py-4 px-4 flex flex-col gap-5">
                <label className="font-semibold">{menu.menuLabel}</label>
                {menu.items.map((item) => (
                  <Link
                    key={item.itemLabel}
                    href={item.redirectUrl}
                    className="flex items-center gap-2 p-2 hover:bg-[#EEEEEE]"
                  >
                    <Image
                      src={item.iconRoute}
                      width={30}
                      height={30}
                      alt={`image_${item.itemLabel}`}
                    />
                    <p>{item.itemLabel}</p>
                  </Link>
                ))}
              </section>
            ))}
        </div>
      </div>
    </div>
  );
}
