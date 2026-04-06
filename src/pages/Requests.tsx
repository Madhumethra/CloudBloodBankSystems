import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleRequests, type BloodRequest, type BloodGroup } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Requests = () => {
  const [requests, setRequests] = useState<BloodRequest[]>(sampleRequests);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ patientName: "", bloodGroup: "" as BloodGroup, units: "", hospital: "", urgency: "normal" as BloodRequest["urgency"], requiredBy: "", contactPhone: "" });

  const handleAdd = () => {
    if (!form.patientName || !form.bloodGroup || !form.hospital) {
      toast({ title: "Missing fields", variant: "destructive" });
      return;
    }
    const newReq: BloodRequest = {
      id: String(requests.length + 1),
      ...form,
      units: Number(form.units) || 1,
      status: "pending",
      requestDate: new Date().toISOString().split("T")[0],
    };
    setRequests([newReq, ...requests]);
    setOpen(false);
    toast({ title: "Request submitted!", description: `Blood request for ${form.patientName} has been created.` });
  };

  const updateStatus = (id: string, status: BloodRequest["status"]) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast({ title: `Request ${status}` });
  };

  const urgencyIcon = (u: string) => u === "critical" ? <AlertTriangle className="w-4 h-4" /> : u === "urgent" ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Blood Requests</h1>
          <p className="text-muted-foreground mt-1">{requests.filter(r => r.status === "pending").length} pending requests</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="w-4 h-4" /> New Request</Button></DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle className="font-heading">New Blood Request</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Patient Name *</Label><Input value={form.patientName} onChange={e => setForm({...form, patientName: e.target.value})} /></div>
                <div><Label>Blood Group *</Label>
                  <Select value={form.bloodGroup} onValueChange={v => setForm({...form, bloodGroup: v as BloodGroup})}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{bloodGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Units</Label><Input type="number" value={form.units} onChange={e => setForm({...form, units: e.target.value})} /></div>
                <div><Label>Urgency</Label>
                  <Select value={form.urgency} onValueChange={v => setForm({...form, urgency: v as BloodRequest["urgency"]})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Hospital *</Label><Input value={form.hospital} onChange={e => setForm({...form, hospital: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Required By</Label><Input type="date" value={form.requiredBy} onChange={e => setForm({...form, requiredBy: e.target.value})} /></div>
                <div><Label>Contact Phone</Label><Input value={form.contactPhone} onChange={e => setForm({...form, contactPhone: e.target.value})} /></div>
              </div>
              <Button onClick={handleAdd} className="w-full">Submit Request</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {requests.map((req, i) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "glass-card rounded-xl p-5",
              req.urgency === "critical" && req.status === "pending" && "border-urgent/40 bg-urgent/5"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                req.urgency === "critical" ? "bg-urgent/10 text-urgent" :
                req.urgency === "urgent" ? "bg-warning/10 text-warning" :
                "bg-success/10 text-success"
              )}>
                {urgencyIcon(req.urgency)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">{req.patientName}</h3>
                  <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs font-bold">{req.bloodGroup}</span>
                  <span className="text-sm text-muted-foreground">{req.units} unit(s)</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{req.hospital} • Required by {req.requiredBy || "N/A"}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  req.status === "pending" ? "bg-warning/10 text-warning" :
                  req.status === "approved" ? "bg-primary/10 text-primary" :
                  req.status === "fulfilled" ? "bg-success/10 text-success" :
                  "bg-muted text-muted-foreground"
                )}>{req.status}</span>
                {req.status === "pending" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => updateStatus(req.id, "approved")}>Approve</Button>
                    <Button size="sm" variant="outline" onClick={() => updateStatus(req.id, "cancelled")}>Reject</Button>
                  </>
                )}
                {req.status === "approved" && (
                  <Button size="sm" onClick={() => updateStatus(req.id, "fulfilled")}>Mark Fulfilled</Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
