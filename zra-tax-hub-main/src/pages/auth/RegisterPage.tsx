import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ Individual taxpayer schema
const individualSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nrcNumber: z.string().min(6, "NRC number is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  physicalAddress: z.string().min(3, "Address is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  employmentStatus: z.string().min(1, "Employment status is required"),
  estimatedAnnualIncome: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Estimated income is required")
  ),
});

// ✅ Business taxpayer schema
const businessSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.string().min(1, "Business type is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  dateOfIncorporation: z.string().min(1, "Date of incorporation is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  contactPersonName: z.string().min(1, "Contact person name is required"),
  contactPersonPhone: z.string().min(10, "Contact phone is required"),
  contactPersonEmail: z.string().email("Invalid email"),
  email: z.string().email("Invalid business email"),
  phoneNumber: z.string().min(10, "Business phone number required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  numberOfEmployees: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Number of employees is required")
  ),
  sector: z.string().min(1, "Sector is required"),
  estimatedAnnualTurnover: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Annual turnover is required")
  ),
  vatRegistered: z.preprocess(
    (val) => val === "true",
    z.boolean()
  ),
});

type IndividualFormValues = z.infer<typeof individualSchema>;
type BusinessFormValues = z.infer<typeof businessSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<"individual" | "business">("individual");
  const [isLoading, setIsLoading] = useState(false);
 
  const form = useForm<IndividualFormValues | BusinessFormValues>({
    resolver: zodResolver(accountType === "individual" ? individualSchema : businessSchema),
    defaultValues:
  accountType === "individual"
    ? {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nrcNumber: "",
        email: "",
        phoneNumber: "",
        password: "",
        physicalAddress: "",
        gender: "MALE",
        employmentStatus: "EMPLOYED",
        estimatedAnnualIncome: 0, // stays number, not undefined
      }
    : {
        businessName: "",
        businessType: "",
        registrationNumber: "",
        dateOfIncorporation: "",
        businessAddress: "",
        contactPersonName: "",
        contactPersonPhone: "",
        contactPersonEmail: "",
        email: "",
        phoneNumber: "",
        password: "",
        numberOfEmployees: 0,
        sector: "",
        estimatedAnnualTurnover: 0,
        vatRegistered: false,
      },

  });


  const onSubmit = async (data: any) => {
    setIsLoading(true);
console.log("\nthis is my data ====>",data,"\n")

    const endpoint =
      accountType === "individual"
        ? `http://16.171.255.95:8080/api/v1/auth/register/individual`
        : `http://16.171.255.95:8080/api/v1/auth/register/business`

    try {
      // console.log("Payload:", JSON.stringify(data, null, 2));

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json",
           "Accept": "application/json",
         },
        body: JSON.stringify(data),
      });
       console.log('response :===> ',response)
      if (!response.ok) throw new Error("Request failed");

      const result = await response.json();
      console.log("Response:", result);
      toast.success("Registration successful!");
      navigate("/auth/login");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      <div className="container flex items-center justify-center py-16">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Register as Taxpayer</CardTitle>
            <CardDescription>Select account type to continue.</CardDescription>
          </CardHeader>

          {/* Switch between Individual / Business */}
          <div className="flex justify-center gap-2 mb-4">
            <Button
              variant={accountType === "individual" ? "default" : "outline"}
              onClick={() => setAccountType("individual")}
            >
              Individual
            </Button>
            <Button
              variant={accountType === "business" ? "default" : "outline"}
              onClick={() => setAccountType("business")}
            >
              Business
            </Button>
          </div>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {accountType === "individual" ? (
                  <>
                    {/* Individual Fields */}
                    <FormField name="firstName" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="lastName" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="dateOfBirth" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl><Input type="date" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="nrcNumber" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>NRC Number</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />


                       <FormField name="email" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                     <FormField name="phoneNumber" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input type="tel" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                       <FormField name="password" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="physicalAddress" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Physical Address</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />


                    <FormField name="gender" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />


                    <FormField name="employmentStatus" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="EMPLOYED">Employed</SelectItem>
                            <SelectItem value="SELF_EMPLOYED">Self-Employed</SelectItem>
                            <SelectItem value="UNEMPLOYED">Unemployed</SelectItem>
                            <SelectItem value="STUDENT">Student</SelectItem>
                            <SelectItem value="RETIRED">Retired</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="estimatedAnnualIncome" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Annual Income (ZMW)</FormLabel>
                        <FormControl><Input type="number" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                   

                 

                 

                  
                  </>
                ) : (
                  <>
                    {/* Business Fields */}
                    <FormField name="businessName" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="businessType" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="registrationNumber" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="dateOfIncorporation" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Incorporation</FormLabel>
                        <FormControl><Input type="date" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="businessAddress" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="contactPersonName" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Name</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="contactPersonPhone" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Phone</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="contactPersonEmail" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Email</FormLabel>
                        <FormControl><Input type="email" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="email" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Email</FormLabel>
                        <FormControl><Input type="email" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="phoneNumber" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Phone</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="sector" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector</FormLabel>
                        <FormControl><Input {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="numberOfEmployees" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Employees</FormLabel>
                        <FormControl><Input type="number" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="estimatedAnnualTurnover" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Annual Turnover</FormLabel>
                        <FormControl><Input type="number" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="vatRegistered" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>VAT Registered</FormLabel>
                        <Select onValueChange={field.onChange} value={String(field.value)}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="password" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" {...field} required /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Register"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <div className="text-center text-sm text-muted-foreground w-full">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
