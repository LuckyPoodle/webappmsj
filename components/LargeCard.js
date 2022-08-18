import Image from "next/image";
import Link from "next/link"

function LargeCard({ img, title, description, buttonText }) {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[300px]">
        <Image
          src={img}
          layout="fill"
          className="rounded-2xl"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-32 left-12">
        <h3 className="text-4xl text-white mb-3 w-64">{title}</h3>
        <p className="text-white mb-5"> {description}</p>

        {/* <Link href={'/login'}>
        <a className="text-sm  text-white bg-gray-900 rounded-lg px-4 py-2">
          {buttonText}
        </a>
        </Link> */}
      </div>
    </section>
  );
}

export default LargeCard;
