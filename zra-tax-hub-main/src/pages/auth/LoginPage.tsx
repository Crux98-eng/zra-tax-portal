import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Header from "@/components/layout/Header";

const loginSchema = z.object({
  tpinOrEmail: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      tpinOrEmail: "",
      password: "",
    },
  });
   const url = "http://16.171.255.95:8080";

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
console.log("\nthis is my data ====>",data,"\n")
const query = new URLSearchParams({
  tpinOrEmail: data.tpinOrEmail,
  password: data.password,
}).toString();
    // Simulate API call
    try {
      
      const response = await fetch(`/api/v1/auth/login?${query}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
          
        },
        
      })
      if (!response.ok) throw Error("something happened")
      const result = await response.json();
      console.log("\nreturned data is  : ", result, " \n")
      toast.success("Login successful!");
    } catch (err) {
      console.error("login failed with ", err)
    } finally {
      setTimeout(() => {

        //navigate("/dashboard");
        setIsLoading(false);
      }, 1000);
    }

  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      <div className="container flex items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your Email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="tpinOrEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button variant="link" asChild className="text-sm">
              <Link to="/auth/forgot-password">Forgot password?</Link>
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-primary hover:underline">
                Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
