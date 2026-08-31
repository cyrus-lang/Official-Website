import { Motion } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { HomeCommunityType } from "@/content/home/type";
import { Link } from "@/i18n/navigation";

export const HomeCommunityCard = ({
  index,
  ...item
}: HomeCommunityType & { index: number }) => (
  <Motion
    key={index}
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1]
    }}
    className="bg-background rounded-xl p-6 shadow-xs border text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
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
  </Motion>
);
