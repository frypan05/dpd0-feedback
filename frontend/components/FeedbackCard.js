import React from "react";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle} from "lucide-react"





export function FeedbackCard({ item, getSentimentColor, acknowledgeFeedback }) {
  return (
    <div className="relative pl-6 pb-6 border-l-2 border-slate-200 last:border-l-0">
      <div className="absolute -left-2 top-0 w-4 h-4 bg-[#7AE2CF] rounded-full"></div>
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Badge className={`${getSentimentColor(item.sentiment)} text-white`}>
            {item.sentiment}
          </Badge>
          <span className="text-sm text-slate-600">{item.date}</span>
          <span className="text-sm text-slate-600">by {item.manager}</span>
        </div>
        {!item.acknowledged && (
          <Button
            size="sm"
            onClick={() => acknowledgeFeedback(item.id)}
            className="bg-[#7AE2CF] hover:bg-[#077A7D]"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Acknowledge
          </Button>
        )}
        {item.acknowledged && (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Acknowledged
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
          <p className="text-sm text-slate-700">{item.strengths}</p>
        </div>
        <div>
          <h4 className="font-medium text-orange-700 mb-2">Areas to Improve</h4>
          <p className="text-sm text-slate-700">{item.improvements}</p>
        </div>
        <div>
          <h4 className="font-medium text-slate-700 mb-2">Overall Comments</h4>
          <p className="text-sm text-slate-700">{item.overall}</p>
        </div>
      </div>
    </div>
    </div>

  )
}