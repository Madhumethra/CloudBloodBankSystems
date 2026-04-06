import { motion } from "framer-motion";
import { Users, Droplets, AlertTriangle, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StockCard from "@/components/StockCard";
import { initialStock, sampleDonors, sampleRequests, donationHistory } from "@/lib/data";

const stats = [
  { label: "Total Donors", value: "1,247", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Units Available", value: "195", icon: Droplets, color: "bg-success/10 text-success" },
  { label: "Pending Requests", value: "12", icon: AlertTriangle, color: "bg-warning/10 text-warning" },
  { label: "Lives Saved", value: "3,892", icon: Activity, color: "bg-accent text-accent-foreground" },
];

const Dashboard = () => {
  const criticalRequests = sampleRequests.filter(r => r.urgency === 'critical' && r.status === 'pending');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of blood bank operations</p>
      </div>

      {criticalRequests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-urgent/10 border border-urgent/30 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-urgent animate-pulse-urgent" />
          <div>
            <p className="font-semibold text-urgent">{criticalRequests.length} Critical Request(s)</p>
            <p className="text-sm text-urgent/80">Immediate attention required for blood supply</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Blood Inventory</h2>
          <div className="grid grid-cols-2 gap-3">
            {initialStock.map((stock, i) => (
              <StockCard key={stock.bloodGroup} stock={stock} index={i} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Donation Trends</h2>
          <div className="glass-card rounded-xl p-6 h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
                <XAxis dataKey="month" stroke="hsl(220 10% 50%)" fontSize={12} />
                <YAxis stroke="hsl(220 10% 50%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 100%)",
                    border: "1px solid hsl(220 15% 90%)",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="donations" fill="hsl(0 72% 45%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Recent Requests</h2>
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Patient</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Blood Group</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Units</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Hospital</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Urgency</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleRequests.map((req) => (
                <tr key={req.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-sm font-medium text-foreground">{req.patientName}</td>
                  <td className="p-4"><span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-bold">{req.bloodGroup}</span></td>
                  <td className="p-4 text-sm text-foreground">{req.units}</td>
                  <td className="p-4 text-sm text-muted-foreground">{req.hospital}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      req.urgency === 'critical' ? 'bg-urgent/10 text-urgent' :
                      req.urgency === 'urgent' ? 'bg-warning/10 text-warning' :
                      'bg-success/10 text-success'
                    }`}>{req.urgency}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      req.status === 'pending' ? 'bg-warning/10 text-warning' :
                      req.status === 'approved' ? 'bg-primary/10 text-primary' :
                      req.status === 'fulfilled' ? 'bg-success/10 text-success' :
                      'bg-muted text-muted-foreground'
                    }`}>{req.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
