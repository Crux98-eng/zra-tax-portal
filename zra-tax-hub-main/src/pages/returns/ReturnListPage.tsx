// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { FileText, Plus } from "lucide-react";
// import Header from "@/components/layout/Header";
//   import React,{useState,useEffect} from "react";
// const ReturnListPage = () => {
// const naviagation = useNavigate();
//  const [token, setToken] = useState("");
//  const [scores, setAllScore] = useState(null);

//   const returns = [
//     { id: 1, type: "VAT Return", period: "Q4 2024", status: "Filed", amount: "ZMW 15,000", dueDate: "2025-01-21", filedDate: "2025-01-15" },
//     { id: 2, type: "PAYE Return", period: "December 2024", status: "Filed", amount: "ZMW 8,500", dueDate: "2025-01-14", filedDate: "2025-01-10" },
//     { id: 3, type: "VAT Return", period: "Q3 2024", status: "Filed", amount: "ZMW 12,800", dueDate: "2024-10-21", filedDate: "2024-10-18" },
//     { id: 4, type: "Income Tax", period: "2024", status: "Pending", amount: "TBD", dueDate: "2025-04-30", filedDate: null },
//     { id: 5, type: "PAYE Return", period: "November 2024", status: "Filed", amount: "ZMW 8,200", dueDate: "2024-12-14", filedDate: "2024-12-10" },
//   ];

//  /* 
//  [
//     {
//         "id": "0a1ed586-74fc-4390-aff3-de419b898bfd",
//         "taxType": "INCOME_TAX",
//         "taxYear": 2026,
//         "taxPeriod": 2,
//         "status": "DRAFT",
//         "totalIncome": 7311996962,
//         "totalDeductions": 82396,
//         "taxableIncome": 7311914566,
//         "taxDue": 2193555649.8,
//         "riskScore": 0,
//         "effectiveTaxRate": null,
//         "blockchainTxHash": null,
//         "submittedAt": null,
//         "createdAt": "2025-10-29T10:42:59.140259"
//     },
//     {
//         "id": "7094851e-b762-4652-9b03-9918dae5c6f7",
//         "taxType": "INCOME_TAX",
//         "taxYear": 2025,
//         "taxPeriod": 1,
//         "status": "SUBMITTED",
//         "totalIncome": 40000,
//         "totalDeductions": 1100,
//         "taxableIncome": 38900,
//         "taxDue": 0,
//         "riskScore": 0.1,
//         "effectiveTaxRate": null,
//         "blockchainTxHash": "0xc5b632a4d27a48deaa0c4d4edf085aae",
//         "submittedAt": "2025-10-28T05:27:14.04904",
//         "createdAt": "2025-10-28T05:27:14.201478"
//     }
// ]

//  */
//   useEffect(() => {

//     const storedToken = localStorage.getItem("authToken");

//     if ( storedToken) {

//         getAllCompliance(storedToken);

//     }

//   }, [100]);

//   const getAllCompliance = async (tokens) => {
//      if (!tokens) {
//        console.warn("⚠️ No token available — skipping compliance fetch.");
//        return;
//      }

//      try {
//        const response = await fetch(
//          "http://16.171.255.95:8080/api/v1/tax-filings",
//          {
//            method: "GET",
//            headers: {
//              Authorization: `Bearer ${tokens}`,
//            },
//          }
//        );

//        if (!response.ok) {
//          console.warn(`⚠️ Compliance score fetch failed: ${response.status}`);
//          return;
//        }

//        // ✅ This is the key: await the JSON promise
//        const data = await response.json();
//        setAllScore(data);
//        console.log(" filings data :", data);

//      } catch (error) {
//        console.error("❌ Network or runtime error in getAllCompliance:", error.message);
//      }
//    };

//   return (
//     <div className="min-h-screen bg-secondary/30">
//       <Header />

//       <main className="container py-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Tax Returns</h1>
//             <p className="text-muted-foreground">Manage and file your tax returns</p>
//           </div>
//           <Button asChild size="lg">
//             <Link to="/fileReturnPage">
//               <Plus className="h-5 w-5 mr-2" />
//               File New Return
//             </Link>
//           </Button>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>All Returns</CardTitle>
//             <CardDescription>View your tax return filing history</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {scores.map((ret) => (
//                 <div key={ret.data.id} className="flex items-center justify-between border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//                       <FileText className="h-6 w-6 text-primary" />
//                     </div>
//                     <div>
//                       <p className="font-semibold">{ret.taxType}</p>
//                       <p className="text-sm text-muted-foreground">{ret.data.taxPeriod}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-6">
//                     <div className="text-right hidden md:block">
//                       <p className="text-sm text-muted-foreground">Amount</p>
//                       <p className="font-medium">{ret.data.totalIncome}</p>
//                     </div>
//                     <div className="text-right hidden sm:block">
//                       <p className="text-sm text-muted-foreground">Due Date</p>
//                       <p className="font-medium">{ret.data.taxDue}</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Badge variant={ret.data.status === "Filed" ? "default" : "secondary"}>
//                         {ret.data.status}
//                       </Badge>
//                       <Button asChild variant="outline" size="sm">
//                         <Link to={`/returns/${ret.data.id}`}>View</Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default ReturnListPage;

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus } from "lucide-react";
import Header from "@/components/layout/Header";
import React, { useState, useEffect } from "react";

const ReturnListPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [scores, setAllScore] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      getAllCompliance(storedToken);
    }
  }, []);

  const getAllCompliance = async (tokens) => {
    if (!tokens) {
      console.warn("⚠️ No token available — skipping compliance fetch.");
      return;
    }

    try {
      const response = await fetch("http://16.171.255.95:8080/api/v1/tax-filings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      });

      if (!response.ok) {
        console.warn(`⚠️ Compliance fetch failed: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("✅ Tax filings data:", data);
      setAllScore(data);
    } catch (error) {
      console.error("❌ Error fetching tax filings:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />

      <main className="container py-8">
        {/* Header Section */}
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

        {/* Tax Returns List */}
        <Card>
          <CardHeader>
            <CardTitle>All Returns</CardTitle>
            <CardDescription>View your tax return filing history</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* ✅ Check if scores and scores.data exist */}
              {scores && scores.data && scores.data.length > 0 ? (
                scores.data.map((ret) => (
                  <div
                    key={ret.id}
                    className="flex items-center justify-between border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
                  >
                    {/* Left Section: Icon + Info */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{ret.taxType.replace("_", " ")}</p>
                        <p className="text-sm text-muted-foreground">
                          Period: {ret.taxPeriod} | Year: {ret.taxYear}
                        </p>
                      </div>
                    </div>

                    {/* Right Section: Amounts + Status */}
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-muted-foreground">Total Income</p>
                        <p className="font-medium">
                          ZMW {Number(ret.totalIncome).toLocaleString()}
                        </p>
                      </div>

                      <div className="text-right hidden sm:block">
                        <p className="text-sm text-muted-foreground">Tax Due</p>
                        <p className="font-medium">
                          ZMW {Number(ret.taxDue).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          variant={ret.status === "SUBMITTED" ? "default" : "secondary"}
                        >
                          {ret.status}
                        </Badge>
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/returns/${ret.id}`} state={{ filing: ret }}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No tax filings found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReturnListPage;
