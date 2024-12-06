import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
}

export function Avatar({ src, alt, fallback }: AvatarProps) {
  return (
    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
      {src ? (
        <Image
          src={src}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-600 font-medium text-sm">
          {fallback}
        </div>
      )}
    </div>
  );
}
