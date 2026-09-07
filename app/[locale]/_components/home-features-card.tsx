import { HomeFeatureType } from "@/content/home/type";

export const HomeFeaturesCard = ({
  index,
  ...item
}: HomeFeatureType & { index: number }) => (
  <div
    className="animate-fade-in bg-background rounded-xl p-6 shadow-xs border transition-all duration-300 relative overflow-hidden"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      {item.icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
    <p className="text-muted-foreground">{item.desc}</p>
  </div>
);
