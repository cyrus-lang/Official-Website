import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Heart, Coffee, DollarSign } from "lucide-react"
import Link from "next/link"

export default function SupportUsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Heart className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Support Us</h1>
          <p className="text-xl text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Your support helps us continue our work and make a positive impact. Every contribution, no matter the size,
            makes a difference.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Get in Touch
              </CardTitle>
              <CardDescription>Have questions or want to learn more about our mission?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-muted-foreground">
                  We'd love to hear from you! Reach out to us for more information about our work or how you can get
                  involved.
                </p>
                <div className="p-4 rounded-lg border">
                  <p className="text-sm text-gray-400 mb-2">Email us at:</p>
                  <Link
                    href="mailto:mr.tahadostifam@gmail.com"
                    className="text-black dark:text-white font-medium text-md"
                  >
                    mr.tahadostifam@gmail.com
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
                Make a Donation
              </CardTitle>
              <CardDescription>Support our cause through these trusted platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-muted-foreground">Choose your preferred donation platform to make a secure contribution.</p>

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
                        Donate via PayPal
                      </div>
                    </Button>
                  </Link>

                  {/* Ko-fi Donation Link */}
                  <Link href="https://ko-fi.com" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      <div className="flex items-center justify-center gap-2">
                        <Coffee className="h-4 w-4" />
                        Buy us a Coffee
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
            <CardTitle className="text-center">Why Your Support Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3 mt-2">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Community Impact</h3>
                <p className="text-gray-600 dark:text-muted-foreground text-sm">
                  Your donations help us reach more people and create lasting positive change in our community.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Transparent Use</h3>
                <p className="text-gray-600 dark:text-muted-foreground text-sm">
                  We ensure every dollar is used effectively and provide regular updates on how funds are utilized.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Stay Connected</h3>
                <p className="text-gray-600 dark:text-muted-foreground text-sm">
                  Get updates on our progress and see the direct impact of your generous contributions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-muted-foreground">
            Thank you for considering supporting our mission. Together, we can make a difference!
          </p>
        </div>
      </div>
    </div>
  )
}
