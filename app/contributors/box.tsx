import Image from "next/image";
import Link from "next/link";

export default function Box({ participant }: { participant: any }) {
  return (
    <div className=" border-1 border-gray-100 rounded-sm flex flex-col gap-2  ">
      <div className="flex flex-col items-start w-full">
        <div className="text-center text-lg font-bold">{participant.name}</div>
        <div className="text-center text-sm text-gray-500">
          {participant.title}
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-[400px] sm:h-[300px] relative ">
        <Image
          src={participant.picture}
          alt={participant.name}
          fill
          className="object-cover object-center relative rounded-lg "
        />
      </div>
      <div className="flex flex-row justify-evenly items-center gap-2 pb-1">
        {
            participant.github && (
                <Link href={participant.github} className="flex justify-center items-center w-10 h-10 ">
                    <Image
                        src={"/participants/github.svg"}
                        alt={participant.name}
                        width={20}
                        height={20}
                        className="object-cover object-center  dark:brightness-100 dark:invert"
                    />
                </Link>
            )
        }
        {
            participant.mastodon && (
                <Link href={participant.mastodon} className="flex justify-center items-center w-10 h-10 ">
                    <Image
                        src={"/participants/mastodon.svg"}
                        alt={participant.name}
                        width={20}
                        height={20}
                        className="object-cover object-center dark:brightness-100 dark:invert"
                    />
                </Link>
            )
        }
        {
            participant.daramet && (
                <Link href={participant.daramet} className="flex justify-center items-center w-10 h-10 ">
                    <Image
                        src={"/participants/daramet.svg"}
                        alt={participant.name}
                        width={20}
                        height={20}
                        className="object-cover object-center dark:brightness-100 dark:invert"
                    />
                </Link>
            )
        }
        {
            participant.telegram && (   
                <Link href={participant.telegram} className="flex justify-center items-center w-10 h-10 ">
                    <Image
                        src={"/participants/telegram.svg"}
                        alt={participant.name}
                        width={20}
                        height={20}
                        className="object-cover object-center dark:brightness-100 dark:invert"
                    />
                </Link>
            )
        }
      </div>
    </div>
  );
}
