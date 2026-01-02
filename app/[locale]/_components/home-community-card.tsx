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
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="bg-background rounded-lg p-6 shadow-xs border text-center hover:scale-[107.5%] transition-transform"
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
  </Motion>
);
