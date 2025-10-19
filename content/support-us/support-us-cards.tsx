import { Translation } from "@/types/translation";
import { Motion } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import { Coffee, DollarSign, Mail } from "lucide-react";
import { SupportUsCardType } from "./type";
import { Button } from "@/components/ui/button";

export const supportUsCardsArray = (t: Translation): SupportUsCardType[] => [
  {
    icon: <Mail className="h-5 w-5 text-blue-600" />,
    title: t("contact.title"),
    desc: t("contact.description"),
    content: (
      <>
        <p className="text-gray-600 dark:text-muted-foreground">
          {t("contact.content")}
        </p>
        <div className="p-4 rounded-lg border mt-4">
          <p className="text-sm text-gray-400 mb-2">
            {t("contact.emailLabel")}
          </p>
          <Link
            href="mailto:mr.tahadostifam@gmail.com"
            className="text-black dark:text-white font-medium text-md hover:underline"
          >
            {t("contact.email")}
          </Link>
        </div>
      </>
    ),
  },
  {
    icon: <DollarSign className="h-5 w-5 text-green-600" />,
    title: t("donation.title"),
    desc: t("donation.description"),
    content: (
      <>
        <p className="text-gray-600 dark:text-muted-foreground">
          {t("donation.content")}
        </p>
        <div className="space-y-3 mt-4">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Motion
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
            >
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  {t("donation.paypal")}
                </div>
              </Button>
            </Motion>
          </Link>

          <Link
            href="https://ko-fi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Motion
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
            >
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <div className="flex items-center justify-center gap-2">
                  <Coffee className="h-4 w-4" />
                  {t("donation.kofi")}
                </div>
              </Button>
            </Motion>
          </Link>
        </div>
      </>
    ),
  },
];
