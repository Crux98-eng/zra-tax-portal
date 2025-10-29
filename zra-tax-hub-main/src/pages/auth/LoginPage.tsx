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

// Base URL configuration
const BASE_URL = "http://16.171.255.95:8080";

const loginSchema = z.object({
  tpinOrEmail: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
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

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    

    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          tpinOrEmail: data.tpinOrEmail,
          password: data.password,
          mafCode: ''
        }),
      });

     
      
      const result = await response.json();

      if (!response.ok) {
        // Extract error message from backend response
        const errorMessage = result.message || result.error || "Login failed. Please try again.";
        throw new Error(errorMessage);
      }

      // Login successful
      toast.success("Login successful!");
       
      // Store token if available
      if (result.data.token || result.data.accessToken) {
        localStorage.setItem("authToken", result.data.token || result.data.accessToken);
        console.log('\n\n',result.data.accessToken,'\n\n')
        // console.log("user is ==>",result.user)
        // Store user data if available
        //console.log("user is ==>",result.data.user)
          localStorage.setItem("userData", JSON.stringify(result.data.user));
        
      }

      // Navigate to dashboard after successful login
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      
      // Show actual backend error message
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
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
                        <Input 
                          type="email" 
                          placeholder="Enter your email" 
                          {...field} 
                          disabled={isLoading}
                        />
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
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                          disabled={isLoading}
                        />
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