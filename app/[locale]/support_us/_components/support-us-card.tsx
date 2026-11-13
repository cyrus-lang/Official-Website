import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SupportUsCardType } from "@/content/support-us/type";

export const SupportUsCard = ({
  ...item
}: SupportUsCardType & { index?: number }) => {
  return (
    <Card className="shadow-lg border rounded-2xl h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {item.icon}
          {item.title}
        </CardTitle>
        <CardDescription>{item.desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {item.content}
      </CardContent>
    </Card>
  );
};
