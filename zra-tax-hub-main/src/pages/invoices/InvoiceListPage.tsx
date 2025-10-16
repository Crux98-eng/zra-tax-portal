import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, Eye } from "lucide-react";
import Header from "@/components/layout/Header";

const InvoiceListPage = () => {
  const invoices = [
    { id: 1, invoiceNo: "INV-2025-0045", supplier: "ABC Suppliers Ltd", amount: "ZMW 5,000", vat: "ZMW 800", status: "Validated", date: "2025-01-18" },
    { id: 2, invoiceNo: "INV-2025-0044", supplier: "XYZ Trading Co", amount: "ZMW 3,200", vat: "ZMW 512", status: "Validated", date: "2025-01-15" },
    { id: 3, invoiceNo: "INV-2025-0043", supplier: "Tech Solutions Zambia", amount: "ZMW 12,500", vat: "ZMW 2,000", status: "Pending", date: "2025-01-12" },
    { id: 4, invoiceNo: "INV-2025-0042", supplier: "Office Mart Ltd", amount: "ZMW 1,850", vat: "ZMW 296", status: "Validated", date: "2025-01-10" },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Smart Invoices</h1>
          <p className="text-muted-foreground">View and validate your e-invoices</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{invoices.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Validated</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{invoices.filter(i => i.status === "Validated").length}</div>
              <p className="text-xs text-muted-foreground">Compliant invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ZMW 22,550</div>
              <p className="text-xs text-muted-foreground">Excl. VAT</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoice List</CardTitle>
            <CardDescription>All your smart invoices in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      invoice.status === "Validated" ? "bg-success/10" : "bg-warning/10"
                    }`}>
                      <Receipt className={`h-6 w-6 ${
                        invoice.status === "Validated" ? "text-success" : "text-warning"
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold">{invoice.invoiceNo}</p>
                      <p className="text-sm text-muted-foreground">{invoice.supplier}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <p className="font-semibold">{invoice.amount}</p>
                      <p className="text-sm text-muted-foreground">VAT: {invoice.vat}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={invoice.status === "Validated" ? "default" : "secondary"}>
                        {invoice.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
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

export default InvoiceListPage;
