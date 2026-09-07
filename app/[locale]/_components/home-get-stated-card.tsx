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
    <div
      className="animate-fade-in text-center group p-4 rounded-xl transition-all duration-300 relative overflow-hidden"
      style={{ animationDelay: `${number * 80}ms` }}
    >
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span className="font-bold text-primary">{number}</span>
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
