import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";

// ------------------- Validation Schema -------------------
const toNumber = z.preprocess(
  (val) => (val === "" || val === null ? 0 : Number(val)),
  z.number().nonnegative()
);

const taxSchema = z.object({
  taxType: z.string().min(1, "Tax type is required"),
  taxYear: z.preprocess((val) => Number(val), z.number().min(1900, "Enter valid year")),
  taxPeriod: z.preprocess((val) => Number(val), z.number().min(1, "Enter valid period")),
  employmentIncome: toNumber,
  businessIncome: toNumber,
  rentalIncome: toNumber,
  investmentIncome: toNumber,
  otherIncome: toNumber,
  nappsaContributions: toNumber,
  medicalExpenses: toNumber,
  educationExpenses: toNumber,
  insurancePremiums: toNumber,
  otherDeductions: toNumber,
  saveDraft: z.boolean().default(true),
});

type TaxFormData = z.infer<typeof taxSchema>;

// ------------------- Component -------------------
const FileTaxReturnForm: React.FC = () => {
  const [token, setToken] = useState("");
  const [selectedTaxType, setSelectedTaxType] = useState("income");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setToken(storedToken);
  }, []);

  const form = useForm<TaxFormData>({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      taxType: "income",
      taxYear: new Date().getFullYear(),
      taxPeriod: 1,
      employmentIncome: 0,
      businessIncome: 0,
      rentalIncome: 0,
      investmentIncome: 0,
      otherIncome: 0,
      nappsaContributions: 0,
      medicalExpenses: 0,
      educationExpenses: 0,
      insurancePremiums: 0,
      otherDeductions: 0,
      saveDraft: true,
    },
  });

  // Sync taxType state with form
  useEffect(() => {
    form.setValue("taxType", selectedTaxType);
  }, [selectedTaxType]);

  const onSubmit = async (data: TaxFormData) => {
    console.log("🚀 Submitting:", data);

    if (!token) {
      alert("Missing auth token. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://16.171.255.95:8080/api/v1/tax-filings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("✅ Server response:", result);

      if (!response.ok) throw new Error(result.message || "Submission failed");
      alert("Tax return submitted successfully!");
    } catch (err: any) {
      console.error("❌ Error submitting:", err);
      alert(err.message || "An error occurred while submitting.");
    }
  };

  const renderField = (
    name: keyof TaxFormData,
    label: string,
    type = "text"
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>File ZRA Return</CardTitle>
            <CardDescription>
              Fill in your tax details below. Select the tax type before
              submission.
            </CardDescription>
          </CardHeader>

          {/* Tax Type Selector */}
          <div className="flex flex-wrap gap-2 p-4">
            {[
              "INCOME_TAX",
              "VAT",
              "PAYE",
              "withholding",
              "turnover",
              "provisional",
            ].map((type) => (
              <Button
                key={type}
                variant={selectedTaxType === type ? "default" : "outline"}
                onClick={() => setSelectedTaxType(type)}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </div>

          <Separator />

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                noValidate
              >
                {renderField("taxYear", "Tax Year", "number")}
                {renderField("taxPeriod", "Tax Period", "number")}
                {renderField("employmentIncome", "Employment Income", "number")}
                {renderField("businessIncome", "Business Income", "number")}
                {renderField("rentalIncome", "Rental Income", "number")}
                {renderField("investmentIncome", "Investment Income", "number")}
                {renderField("otherIncome", "Other Income", "number")}
                {renderField(
                  "nappsaContributions",
                  "NAPSA Contributions",
                  "number"
                )}
                {renderField("medicalExpenses", "Medical Expenses", "number")}
                {renderField("educationExpenses", "Education Expenses", "number")}
                {renderField("insurancePremiums", "Insurance Premiums", "number")}
                {renderField("otherDeductions", "Other Deductions", "number")}

                {/* Save Draft Checkbox */}
                <div className="col-span-full flex items-center gap-2">
                  <label className="text-sm font-medium">Save Draft?</label>
                  <input
                    type="checkbox"
                    checked={form.watch("saveDraft")}
                    onChange={(e) =>
                      form.setValue("saveDraft", e.target.checked)
                    }
                  />
                </div>

                <Button type="submit" className="col-span-full w-full">
                  Submit {selectedTaxType.toUpperCase()} Return
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FileTaxReturnForm;
