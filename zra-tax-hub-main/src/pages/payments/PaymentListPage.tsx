import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download } from "lucide-react";
import Header from "@/components/layout/Header";

const PaymentListPage = () => {
  const payments = [
    { id: 1, type: "VAT Payment", amount: "ZMW 15,000", status: "Completed", date: "2025-01-15", reference: "PAY-2025-001" },
    { id: 2, type: "PAYE Payment", amount: "ZMW 8,500", status: "Completed", date: "2025-01-10", reference: "PAY-2025-002" },
    { id: 3, type: "VAT Payment", amount: "ZMW 12,800", status: "Completed", date: "2024-10-18", reference: "PAY-2024-089" },
    { id: 4, type: "PAYE Payment", amount: "ZMW 8,200", status: "Completed", date: "2024-12-10", reference: "PAY-2024-102" },
    { id: 5, type: "Income Tax Payment", amount: "ZMW 25,000", status: "Pending", date: "2024-11-15", reference: "PAY-2024-095" },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payments</h1>
          <p className="text-muted-foreground">View your tax payment history and receipts</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid (2025)</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ZMW 23,500</div>
              <p className="text-xs text-muted-foreground">2 payments made</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid (2024)</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ZMW 125,000</div>
              <p className="text-xs text-muted-foreground">12 payments made</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View and download your payment receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      payment.status === "Completed" ? "bg-success/10" : "bg-warning/10"
                    }`}>
                      <CreditCard className={`h-6 w-6 ${
                        payment.status === "Completed" ? "text-success" : "text-warning"
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold">{payment.type}</p>
                      <p className="text-sm text-muted-foreground">{payment.reference}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <p className="font-semibold">{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>
                        {payment.status}
                      </Badge>
                      {payment.status === "Completed" && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Receipt
                        </Button>
                      )}
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

export default PaymentListPage;
