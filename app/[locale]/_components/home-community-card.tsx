import { Button } from "@/components/ui/button";
import { HomeCommunityType } from "@/content/home/type";
import { Link } from "@/i18n/navigation";

export const HomeCommunityCard = ({
  index,
  ...item
}: HomeCommunityType & { index: number }) => (
  <div
    className="animate-fade-in bg-background rounded-xl p-6 shadow-xs border text-center transition-all duration-300 relative overflow-hidden"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    {item.icon}
    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
    <p className="text-muted-foreground mb-4">{item.desc}</p>
    <Button variant="outline" className="w-full" asChild>
      <Link
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.button}
      </Link>
    </Button>
  </div>
);
