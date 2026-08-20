import { Motion } from "@/components/motion";

interface HomeGetStartedCardProps {
  number: number;
  title: string;
  desc: string;
}

export function HomeGetStartedCard({
  number,
  title,
  desc,
}: HomeGetStartedCardProps) {
  return (
    <Motion
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3 }}
      className="text-center hover:scale-[107.5%] transition-transform"
    >
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span className="font-bold text-primary">{number}</span>
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </Motion>
  );
}
