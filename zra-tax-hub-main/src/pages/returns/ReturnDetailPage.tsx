import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import { FileText, ArrowLeft, Download } from "lucide-react";

// 🧾 Define the expected tax filing type
export interface TaxFiling {
  id: string;
  taxType: string;
  taxYear: number;
  taxPeriod: number;
  status: string;
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxDue: number;
  riskScore: number;
  effectiveTaxRate: number | null;
  blockchainTxHash: string | null;
  submittedAt: string | null;
  createdAt: string;
}

const ReturnDetailPage: React.FC = () => {
  const navigate = useNavigate();

  // Use typed state for location
  const location = useLocation();
  const filing = (location.state as { filing: TaxFiling } | undefined)?.filing;

  if (!filing) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <Card className="max-w-md p-6 text-center">
          <p className="text-muted-foreground mb-4">
            ⚠️ No filing data found. Please go back to the returns list.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />

      <main className="container py-10">
        {/* Header Buttons */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>

          <Button variant="default" className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Summary
          </Button>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-primary/20">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="capitalize text-xl sm:text-2xl">
                  {filing.taxType.replace("_", " ")}
                </CardTitle>
                <CardDescription>
                  Tax Year: {filing.taxYear} | Period: {filing.taxPeriod}
                </CardDescription>
              </div>
            </div>
            <Badge
              variant={filing.status === "SUBMITTED" ? "default" : "secondary"}
              className="text-sm px-3 py-1"
            >
              {filing.status}
            </Badge>
          </CardHeader>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Section 1: Income Details */}
            <div className="bg-secondary/40 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-primary">Income Details</h3>
              <p>
                <strong>Total Income:</strong>{" "}
                ZMW {Number(filing.totalIncome).toLocaleString()}
              </p>
              <p>
                <strong>Total Deductions:</strong>{" "}
                ZMW {Number(filing.totalDeductions).toLocaleString()}
              </p>
              <p>
                <strong>Taxable Income:</strong>{" "}
                ZMW {Number(filing.taxableIncome).toLocaleString()}
              </p>
            </div>

            {/* Section 2: Tax Info */}
            <div className="bg-secondary/40 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-primary">Tax Info</h3>
              <p>
                <strong>Tax Due:</strong>{" "}
                ZMW {Number(filing.taxDue).toLocaleString()}
              </p>
              <p>
                <strong>Effective Tax Rate:</strong>{" "}
                {filing.effectiveTaxRate ?? "N/A"}
              </p>
              <p>
                <strong>Risk Score:</strong> {filing.riskScore}
              </p>
            </div>

            {/* Section 3: Blockchain / Metadata */}
            <div className="bg-secondary/40 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-primary">Record Metadata</h3>
              <p>
                <strong>Blockchain Tx:</strong>{" "}
                {filing.blockchainTxHash ?? "Not available"}
              </p>
              <p>
                <strong>Submitted At:</strong>{" "}
                {filing.submittedAt
                  ? new Date(filing.submittedAt).toLocaleString()
                  : "Not submitted"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(filing.createdAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReturnDetailPage;
