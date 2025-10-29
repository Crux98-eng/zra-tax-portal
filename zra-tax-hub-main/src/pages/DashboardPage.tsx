import { FileText, CreditCard, CheckCircle, AlertCircle, TrendingUp, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const DashboardPage = () => {
  const recentReturns = [
    { id: 1, type: "VAT Return", period: "Q4 2024", status: "Filed", date: "2025-01-15" },
    { id: 2, type: "PAYE Return", period: "December 2024", status: "Filed", date: "2025-01-10" },
    { id: 3, type: "Income Tax", period: "2024", status: "Pending", date: "2025-04-30" },
  ];

  const recentPayments = [
    { id: 1, type: "VAT Payment", amount: "ZMW 15,000", status: "Completed", date: "2025-01-15" },
    { id: 2, type: "PAYE Payment", amount: "ZMW 8,500", status: "Completed", date: "2025-01-10" },
  ];
  const [token, setToken] = useState("");
  const [taxData, setTaxData] = useState(null);
  const [scores, setAllScore] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
    
     //console.log("\n✅ Token loaded:", storedToken, "\n");

      // ✅ pass token directly, don’t rely on state
      getCompliance(storedToken);
      
    }
  }, []);

  const getCompliance = async (tokens) => {
    if (!token) {
      console.log("\nno token yet 1");
    }
    try {
      const response = await fetch("http://16.171.255.95:8080/api/v1/compliance/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },

      });
      if (response.ok) {
        const data = await response.json();
        setTaxData(data);
        //  console.log("\ndata filing is : ==> ",data)
      }
      // }else{
      //   console.error("something has happened while loading the score")
      // }
    } catch (error) {
      console.error(error.message)

    }
  };


  


  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />

      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Taxpayer</h1>
          <p className="text-muted-foreground">Here's an overview of your tax compliance status</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <SummaryCard
            title="Returns Filed"
            value="12"
            description="This year"
            icon={FileText}
            trend={{ value: "+2", positive: true }}
          />
          <SummaryCard
            title="Total Paid"
            value="ZMW 125K"
            description="This year"
            icon={CreditCard}
            trend={{ value: "+15%", positive: true }}
          />
          <SummaryCard
            title="Pending Returns"
            value="1"
            description="Due this quarter"
            icon={AlertCircle}
          />
          <SummaryCard
            title="Compliance Score"
            value={taxData ? taxData.data.accuracyScore + "%" : 0}
            description="Excellent standing"
            icon={CheckCircle}
            trend={{ value: "+3%", positive: true }}
          />
        </div>

        {/* TCC Status */}
        <Card className="mb-8 border-2 border-success/20 bg-success/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Tax Compliance Certificate (TCC) Status
                </CardTitle>
                <CardDescription>Your compliance standing is excellent</CardDescription>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Eligible
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Compliance Score</span>
                  <span className="font-medium">{taxData ? taxData.data.accuracyScore : 'loading...'} %</span>
                </div>
                <Progress value={taxData ? taxData.data.accuracyScore : 0} className="h-2" />
              </div>
              <Button asChild>
                <Link to="/profile">Request TCC</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Returns */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Returns</CardTitle>
              <CardDescription>Your latest tax return filings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReturns.map((ret) => (
                  <div key={ret.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{ret.type}</p>
                        <p className="text-sm text-muted-foreground">{ret.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={ret.status === "Filed" ? "default" : "secondary"}>
                        {ret.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{ret.date}</p>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link to="/returns">View All Returns</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Your latest tax payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                        <CreditCard className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.type}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{payment.amount}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link to="/payments">View All Payments</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button asChild className="h-auto flex-col gap-2 py-4">
                <Link to="/fileReturnPage">
                  <FileText className="h-6 w-6" />
                  <span>File New Return</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
                <Link to="/payments">
                  <CreditCard className="h-6 w-6" />
                  <span>Make Payment</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
                <Link to="/invoices">
                  <Receipt className="h-6 w-6" />
                  <span>View Invoices</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
                <Link to="/chat">
                  <TrendingUp className="h-6 w-6" />
                  <span>AI Assistant</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;
