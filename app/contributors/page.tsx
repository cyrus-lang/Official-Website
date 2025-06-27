import Image from "next/image";
import Box from "./box";
import contributors  from "@/content/contributors.json";

export default function ContributorsPage() {
  return (
    <div className="container sm:px-10 px-3 py-10 flex flex-col gap-5 ">
      <div className="flex flex-col gap-2">
        <div className=" text-4xl font-bold  ">Team</div>
        <div className="text-lg">Meet the people behind Cyrus</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {contributors .map((participant) => (
          <div key={participant.id} className="border rounded-2xl pt-5 px-3">
            <Box participant={participant} />
          </div>
        ))}
      </div>
    </div>
  );
}
