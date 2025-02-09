import Image, { StaticImageData } from "next/image";

interface AdvertisementProps {
  banner: StaticImageData;
}

const Advertisement = ({ banner }: AdvertisementProps) => {
  return (
    <div className="w-full my-4 h-[300px] relative">
      <Image
        src={banner}
        placeholder="blur"
        alt="Advertisement banner"
        layout="intrinsic"
        objectFit="cover"
        height={300} 
        width={1200}
        className="w-full"
      />
    </div>
  );
};

export default Advertisement;
