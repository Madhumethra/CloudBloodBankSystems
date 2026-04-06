import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { initialStock, donationHistory, sampleDonors } from "@/lib/data";

const bloodGroupData = initialStock.map(s => ({ name: s.bloodGroup, units: s.units }));
const COLORS = ["hsl(0,72%,45%)", "hsl(0,60%,55%)", "hsl(220,25%,45%)", "hsl(145,60%,40%)", "hsl(38,92%,50%)", "hsl(280,60%,50%)", "hsl(200,70%,45%)", "hsl(350,70%,50%)"];

const donorsByGroup = initialStock.map(s => ({
  name: s.bloodGroup,
  donors: sampleDonors.filter(d => d.bloodGroup === s.bloodGroup).length * 12,
}));

const monthlyActivity = [
  { month: "Nov", donations: 32, requests: 28, fulfilled: 25 },
  { month: "Dec", donations: 28, requests: 35, fulfilled: 30 },
  { month: "Jan", donations: 45, requests: 40, fulfilled: 38 },
  { month: "Feb", donations: 38, requests: 32, fulfilled: 30 },
  { month: "Mar", donations: 52, requests: 45, fulfilled: 42 },
  { month: "Apr", donations: 41, requests: 38, fulfilled: 35 },
];

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Blood bank performance insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Blood Stock Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bloodGroupData} cx="50%" cy="50%" outerRadius={100} dataKey="units" label={({ name, units }) => `${name}: ${units}`} labelLine={false}>
                  {bloodGroupData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Monthly Activity</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
                <XAxis dataKey="month" stroke="hsl(220 10% 50%)" fontSize={12} />
                <YAxis stroke="hsl(220 10% 50%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 15% 90%)", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="donations" stroke="hsl(0 72% 45%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="requests" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="fulfilled" stroke="hsl(145 60% 40%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Donation Trends (6 Months)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
                <XAxis dataKey="month" stroke="hsl(220 10% 50%)" fontSize={12} />
                <YAxis stroke="hsl(220 10% 50%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 15% 90%)", borderRadius: "8px" }} />
                <Bar dataKey="donations" fill="hsl(0 72% 45%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Donors per Blood Group</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donorsByGroup} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
                <XAxis type="number" stroke="hsl(220 10% 50%)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(220 10% 50%)" fontSize={12} width={40} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 15% 90%)", borderRadius: "8px" }} />
                <Bar dataKey="donors" fill="hsl(220 25% 45%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
