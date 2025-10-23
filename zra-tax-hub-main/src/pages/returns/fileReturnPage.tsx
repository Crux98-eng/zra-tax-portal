import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// ------------------- Zod Schemas -------------------
const commonFields = z.object({
  contactNumber: z.string().min(7),
  email: z.string().email(),
  physicalAddress: z.string().optional(),
  submissionDate: z.string(),
});

// ------------------- Return Type Schemas -------------------
const incomeSchema = commonFields.extend({
  tpin: z.string().min(1),
  taxpayerName: z.string().min(1),
  yearOfAssessment: z.string().min(1),
  businessSector: z.string().min(1),
  grossIncome: z.number(),
  allowableExpenses: z.number(),
  netProfit: z.number().optional(),
  capitalAllowances: z.number().optional(),
  taxableIncome: z.number().optional(),
  taxPayable: z.number().optional(),
  advanceTaxPaid: z.number().optional(),
  balanceDue: z.number().optional(),
  declaration: z.string().min(1),
});

const vatSchema = commonFields.extend({
  tpin: z.string().min(1),
  taxPeriod: z.string().min(1),
  totalSales: z.number(),
  vatOnSales: z.number(),
  totalPurchases: z.number(),
  vatOnPurchases: z.number(),
  netVatPayable: z.number().optional(),
  adjustments: z.string().optional(),
  totalVatDue: z.number(),
  paymentReference: z.string().optional(),
  declaration: z.string().min(1),
});

const payeSchema = commonFields.extend({
  employerTpin: z.string().min(1),
  taxPeriod: z.string().min(1),
  employeeName: z.string(),
  nrcOrPassport: z.string(),
  employeeTpin: z.string().optional(),
  grossPay: z.number(),
  allowances: z.number(),
  deductions: z.number(),
  taxablePay: z.number().optional(),
  payeDeducted: z.number(),
  totalPayePayable: z.number(),
  declaration: z.string().min(1),
});

const withholdingSchema = commonFields.extend({
  tpin: z.string().min(1),
  month: z.string().min(1),
  paymentType: z.string().min(1),
  payeeName: z.string(),
  payeeTpin: z.string().optional(),
  amountPaid: z.number(),
  taxWithheld: z.number(),
  dateOfPayment: z.string(),
  totalWithheld: z.number(),
  declaration: z.string().min(1),
});

const turnoverSchema = commonFields.extend({
  tpin: z.string().min(1),
  businessName: z.string().min(1),
  quarter: z.string().min(1),
  grossTurnover: z.number(),
  turnoverTax: z.number().optional(),
  taxPaid: z.number().optional(),
  balanceDue: z.number().optional(),
  declaration: z.string().min(1),
});

const provisionalSchema = commonFields.extend({
  tpin: z.string().min(1),
  yearOfAssessment: z.string().min(1),
  period: z.string().min(1),
  estimatedIncome: z.number(),
  estimatedExpenses: z.number(),
  estimatedTaxableIncome: z.number().optional(),
  taxPayable: z.number().optional(),
  installmentPayment: z.number().optional(),
  declaration: z.string().min(1),
});

type ReturnFormValues = z.infer<typeof incomeSchema> &
  z.infer<typeof vatSchema> &
  z.infer<typeof payeSchema> &
  z.infer<typeof withholdingSchema> &
  z.infer<typeof turnoverSchema> &
  z.infer<typeof provisionalSchema>;

// ------------------- Mock User -------------------
const getUserData = () => ({
  tpin: "1234567890",
  taxpayerName: "Doc Net Electronics Ltd",
  email: "info@docnet.com",
  phone: "+260970801919",
});

