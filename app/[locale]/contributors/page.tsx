import Box from "./box";
import contributors from "@/content/contributors.json";
import { useTranslations } from "next-intl";

export default function ContributorsPage() {
  const t = useTranslations("Contributors");

  return (
    <div className="container sm:px-10 px-3 py-10 flex flex-col gap-5 mb-10">
      <div className="flex flex-col gap-2">
        <div className=" text-4xl font-bold  ">{t("title")}</div>
        <div className="text-lg">{t("subtitle")}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {contributors.map((participant) => (
          <Box key={participant.id} participant={participant} />
        ))}
      </div>
    </div>
  );
}
