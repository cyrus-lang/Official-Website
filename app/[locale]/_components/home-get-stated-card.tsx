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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: number * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="text-center group p-4 rounded-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
    >
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span className="font-bold text-primary">{number}</span>
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </Motion>
  );
}
