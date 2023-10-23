import Image from "next/image";
export const CardFront = ({
  item,
}: {
  item: { title: string; image: string };
}) => {
  return (
    <div className="p-0 lg:px-4 h-full bg-white rounded-card shadow-lg border-2  flex flex-row items-center justify-center ">
      <div className="max-w-[80%] w-full object-contain  ">
        <Image
          src={item.image}
          alt={item.title}
          width={500}
          height={500}
          fill={false}
          className="w-full h-full  object-contain"
        />
      </div>
    </div>
  );
};
