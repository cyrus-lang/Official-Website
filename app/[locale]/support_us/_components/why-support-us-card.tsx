import { Motion } from "@/components/motion";
import { WhySupportUsItemType } from "@/content/support-us/type";

export const WhySupportUsItem = ({
  index,
  ...item
}: WhySupportUsItemType & { index: number }) => {
  return (
    <Motion
      key={"why-support-us-item-" + index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
      className="text-center p-3 rounded-xl transition-all duration-200"
    >
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
    </Motion>
  );
};
