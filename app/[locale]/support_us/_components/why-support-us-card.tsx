import { WhySupportUsItemType } from "@/content/support-us/type";

export const WhySupportUsItem = ({
  ...item
}: WhySupportUsItemType & { index?: number }) => {
  return (
    <div className="text-center p-3 rounded-xl">
      <div
        className={`${item.bg} rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center`}
      >
        {item.icon}
      </div>
      <h3 className="font-semibold text-black dark:text-white mb-2">
        {item.title}
      </h3>
      <p className="text-gray-600 dark:text-muted-foreground text-sm">
        {item.desc}
      </p>
    </div>
  );
};
