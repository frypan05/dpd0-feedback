"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, MessageSquare } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

const teamMembers = [
  { id: 1, name: "Alice Johnson", email: "alice@company.com", feedbackCount: 3, lastFeedback: "2 days ago" },
  { id: 2, name: "Bob Smith", email: "bob@company.com", feedbackCount: 2, lastFeedback: "1 week ago" },
  { id: 3, name: "Carol Davis", email: "carol@company.com", feedbackCount: 4, lastFeedback: "3 days ago" },
  { id: 4, name: "David Wilson", email: "david@company.com", feedbackCount: 1, lastFeedback: "2 weeks ago" },
]

const recentFeedback = [
  {
    id: 1,
    employee: "Alice Johnson",
    sentiment: "positive",
    date: "2024-01-15",
    preview: "Great leadership skills and communication...",
  },
  {
    id: 2,
    employee: "Carol Davis",
    sentiment: "neutral",
    date: "2024-01-14",
    preview: "Good technical skills, needs improvement in...",
  },
  {
    id: 3,
    employee: "Bob Smith",
    sentiment: "positive",
    date: "2024-01-12",
    preview: "Excellent problem-solving abilities...",
  },
]

export default function ManagerDashboard() {


  return (
    <div className="min-h-screen bg-slate-50 ">
      {/* Header */}
      <Navbar field="Manager"></Navbar>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <p className="text-xs text-slate-600">Active team members</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamMembers.reduce((sum, member) => sum + member.feedbackCount, 0)}
              </div>
              <p className="text-xs text-slate-600">Feedback entries given</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Sentiment</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Positive</div>
              <p className="text-xs text-slate-600">Overall team sentiment</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="team" className="space-y-6 ">
          <TabsList>
            <TabsTrigger value="team" className="bg-slate-200 text-[#7AE2CF] hover:bg-slate-400 ">Team Overview</TabsTrigger>
            <TabsTrigger value="recent"  className="bg-slate-200 text-[#7AE2CF] hover:bg-slate-400 ">Recent Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Overview of your team members and their feedback history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-slate-700">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{member.name}</h3>
                          <p className="text-sm text-slate-600">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900">{member.feedbackCount} feedback entries</p>
                          <p className="text-xs text-slate-600">Last: {member.lastFeedback}</p>
                        </div>
                        <Link href={`/form/feedback?employee=${member.id}`}>
                          <Button size="sm" variant="outline" className="bg-white  hover:bg-slate-200 ">
                            Give Feedback
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Your recently submitted feedback entries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-slate-900">{feedback.employee}</h3>
                        <div className="flex items-center gap-2">
                          
                          <span className="text-sm text-slate-600">{feedback.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">{feedback.preview}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
