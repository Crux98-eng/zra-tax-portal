import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus } from "lucide-react";
import Header from "@/components/layout/Header";
  
const ReturnListPage = () => {
const naviagation = useNavigate();
  const returns = [
    { id: 1, type: "VAT Return", period: "Q4 2024", status: "Filed", amount: "ZMW 15,000", dueDate: "2025-01-21", filedDate: "2025-01-15" },
    { id: 2, type: "PAYE Return", period: "December 2024", status: "Filed", amount: "ZMW 8,500", dueDate: "2025-01-14", filedDate: "2025-01-10" },
    { id: 3, type: "VAT Return", period: "Q3 2024", status: "Filed", amount: "ZMW 12,800", dueDate: "2024-10-21", filedDate: "2024-10-18" },
    { id: 4, type: "Income Tax", period: "2024", status: "Pending", amount: "TBD", dueDate: "2025-04-30", filedDate: null },
    { id: 5, type: "PAYE Return", period: "November 2024", status: "Filed", amount: "ZMW 8,200", dueDate: "2024-12-14", filedDate: "2024-12-10" },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tax Returns</h1>
            <p className="text-muted-foreground">Manage and file your tax returns</p>
          </div>
          <Button asChild size="lg">
            <Link to="/fileReturnPage">
              <Plus className="h-5 w-5 mr-2" />
              File New Return
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Returns</CardTitle>
            <CardDescription>View your tax return filing history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {returns.map((ret) => (
                <div key={ret.id} className="flex items-center justify-between border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{ret.type}</p>
                      <p className="text-sm text-muted-foreground">{ret.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">{ret.amount}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium">{ret.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={ret.status === "Filed" ? "default" : "secondary"}>
                        {ret.status}
                      </Badge>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/returns/${ret.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReturnListPage;
