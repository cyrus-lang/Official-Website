import { setRequestLocale, getTranslations } from "next-intl/server";
import { Box, Download, Clock, ShieldCheck, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// MOCK DATA
const MOCK_PACKAGES = [
  {
    id: "std_http",
    name: "http",
    version: "1.2.4",
    downloads: "45k",
    description: "Standard HTTP client and server implementation for Cyrus with TLS support.",
    updated: "2 days ago"
  },
  {
    id: "json_parser",
    name: "json_ser",
    version: "0.9.1",
    downloads: "12k",
    description: "High-performance JSON serialization and deserialization using zero-copy parsing.",
    updated: "1 week ago"
  },
  {
    id: "cyrus_ui",
    name: "cyrus_ui",
    version: "2.0.0",
    downloads: "8k",
    description: "Native UI toolkit for building cross-platform desktop apps with GPU acceleration.",
    updated: "5 hours ago"
  },
  {
    id: "cyrus_sql",
    name: "sql_driver",
    version: "1.1.0",
    downloads: "22k",
    description: "Unified interface for PostgreSQL, MySQL, and SQLite databases.",
    updated: "3 days ago"
  },
  {
    id: "crypto_core",
    name: "cy_crypto",
    version: "0.5.2",
    downloads: "15k",
    description: "Modern cryptographic primitives including AES-GCM and ChaCha20-Poly1305.",
    updated: "2 weeks ago"
  },
  {
    id: "logger_pro",
    name: "log_fmt",
    version: "1.0.1",
    downloads: "30k",
    description: "Structured logging with support for JSON, console colors, and rotation.",
    updated: "1 month ago"
  },
  {
    id: "async_runtime",
    name: "vortex",
    version: "3.4.0",
    downloads: "50k",
    description: "A high-performance asynchronous runtime for Cyrus based on the M:N scheduler.",
    updated: "1 day ago"
  },
  {
    id: "math_utils",
    name: "num_lib",
    version: "0.8.0",
    downloads: "5k",
    description: "Scientific computing library with support for linear algebra and complex numbers.",
    updated: "6 days ago"
  },
  {
    id: "toml_config",
    name: "toml_parser",
    version: "1.2.0",
    downloads: "10k",
    description: "A lightweight TOML configuration file parser for Cyrus applications.",
    updated: "4 days ago"
  },
  {
    id: "test_runner",
    name: "cy_test",
    version: "2.1.1",
    downloads: "18k",
    description: "Built-in testing framework with mock support and coverage reporting.",
    updated: "12 hours ago"
  },
];

export default async function PackagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Packages");
  const isRtl = locale === "fa";

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen py-10">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-extrabold lg:text-5xl mb-4">
            Cyrus <span className="text-primary">Packages</span>
          </h1>
          <p className="text-muted-foreground max-w-xl">{t("subtitle")}</p>

          <div className="relative w-full max-w-2xl mt-8">
            <Search className={`absolute ${isRtl ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5`} />
            <Input
              placeholder={t("searchPlaceholder")}
              className={`h-14 ${isRtl ? "pr-12" : "pl-12"} rounded-full bg-secondary/20 border-none text-lg shadow-inner focus-visible:ring-2 focus-visible:ring-primary`}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_PACKAGES.map((pkg) => (
            <Link key={pkg.id} href={`/${locale}/packages/${pkg.name}`}>
              <Card className="rounded-md border-border/50 bg-card/50 hover:bg-secondary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                      <Box size={24} />
                    </div>
                    <Badge variant="secondary" className="rounded-full">{pkg.version}</Badge>
                  </div>
                  <CardTitle className="text-2xl mt-4 group-hover:text-primary transition-colors">
                    {pkg.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {pkg.description}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border/40 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download size={14} /> {pkg.downloads}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} /> {pkg.updated}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}