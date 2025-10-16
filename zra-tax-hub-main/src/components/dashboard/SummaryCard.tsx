import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const SummaryCard = ({ title, value, description, icon: Icon, trend }: SummaryCardProps) => {
  return (
    <Card className="glass-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold gradient-text">{value}</div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="mt-3 flex items-center text-sm">
            <span className={`font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
            <span className="text-muted-foreground ml-2">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
