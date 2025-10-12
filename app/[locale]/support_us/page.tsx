import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Mail, Heart, Coffee, DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import { Motion } from "@/components/motion";

export default function SupportUsPage() {
  const t = useTranslations("SupportUs");

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <Motion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <Heart className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </Motion>

        {/* Cards Section */}
        <div className="grid gap-8 md:grid-cols-2">
          {[
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
                    <Link href="#" target="_blank" rel="noopener noreferrer" className="block">
                      <Motion whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}>
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
                      <Motion whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}>
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
          ].map((item, i) => (
            <Motion
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
            >
              <Card className="shadow-lg border rounded-2xl transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>{item.content}</CardContent>
              </Card>
            </Motion>
          ))}
        </div>

        {/* Why Support Section */}
        <Motion
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="mt-8 shadow-lg border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-center">
                {t("whySupport.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3 mt-2">
                {[
                  {
                    icon: <Heart className="h-6 w-6 text-blue-600" />,
                    bg: "bg-blue-100",
                    title: t("whySupport.communityImpact.title"),
                    desc: t("whySupport.communityImpact.description"),
                  },
                  {
                    icon: <DollarSign className="h-6 w-6 text-green-600" />,
                    bg: "bg-green-100",
                    title: t("whySupport.transparentUse.title"),
                    desc: t("whySupport.transparentUse.description"),
                  },
                  {
                    icon: <Mail className="h-6 w-6 text-purple-600" />,
                    bg: "bg-purple-100",
                    title: t("whySupport.stayConnected.title"),
                    desc: t("whySupport.stayConnected.description"),
                  },
                ].map((card, i) => (
                  <Motion
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                    className="text-center p-3 rounded-xl transition-all duration-200"
                  >
                    <div
                      className={`${card.bg} rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="font-semibold text-black dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-muted-foreground text-sm">
                      {card.desc}
                    </p>
                  </Motion>
                ))}
              </div>
            </CardContent>
          </Card>
        </Motion>

        {/* Footer */}
        <Motion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-muted-foreground">
            {t("footer")}
          </p>
        </Motion>
      </div>
    </div>
  );
}
