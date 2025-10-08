import { Code, Github } from "lucide-react";
import socialMedia from "@/content/social_media.json";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">{t("brand")}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("description")}</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">{t("sections.resources.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.resources.links.documentation")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.resources.links.tutorials")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.resources.links.examples")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.resources.links.blog")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">{t("sections.community.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={socialMedia.github}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.community.links.github")}
                </Link>
              </li>
              <li>
                <Link
                  href={socialMedia.discord}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.community.links.discord")}
                </Link>
              </li>
              <li>
                <Link
                  href={socialMedia.telegram}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.community.links.telegram")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">{t("sections.legal.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.legal.links.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.legal.links.termsOfService")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.legal.links.license")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.legal.links.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex gap-4">
            <Link
              href={socialMedia.github}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">{t("github")}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
