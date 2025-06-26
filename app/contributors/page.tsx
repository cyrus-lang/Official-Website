import Image from "next/image";
import Box from "./box";

const MOCK_Participants = [
  {
    id: 1,
    name: "Taha Dostifam",
    title: "Co Founder",
    picture: "/Participants/tahadostifam.jpeg",
    github: "https://github.com/tahadostifam",
    mastodon: "https://mastodon.social/@tahadostifam",
    daramet: "https://daramet.com/tahadostifam",
    telegram: "https://t.me/tahadostifam",
  },
  {
    id: 2,
    name: "Mohammad Kolagar",
    title: "Software Architecture",
    picture: "/Participants/ctirouzh.png",
    github: "https://github.com/ctirouzh",
    mastodon: "",
    daramet: "",
    telegram: "https://t.me/ctirouzh",
  },
  {
    id: 3,
    name: "Amir Rafati",
    title: "Back-End Developer",
    picture: "/Participants/AssassinRobot.jpeg",
    github: "https://github.com/AssassinRobot.jpeg",
    mastodon: "https://mastodon.social/@tahadostifam",
    daramet: "https://daramet.com/tahadostifam",
    telegram: "https://t.me/tahadostifam",
  },
  {
    id: 4,
    name: "Reza TG",
    title: "Back-End Developer",
    picture: "/Participants/rezatg.jpeg",
    github: "https://github.com/rezatg",
    mastodon: "",
    daramet: "",
    telegram: "https://t.me/dll_as",
  },
];
export default function ContributorsPage() {
  return (
    <div className="container sm:px-10 px-3 py-10 flex flex-col gap-5 ">
      <div className="w-[90vw] flex flex-col gap-2">
        <div className=" text-4xl font-bold  ">Team</div>
        <div className="text-lg">Meet the people behind Cyrus</div>
      </div>
      <div className="flex flex-row justify-evenly gap-4 sm:gap-6 flex-wrap">
        {MOCK_Participants.map((participant) => (
          <div key={participant.id} className="w-full sm:w-[330px]  border rounded-2xl pt-5 px-3">
            <Box participant={participant} />
          </div>
        ))}
      </div>
    </div>
  );
}
