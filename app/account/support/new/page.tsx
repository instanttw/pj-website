"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function NewSupportTicketPage() {
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) {
      toast.error("Please log in");
      return;
    }
    setLoading(true);
    try {
      const payload: Database['public']['Tables']['support_tickets']['Insert'] = {
        ticket_number: Math.random().toString(36).slice(2, 10).toUpperCase(),
        user_id: userId,
        subject,
        priority,
        status: "Open",
        category: "General",
      }
      const { error } = await supabase.from('support_tickets').insert(payload)
      if (error) throw error;
      toast.success("Ticket submitted");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit ticket");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-4 lg:px-8 py-12 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Submit a Support Ticket</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
