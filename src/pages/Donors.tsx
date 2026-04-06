import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BloodGroupBadge from "@/components/BloodGroupBadge";
import { sampleDonors, type Donor, type BloodGroup } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Donors = () => {
  const [donors, setDonors] = useState<Donor[]>(sampleDonors);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "", age: "", bloodGroup: "" as BloodGroup, phone: "", email: "", address: "",
  });

  const filtered = donors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search);
    const matchGroup = filterGroup === "all" || d.bloodGroup === filterGroup;
    return matchSearch && matchGroup;
  });

  const handleAdd = () => {
    if (!form.name || !form.bloodGroup || !form.phone) {
      toast({ title: "Missing fields", description: "Please fill name, blood group and phone", variant: "destructive" });
      return;
    }
    const newDonor: Donor = {
      id: String(donors.length + 1),
      name: form.name,
      age: Number(form.age) || 25,
      bloodGroup: form.bloodGroup,
      phone: form.phone,
      email: form.email,
      address: form.address,
      lastDonation: new Date().toISOString().split("T")[0],
      totalDonations: 0,
      status: "active",
    };
    setDonors([newDonor, ...donors]);
    setForm({ name: "", age: "", bloodGroup: "" as BloodGroup, phone: "", email: "", address: "" });
    setOpen(false);
    toast({ title: "Donor registered!", description: `${form.name} has been added successfully.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Donors</h1>
          <p className="text-muted-foreground mt-1">{donors.length} registered donors</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Register Donor</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle className="font-heading">Register New Donor</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Full Name *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Enter name" /></div>
                <div><Label>Age</Label><Input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="Age" /></div>
              </div>
              <div><Label>Blood Group *</Label>
                <Select value={form.bloodGroup} onValueChange={v => setForm({...form, bloodGroup: v as BloodGroup})}>
                  <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                  <SelectContent>{bloodGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Phone *</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Phone number" /></div>
                <div><Label>Email</Label><Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" /></div>
              </div>
              <div><Label>Address</Label><Input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="City, State" /></div>
              <Button onClick={handleAdd} className="w-full">Register Donor</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filterGroup} onValueChange={setFilterGroup}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {bloodGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((donor, i) => (
          <motion.div
            key={donor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-start gap-4">
              <BloodGroupBadge group={donor.bloodGroup} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground truncate">{donor.name}</h3>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    donor.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                  )}>{donor.status}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{donor.address}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{donor.phone}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">Donations: <span className="font-semibold text-foreground">{donor.totalDonations}</span></span>
                  <span className="text-xs text-muted-foreground">Last: {donor.lastDonation}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No donors found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Donors;
