import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Mail, Phone, MapPin, Building, CheckCircle, Download, LogOut } from "lucide-react";
import Header from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfilePage = () => {
 const[userProfile,setUser]=useState(null)

const navigation = useNavigate()
  const handleLogOut = () => {
  localStorage.removeItem("userData");
  navigation("/");
};


useEffect(() => {
  const storedData = localStorage.getItem("userData");
  //console.log("local data is ==>",storedData)
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
     // console.log("Loaded user data:", parsedData);
      setUser(parsedData);
    } catch (err) {
      console.error("Failed to parse user data:", err);
    }
  }

}, [1000]);
 
 

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile & Compliance</h1>
          <p className="text-muted-foreground">Manage your account and view compliance status</p>
        </div>
     
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your registered taxpayer details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{userProfile? userProfile.firstName : 'loading...'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <Building className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">TPIN</p>
                    <p className="font-medium">{userProfile? userProfile.tpin : 'loading...'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userProfile? userProfile.email : 'loading...'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{userProfile? userProfile.phoneNumber : 'loading'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">Plot 123, Independence Avenue, Lusaka</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </CardContent>
            </Card>

            {/* Compliance History */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance History</CardTitle>
                <CardDescription>Your tax compliance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2025 Q1</span>
                    <Badge variant="default">100% Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2024 Q4</span>
                    <Badge variant="default">100% Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2024 Q3</span>
                    <Badge variant="default">100% Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2024 Q2</span>
                    <Badge variant="default">100% Compliant</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Status */}
          <div className="space-y-6">
            <Card className="border-2 border-success/20 bg-success/5">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <CardTitle>Compliance Status</CardTitle>
                </div>
                <CardDescription>Your current standing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Score</span>
                    <span className="font-bold text-success">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">All returns filed on time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">No outstanding payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">TCC eligible</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Compliance Certificate</CardTitle>
                <CardDescription>Request or download your TCC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 rounded-lg bg-secondary/50">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <p className="font-medium mb-2">You are eligible for TCC</p>
                  <p className="text-sm text-muted-foreground">
                    Your compliance score meets the requirements
                  </p>
                </div>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Request TCC
                </Button>
              </CardContent>
            </Card>
          </div>
          <Button onClick={handleLogOut} className="w-40 bg-red-600">
            <LogOut  className="h-4 w-4 mr-2"/>
            logout
            </Button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