// ------------------- Component -------------------
const FileReturnForm = () => {
  const [searchParams] = useSearchParams();
  const returnTypeParam = searchParams.get("type") || "income";

  const [returnType, setReturnType] = useState<
    "income" | "vat" | "paye" | "withholding" | "turnover" | "provisional"
  >(returnTypeParam as any);

  const user = getUserData();

  // Determine schema dynamically
  const schema = {
    income: incomeSchema,
    vat: vatSchema,
    paye: payeSchema,
    withholding: withholdingSchema,
    turnover: turnoverSchema,
    provisional: provisionalSchema,
  }[returnType];

  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      tpin: user.tpin,
      taxpayerName: user.taxpayerName,
      contactNumber: user.phone,
      email: user.email,
      submissionDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: any) => {
    console.log(`Submitted ${returnType} return:`, data);
    alert(`${returnType.toUpperCase()} return submitted successfully!`);
  };

  // Helper to render Input Fields
  const renderField = (name: string, label: string, type: any = "text", readOnly = false) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} readOnly={readOnly} className={readOnly ? "bg-muted/40" : ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // ---------------- Render Forms ----------------
  const renderFormFields = () => {
    switch (returnType) {
      case "income":
        return (
          <>
            {renderField("tpin", "TPIN", "text", true)}
            {renderField("taxpayerName", "Taxpayer Name", "text", true)}
            {renderField("yearOfAssessment", "Year of Assessment")}
            {renderField("businessSector", "Business Sector")}
            {renderField("grossIncome", "Gross Income", "number")}
            {renderField("allowableExpenses", "Allowable Expenses", "number")}
            {renderField("netProfit", "Net Profit/Loss", "number")}
            {renderField("capitalAllowances", "Capital Allowances", "number")}
            {renderField("taxableIncome", "Taxable Income", "number")}
            {renderField("taxPayable", "Tax Payable", "number")}
            {renderField("advanceTaxPaid", "Advance Tax Paid", "number")}
            {renderField("balanceDue", "Balance Payable / Refund", "number")}
            {renderField("declaration", "Declaration")}
          </>
        );
      case "vat":
        return (
          <>
            {renderField("tpin", "Business TPIN", "text", true)}
            {renderField("taxPeriod", "Tax Period")}
            {renderField("totalSales", "Total Sales (Output Tax)", "number")}
            {renderField("vatOnSales", "VAT on Sales", "number")}
            {renderField("totalPurchases", "Total Purchases (Input Tax)", "number")}
            {renderField("vatOnPurchases", "VAT on Purchases", "number")}
            {renderField("netVatPayable", "Net VAT Payable", "number")}
            {renderField("adjustments", "Adjustments")}
            {renderField("totalVatDue", "Total VAT Due", "number")}
            {renderField("paymentReference", "Payment Reference")}
            {renderField("declaration", "Declaration")}
          </>
        );
      case "paye":
        return (
          <>
            {renderField("employerTpin", "Employer TPIN", "text", true)}
            {renderField("taxPeriod", "Tax Period")}
            {renderField("employeeName", "Employee Name")}
            {renderField("nrcOrPassport", "NRC / Passport")}
            {renderField("employeeTpin", "Employee TPIN")}
            {renderField("grossPay", "Gross Pay", "number")}
            {renderField("allowances", "Allowances", "number")}
            {renderField("deductions", "Deductions", "number")}
            {renderField("taxablePay", "Taxable Pay", "number")}
            {renderField("payeDeducted", "PAYE Deducted", "number")}
            {renderField("totalPayePayable", "Total PAYE Payable", "number")}
            {renderField("declaration", "Declaration")}
          </>
        );
      case "withholding":
        return (
          <>
            {renderField("tpin", "TPIN", "text", true)}
            {renderField("month", "Month")}
            {renderField("paymentType", "Payment Type")}
            {renderField("payeeName", "Payee Name")}
            {renderField("payeeTpin", "Payee TPIN")}
            {renderField("amountPaid", "Amount Paid", "number")}
            {renderField("taxWithheld", "Tax Withheld", "number")}
            {renderField("dateOfPayment", "Date of Payment", "date")}
            {renderField("totalWithheld", "Total Withheld", "number")}
            {renderField("declaration", "Declaration")}
          </>
        );
      case "turnover":
        return (
          <>
            {renderField("tpin", "Business TPIN", "text", true)}
            {renderField("businessName", "Business Name", "text", true)}
            {renderField("quarter", "Quarter")}
            {renderField("grossTurnover", "Gross Turnover", "number")}
            {renderField("turnoverTax", "Turnover Tax", "number")}
            {renderField("taxPaid", "Tax Paid", "number")}
            {renderField("balanceDue", "Balance Due", "number")}
            {renderField("declaration", "Declaration")}
          </>
        );
      case "provisional":
        return (
          <>
            {renderField("tpin", "Business TPIN", "text", true)}
            {renderField("yearOfAssessment", "Year of Assessment")}
            {renderField("period", "Period")}
            {renderField("estimatedIncome", "Estimated Income", "number")}
            {renderField("estimatedExpenses", "Estimated Expenses", "number")}
            {renderField("estimatedTaxableIncome", "Estimated Taxable Income", "number")}
            {renderField("taxPayable", "Tax Payable", "number")}
            {renderField("installmentPayment", "Installment Payment", "number")}
            {renderField("declaration", "Declaration")}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>File ZRA Return</CardTitle>
            <CardDescription>Select a return type to begin.</CardDescription>
          </CardHeader>

          {/* Return Type Selector */}
          <div className="flex gap-2 p-4">
            {["income", "vat", "paye", "withholding", "turnover", "provisional"].map((type) => (
              <Button
                key={type}
                variant={returnType === type ? "default" : "outline"}
                onClick={() => setReturnType(type as any)}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </div>

          <Separator />

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {renderFormFields()}
                <Button type="submit" className="w-full">
                  Submit {returnType.toUpperCase()} Return
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FileReturnForm;
