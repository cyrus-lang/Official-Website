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

export default function SupportUsPage() {
  const t = useTranslations("SupportUs");

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Heart className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                {t("contact.title")}
              </CardTitle>
              <CardDescription>{t("contact.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-muted-foreground">
                  {t("contact.content")}
                </p>
                <div className="p-4 rounded-lg border">
                  <p className="text-sm text-gray-400 mb-2">
                    {t("contact.emailLabel")}
                  </p>
                  <Link
                    href="mailto:mr.tahadostifam@gmail.com"
                    className="text-black dark:text-white font-medium text-md"
                  >
                    {t("contact.email")}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation Links Card */}
          <Card className="shadow-lg d-flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                {t("donation.title")}
              </CardTitle>
              <CardDescription>{t("donation.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-muted-foreground">
                  {t("donation.content")}
                </p>

                <div className="space-y-3">
                  {/* PayPal Donation Link */}
                  <Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <div className="flex items-center justify-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        {t("donation.paypal")}
                      </div>
                    </Button>
                  </Link>

                  {/* Ko-fi Donation Link */}
                  <Link
                    href="https://ko-fi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      <div className="flex items-center justify-center gap-2">
                        <Coffee className="h-4 w-4" />
                        {t("donation.kofi")}
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information Section */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">
              {t("whySupport.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3 mt-2">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-black dark:text-white mb-2">
                  {t("whySupport.communityImpact.title")}
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground text-sm">
                  {t("whySupport.communityImpact.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-black dark:text-white mb-2">
                  {t("whySupport.transparentUse.title")}
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground text-sm">
                  {t("whySupport.transparentUse.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-black dark:text-white mb-2">
                  {t("whySupport.stayConnected.title")}
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground text-sm">
                  {t("whySupport.stayConnected.description")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-muted-foreground">
            {t("footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
