import { HomeSponsor } from "@/content/home/home-sponsors";
import { Link } from "@/i18n/navigation";

export const HomeSponsorCard = (item: HomeSponsor) => (
  <Link href={item.url} key={item.imageName} target="_blank">
    <div className="animate-fade-in rounded-lg bg-primary-light/20 dark:bg-neutral-600 border-transparent hover:bg-white dark:hover:bg-neutral-500 hover:not-dark:border-primary transition-all duration-300 h-18 flex items-center justify-center shadow-xs">
      <img
        src={"/sponsors/" + item.imageName}
        className="grayscale object-contain w-full h-full"
      />
    </div>
  </Link>
);
