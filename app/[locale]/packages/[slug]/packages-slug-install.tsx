import { InstallBlock } from "@/components/packages/install-block";

export function PackageSlugInstall({
  name,
  isRtl,
}: {
  name: string;
  isRtl: boolean;
}) {
  const installCommand = `cyrus add ${name}`;

  return (
    <InstallBlock
      command={installCommand}
      isRtl={isRtl}
      translations={{
        label: isRtl ? "دستور نصب" : "Install Command",
        tooltip: isRtl ? "برای کپی کلیک کنید" : "Click to copy",
        copied: isRtl ? "کپی شد!" : "Copied!",
      }}
    />
  );
}
