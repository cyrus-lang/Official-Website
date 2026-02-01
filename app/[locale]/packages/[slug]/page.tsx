import { setRequestLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { InstallBlock } from "@/components/packages/install-block";

export default async function PackageDetailPage({ params }: { params: Promise<{ locale: string, name: string }> }) {
    const { locale, name } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Packages");
    const isRtl = locale === "fa";

    const pkg = {
        name,
        version: "1.2.4",
        description: "A robust and lightweight package for handling complex operations in Cyrus.",
        author: "Cyrus Core Team",
        license: "MIT",
        dependencies: ["core_lib", "network_utils"],
        installs: "45,201"
    };

    const installCommand = `cyrus add ${pkg.name}`;

    return (
        <main dir={isRtl ? "rtl" : "ltr"} className={`min-h-screen pt-32 pb-20 ${isRtl ? "font-vazir" : ""}`}>
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <h1 className="text-5xl font-bold tracking-tight">{pkg.name}</h1>
                                <Badge variant="secondary" className="rounded-md px-3 py-1 font-mono">
                                    v{pkg.version}
                                </Badge>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {pkg.description}
                            </p>
                        </div>

                        {/* Interactive Install Section */}
                        <InstallBlock 
                            command={installCommand} 
                            isRtl={isRtl} 
                            translations={{
                                label: isRtl ? "دستور نصب" : "Install Command",
                                tooltip: isRtl ? "برای کپی کلیک کنید" : "Click to copy",
                                copied: isRtl ? "کپی شد!" : "Copied!"
                            }}
                        />

                        {/* Documentation Area */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">{isRtl ? "توضیحات" : "Readme"}</h2>
                            <div className="p-8 border rounded-xl bg-card text-muted-foreground min-h-[300px]">
                                <p>Documentation and examples for {pkg.name} would be rendered here from the package manifest.</p>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="rounded-xl border bg-secondary/5 shadow-none p-6">
                            <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-muted-foreground">
                                {isRtl ? "جزئیات" : "Details"}
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between border-b border-border/40 pb-2">
                                    <span className="text-muted-foreground">{t("stats.license")}</span>
                                    <span className="font-medium">{pkg.license}</span>
                                </div>
                                <div className="flex justify-between border-b border-border/40 pb-2">
                                    <span className="text-muted-foreground">{t("stats.downloads")}</span>
                                    <span className="font-medium">{pkg.installs}</span>
                                </div>
                                <div className={`flex justify-between ${isRtl ? "text-right" : "text-left"}`}>
                                    <span className="text-muted-foreground">Author</span>
                                    <span className="font-medium text-primary">{pkg.author}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border">
                                <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-muted-foreground">
                                    {t("dependencies")}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {pkg.dependencies.map(dep => (
                                        <Badge key={dep} variant="outline" className="rounded-sm px-2 py-0">
                                            {dep}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        <Button className="w-full h-12 rounded-lg text-md font-semibold gap-2">
                            {t("documentation")} <ExternalLink size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}