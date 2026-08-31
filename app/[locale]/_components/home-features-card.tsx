import { Motion } from "@/components/motion";
import { HomeFeatureType } from "@/content/home/type";

export const HomeFeaturesCard = ({
  index,
  ...item
}: HomeFeatureType & { index: number }) => (
  <Motion
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    className="bg-background rounded-xl p-6 shadow-xs border hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden"
  >
    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      {item.icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
    <p className="text-muted-foreground">{item.desc}</p>
  </Motion>
);
