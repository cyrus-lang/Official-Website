import { Motion } from "@/components/motion";
import { HomeSponsor } from "@/content/home/home-sponsors";
import { Link } from "@/i18n/navigation";

export const HomeSponsorCard = (item: HomeSponsor) => (
  <Link href={item.url} key={item.imageName} target="_blank">
    <Motion
      className="rounded-lg bg-primary-light/20 dark:bg-neutral-600 border-transparent hover:bg-white dark:hover:bg-neutral-500 hover:not-dark:border-primary transition-all duration-300 h-18 flex items-center justify-center shadow-xs"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={"/sponsors/" + item.imageName}
        className="grayscale object-contain w-full h-full"
      />
    </Motion>
  </Link>
);
