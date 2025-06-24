"use client"
import { Button } from "@/components/ui/button"
import { Plus, LogOut, FileText ,ArrowLeft} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"


export default function Navbar({ field ,unacknowledgedCount}) {
  return (
    <>
      {field === 'Manager' && (
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#7AE2CF] p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Manager Dashboard</h1>
              <p className="text-sm text-slate-600">Welcome back, Daksh</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/form/feedback">
              <Button className="bg-[#7AE2CF] hover:bg-[#077A7D]">
                <Plus className="h-4 w-4 mr-2" />
                Give Feedback
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>
      )}

      {field === 'Employee' && (
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#7AE2CF] p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Employee Dashboard</h1>
              <p className="text-sm text-slate-600">Welcome back, John</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {unacknowledgedCount > 0 && (
              <Badge variant="destructive" className="bg-[#7AE2CF]">
                {unacknowledgedCount} new feedback
              </Badge>
            )}
            <Link href="/">
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>
      )}
      {field === 'giveFeedback' && (
      <div className="bg-white border-b border-slate-200 px-6 py-4">
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
      </div>
      )}
    </>

  )
}