"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send, FileText } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  { id: 1, name: "Alice Johnson", email: "alice@company.com" },
  { id: 2, name: "Bob Smith", email: "bob@company.com" },
  { id: 3, name: "Carol Davis", email: "carol@company.com" },
  { id: 4, name: "David Wilson", email: "david@company.com" },
]

export default function FeedbackForm() {
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [strengths, setStrengths] = useState("")
  const [improvements, setImprovements] = useState("")
  const [sentiment, setSentiment] = useState("")
  const [overallComments, setOverallComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setSelectedEmployee("")
    setStrengths("")
    setImprovements("")
    setSentiment("")
    setOverallComments("")
    setIsSubmitting(false)

    alert("Feedback submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/manager">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-[#7AE2CF] p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Give Feedback</h1>
              <p className="text-sm text-slate-600">Provide structured feedback for your team member</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>Provide comprehensive feedback to help your team member grow and develop</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Employee Selection */}
              <div className="space-y-2">
                <Label htmlFor="employee">Team Member *</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        <div className="flex flex-col">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-sm text-slate-600">{member.email}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <Label htmlFor="strengths">Strengths *</Label>
                <Textarea
                  id="strengths"
                  placeholder="Highlight the team member's key strengths and positive contributions..."
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
                <p className="text-sm text-slate-600">
                  Focus on specific examples and behaviors that demonstrate their strengths.
                </p>
              </div>

              {/* Areas to Improve */}
              <div className="space-y-2">
                <Label htmlFor="improvements">Areas to Improve *</Label>
                <Textarea
                  id="improvements"
                  placeholder="Identify areas where the team member can grow and develop..."
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
                <p className="text-sm text-slate-600">
                  Provide constructive suggestions for improvement and development opportunities.
                </p>
              </div>

              {/* Overall Sentiment */}
              <div className="space-y-2">
                <Label htmlFor="sentiment">Overall Sentiment *</Label>
                <Select value={sentiment} onValueChange={setSentiment} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select overall sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        Positive
                      </div>
                    </SelectItem>
                    <SelectItem value="neutral">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        Neutral
                      </div>
                    </SelectItem>
                    <SelectItem value="negative">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        Needs Improvement
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Overall Comments */}
              <div className="space-y-2">
                <Label htmlFor="overall">Overall Comments</Label>
                <Textarea
                  id="overall"
                  placeholder="Additional comments, context, or specific examples..."
                  value={overallComments}
                  onChange={(e) => setOverallComments(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-sm text-slate-600">
                  Optional: Add any additional context, examples, or forward-looking guidance.
                </p>
              </div>

              
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isSubmitting} className="bg-[#7AE2CF] hover:bg-[#077A7D]">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
                <Link href="/dashboard/manager">
                  <Button type="button" variant="outline" className="text-white">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
