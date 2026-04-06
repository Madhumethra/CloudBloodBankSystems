export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Donor {
  id: string;
  name: string;
  age: number;
  bloodGroup: BloodGroup;
  phone: string;
  email: string;
  address: string;
  lastDonation: string;
  totalDonations: number;
  status: 'active' | 'inactive' | 'deferred';
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  units: number;
  hospital: string;
  urgency: 'normal' | 'urgent' | 'critical';
  status: 'pending' | 'approved' | 'fulfilled' | 'cancelled';
  requestDate: string;
  requiredBy: string;
  contactPhone: string;
}

export interface BloodStock {
  bloodGroup: BloodGroup;
  units: number;
  lastUpdated: string;
}

export const bloodCompatibility: Record<BloodGroup, BloodGroup[]> = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'],
};

export const initialStock: BloodStock[] = [
  { bloodGroup: 'A+', units: 45, lastUpdated: '2026-04-06' },
  { bloodGroup: 'A-', units: 12, lastUpdated: '2026-04-05' },
  { bloodGroup: 'B+', units: 38, lastUpdated: '2026-04-06' },
  { bloodGroup: 'B-', units: 8, lastUpdated: '2026-04-04' },
  { bloodGroup: 'AB+', units: 15, lastUpdated: '2026-04-06' },
  { bloodGroup: 'AB-', units: 5, lastUpdated: '2026-04-03' },
  { bloodGroup: 'O+', units: 52, lastUpdated: '2026-04-06' },
  { bloodGroup: 'O-', units: 20, lastUpdated: '2026-04-05' },
];

export const sampleDonors: Donor[] = [
  { id: '1', name: 'Rahul Sharma', age: 28, bloodGroup: 'O+', phone: '+91 98765 43210', email: 'rahul@email.com', address: 'Mumbai, Maharashtra', lastDonation: '2026-02-15', totalDonations: 8, status: 'active' },
  { id: '2', name: 'Priya Patel', age: 32, bloodGroup: 'A+', phone: '+91 87654 32109', email: 'priya@email.com', address: 'Delhi, NCR', lastDonation: '2026-01-20', totalDonations: 5, status: 'active' },
  { id: '3', name: 'Amit Kumar', age: 25, bloodGroup: 'B+', phone: '+91 76543 21098', email: 'amit@email.com', address: 'Bangalore, Karnataka', lastDonation: '2025-12-10', totalDonations: 3, status: 'active' },
  { id: '4', name: 'Sneha Reddy', age: 29, bloodGroup: 'AB+', phone: '+91 65432 10987', email: 'sneha@email.com', address: 'Hyderabad, Telangana', lastDonation: '2026-03-01', totalDonations: 12, status: 'active' },
  { id: '5', name: 'Vikram Singh', age: 35, bloodGroup: 'O-', phone: '+91 54321 09876', email: 'vikram@email.com', address: 'Pune, Maharashtra', lastDonation: '2025-11-05', totalDonations: 15, status: 'inactive' },
  { id: '6', name: 'Ananya Gupta', age: 22, bloodGroup: 'A-', phone: '+91 43210 98765', email: 'ananya@email.com', address: 'Chennai, Tamil Nadu', lastDonation: '2026-03-20', totalDonations: 2, status: 'active' },
];

export const sampleRequests: BloodRequest[] = [
  { id: '1', patientName: 'Ravi Mehta', bloodGroup: 'O+', units: 3, hospital: 'Apollo Hospital', urgency: 'critical', status: 'pending', requestDate: '2026-04-06', requiredBy: '2026-04-07', contactPhone: '+91 99887 76655' },
  { id: '2', patientName: 'Lakshmi Nair', bloodGroup: 'A+', units: 2, hospital: 'Fortis Healthcare', urgency: 'urgent', status: 'approved', requestDate: '2026-04-05', requiredBy: '2026-04-08', contactPhone: '+91 88776 65544' },
  { id: '3', patientName: 'Suresh Iyer', bloodGroup: 'B-', units: 1, hospital: 'Max Hospital', urgency: 'normal', status: 'fulfilled', requestDate: '2026-04-03', requiredBy: '2026-04-10', contactPhone: '+91 77665 54433' },
  { id: '4', patientName: 'Kavitha Das', bloodGroup: 'AB+', units: 4, hospital: 'AIIMS', urgency: 'critical', status: 'pending', requestDate: '2026-04-06', requiredBy: '2026-04-06', contactPhone: '+91 66554 43322' },
];

export const donationHistory = [
  { month: 'Nov', donations: 32 },
  { month: 'Dec', donations: 28 },
  { month: 'Jan', donations: 45 },
  { month: 'Feb', donations: 38 },
  { month: 'Mar', donations: 52 },
  { month: 'Apr', donations: 41 },
];
