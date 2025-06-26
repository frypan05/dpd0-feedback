//dashboard/employee.js

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, MessageSquare, TrendingUp } from "lucide-react"
import Navbar from "@/components/Navbar"
import { FeedbackCard } from "@/components/FeedbackCard"

const feedbackHistory = [
    {
        id: 1,
        date: "2024-01-15",
        manager: "Daksh Sharma",
        sentiment: "positive",
        strengths: "Excellent communication skills and leadership during the project",
        improvements: "Could benefit from more technical deep-dives",
        overall: "Great work on the Q4 deliverables. Keep up the excellent communication.",
        acknowledged: true,
    },
    {
        id: 2,
        date: "2024-01-08",
        manager: "Daksh Sharma",
        sentiment: "neutral",
        strengths: "Good problem-solving approach and attention to detail",
        improvements: "Time management could be improved for better deadline adherence",
        overall: "Solid performance overall. Focus on planning and time allocation.",
        acknowledged: false,
    },
    {
        id: 3,
        date: "2023-12-20",
        manager: "Daksh Sharma",
        sentiment: "positive",
        strengths: "Creative solutions and collaborative team spirit",
        improvements: "Documentation practices could be more consistent",
        overall: "Fantastic contributions to the team. Great innovative thinking.",
        acknowledged: true,
    },
]

export default function EmployeeDashboard() {
    const [feedback, setFeedback] = useState(feedbackHistory)

    const acknowledgeFeedback = (id) => {
        setFeedback((prev) => prev.map((item) => (item.id === id ? { ...item, acknowledged: true } : item)))
    }

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case "positive":
                return "bg-green-500"
            case "negative":
                return "bg-red-500"
            default:
                return "bg-yellow-500"
        }
    }

    const unacknowledgedCount = feedback.filter((f) => !f.acknowledged).length
    const totalFeedback = feedback.length
    const positiveFeedback = feedback.filter((f) => f.sentiment === "positive").length

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <Navbar field="Employee" unacknowledgedCount={feedback.filter((f) => !f.acknowledged).length}></Navbar>

            <div className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
                            <MessageSquare className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalFeedback}</div>
                            <p className="text-xs text-slate-600">Feedback entries received</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                            <Clock className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{unacknowledgedCount}</div>
                            <p className="text-xs text-slate-600">Awaiting acknowledgment</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
                            <TrendingUp className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {Math.round((positiveFeedback / totalFeedback) * 100)}%
                            </div>
                            <p className="text-xs text-slate-600">Of total feedback</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="timeline" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="timeline" className="bg-slate-200 text-[#7AE2CF] hover:bg-slate-400 ">Feedback Timeline</TabsTrigger>
                        <TabsTrigger value="summary" className="bg-slate-200 text-[#7AE2CF] hover:bg-slate-400 ">Summary</TabsTrigger>
                    </TabsList>

                    <TabsContent value="timeline">
                        <Card>
                            <CardHeader>
                                <CardTitle>Feedback Timeline</CardTitle>
                                <CardDescription>All feedback you've received from your manager</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {feedback.map((item) => (
                                        <FeedbackCard
                                            key={item.id}
                                            item={item}
                                            getSentimentColor={getSentimentColor}
                                            acknowledgeFeedback={acknowledgeFeedback}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="summary">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Strengths</CardTitle>
                                    <CardDescription>Key strengths highlighted in recent feedback</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                            <p className="text-sm text-green-800">Excellent communication skills</p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                            <p className="text-sm text-green-800">Strong problem-solving approach</p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                            <p className="text-sm text-green-800">Creative and innovative thinking</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Development Areas</CardTitle>
                                    <CardDescription>Areas for continued growth and improvement</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                            <p className="text-sm text-orange-800">Time management and planning</p>
                                        </div>
                                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                            <p className="text-sm text-orange-800">Technical documentation practices</p>
                                        </div>
                                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                            <p className="text-sm text-orange-800">Deep technical knowledge</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
