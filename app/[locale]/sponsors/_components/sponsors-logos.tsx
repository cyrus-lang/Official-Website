type SponsorLogo = { name: string; logo: string; url?: string };

export const SponsorsLogos = ({ logos }: { logos: SponsorLogo[] }) => {
  if (!logos.length) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {logos.map(({ name, logo, url }) => {
        const image = (
          <div className="rounded-lg bg-primary-light/20 dark:bg-neutral-600 h-18 w-18 flex items-center justify-center shadow-xs">
            <img
              src={"/sponsors/" + logo}
              alt={name}
              title={name}
              className="grayscale object-contain w-full h-full"
            />
          </div>
        );

        return url ? (
          <a key={name} href={url} target="_blank" rel="noopener noreferrer">
            {image}
          </a>
        ) : (
          <div key={name}>{image}</div>
        );
      })}
    </div>
  );
};
