import Image from "next/image";

export function EditorialImage({ className = "", alt, priority = false }: { className?: string; alt: string; priority?: boolean }) {
  return (
    <div className={`editorial-image ${className}`}>
      <Image src="/media/img.jpg" fill sizes="(max-width: 740px) 90vw, (max-width: 1100px) 75vw, 600px" priority={priority} alt={alt} />
    </div>
  );
}
