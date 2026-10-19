// Fieldline Comprehensive Domain Types

export type EquipmentCategory =
  | 'combi_oven'
  | 'prime_cooking'
  | 'refrigeration'
  | 'warewashing'
  | 'ventilation_extraction'
  | 'beverage_prep';

export type EquipmentStatus =
  | 'operational'
  | 'degraded'
  | 'critical_failure'
  | 'under_service'
  | 'decommissioned';

export type ServicePriority = 'emergency' | 'high' | 'standard' | 'scheduled_ppm';

export type RequestStatus =
  | 'submitted'
  | 'under_review'
  | 'scheduled'
  | 'engineer_dispatched'
  | 'in_progress'
  | 'awaiting_parts'
  | 'resolved'
  | 'completed'
  | 'cancelled';

export type IndustryType =
  | 'restaurants'
  | 'hotels'
  | 'contract_catering'
  | 'care_facilities';

export type ContractTier = 'comprehensive_plus' | 'preventative_core' | 'on_demand';

export interface CustomerSite {
  id: string;
  name: string;
  industry: IndustryType;
  accountNumber: string; // e.g. "FL-LON-8492"
  address: {
    line1: string;
    city: string;
    postcode: string;
  };
  contact: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  contractTier: ContractTier;
  totalAssetsCount: number;
}

export interface EquipmentDetail {
  id: string;
  assetTag: string; // e.g. "FL-EQ-8812"
  siteId: string;
  name: string;
  brand: string;
  model: string;
  serialNumber: string;
  category: EquipmentCategory;
  location: string;
  installationDate: string;
  warrantyExpiry: string;
  lastServiceDate: string;
  nextPpmDueDate: string;
  status: EquipmentStatus;
  specifications: string;
  notes?: string;
}

export interface RequestActivityMilestone {
  id: string;
  timestamp: string;
  status: RequestStatus;
  title: string;
  description: string;
  actor: string;
}

export interface ServiceRequest {
  id: string; // e.g. "req-101"
  ticketNumber: string; // e.g. "REQ-2026-1048"
  siteId: string;
  equipmentId: string;
  equipmentName: string;
  title: string;
  description: string;
  priority: ServicePriority;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  reportedBy: string;
  contactPhone: string;
  requestedTiming: 'immediate_emergency' | 'within_24h' | 'within_3_days' | 'routine_quote';
  assignedEngineer?: {
    name: string;
    badge: string;
    eta?: string;
  };
  activities: RequestActivityMilestone[];
  linkedReportId?: string;
  linkedQuoteId?: string;
  resolutionNotes?: string;
}

export interface ServiceHistoryEntry {
  id: string;
  siteId: string;
  equipmentId: string;
  equipmentName: string;
  date: string;
  serviceType: 'Breakdown Repair' | 'Planned Preventative Maintenance (PPM)' | 'Statutory Gas Safety Inspection' | 'Emergency Callout';
  summary: string;
  workPerformed: string;
  engineerName: string;
  partsReplaced: string[];
  costSummary: string;
  requestId?: string;
  reportId?: string;
}

export interface ReportChecklistItem {
  item: string;
  status: 'Pass' | 'Advisory' | 'Fail';
  measurement?: string;
}

export interface ServiceReport {
  id: string; // e.g. "rep-7729"
  reportNumber: string; // e.g. "REP-2026-7729"
  siteId: string;
  equipmentId: string;
  equipmentName: string;
  requestId?: string;
  date: string;
  technicianName: string;
  technicianRole: string;
  inspectionType: string;
  summary: string;
  findings: string;
  workPerformed: string;
  recommendations: string;
  complianceCertification: string; // e.g. "CP42 Commercial Gas Safety Proved"
  checklist: ReportChecklistItem[];
  nextMaintenanceDate: string;
}

export interface ServiceEnquirySubmission {
  id: string;
  businessName: string;
  contactName: string;
  businessEmail: string;
  phone: string;
  siteLocation: string;
  industry: IndustryType | 'other';
  equipmentCategory: EquipmentCategory;
  equipmentDetails?: string;
  issueDescription: string;
  requestedTiming: 'immediate_emergency' | 'within_24h' | 'within_3_days' | 'routine_quote';
  submittedAt: string;
  status: 'simulated_received';
}

export interface CommercialEquipmentSummary {
  id: string;
  assetTag: string;
  name: string;
  brand: string;
  model: string;
  category: EquipmentCategory;
  location: string;
  status: EquipmentStatus;
  lastService: string;
  nextPpm: string;
}

export interface ServiceRequestSummary {
  id: string;
  ticketNumber: string;
  siteName: string;
  assetName: string;
  title: string;
  priority: ServicePriority;
  status: RequestStatus;
  createdAt: string;
  assignedEngineer?: string;
}

// Digital Quotation Domain Types
export type QuoteStatus =
  | 'draft'
  | 'awaiting_customer'
  | 'approved'
  | 'declined'
  | 'expired'
  | 'cancelled';

export interface QuoteLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface QuoteStatusHistoryEntry {
  timestamp: string;
  status: QuoteStatus;
  note?: string;
  actor: string;
}

export interface Quote {
  id: string; // e.g. "quo-101"
  quoteNumber: string; // e.g. "QUO-2026-1048"
  siteId: string;
  requestId: string;
  equipmentId?: string;
  equipmentName?: string;
  title: string;
  description: string;
  status: QuoteStatus;
  currency: 'GBP';
  lineItems: QuoteLineItem[];
  subtotal: number;
  discount?: number;
  finalTotal: number;
  terms?: string;
  staffAuthor: string;
  createdAt: string;
  updatedAt: string;
  expiryDate: string; // ISO date string
  customerDecisionDate?: string;
  declineReason?: string;
  statusHistory: QuoteStatusHistoryEntry[];
}

export interface CreateQuoteParams {
  siteId: string;
  requestId: string;
  equipmentId?: string;
  equipmentName?: string;
  title: string;
  description: string;
  expiryDate?: string;
  terms?: string;
  discount?: number;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  staffAuthor?: string;
}

