"use client"
import api from "@/utils/api";
import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Users, MessageSquare } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

const handleLogin = async (e) => {
  e.preventDefault();

  const formData = new URLSearchParams();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(), // 🔥 super important
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error("Login failed");
    }

    const data = await response.json();
    const { access_token, role } = data;

    localStorage.setItem("token", access_token);
    localStorage.setItem("role", role);

    // redirect
    if (role === "manager") {
      window.location.href = "/dashboard/manager";
    } else if (role === "employee") {
      window.location.href = "/dashboard/employee";
    }
  } catch (error) {
    alert("Invalid credentials. Try again.");
    console.error("Login error:", error);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#7AE2CF] p-3 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Feedback System</h1>
          <p className="text-slate-400">Structured, ongoing feedback for teams</p>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-200">
                  Role
                </Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="manager" className="text-white hover:bg-slate-600">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Manager
                      </div>
                    </SelectItem>
                    <SelectItem value="employee" className="text-white hover:bg-slate-600">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Employee
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-[#7AE2CF] hover:bg-[#077A7D] text-white">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        
      </div>
    </div>
  )
}
