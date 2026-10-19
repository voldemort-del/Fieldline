'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CustomerSite,
  EquipmentDetail,
  ServiceRequest,
  ServiceHistoryEntry,
  ServiceReport,
  ServiceEnquirySubmission,
  ServicePriority,
  RequestStatus,
  RequestActivityMilestone,
  Quote,
  QuoteStatus,
  CreateQuoteParams,
} from '@/types';
import {
  SEED_CUSTOMER_SITES,
  SEED_EQUIPMENT,
  SEED_SERVICE_REQUESTS,
  SEED_SERVICE_REPORTS,
  SEED_SERVICE_HISTORY,
} from '@/lib/mock-data/portal-seed-data';
import { SEED_QUOTES } from '@/lib/mock-data/quotes';
import { calculateQuoteTotals } from '@/lib/utils';

interface CreateRequestParams {
  equipmentId: string;
  title: string;
  description: string;
  priority: ServicePriority;
  requestedTiming: 'immediate_emergency' | 'within_24h' | 'within_3_days' | 'routine_quote';
  reportedBy: string;
  contactPhone: string;
}

export interface TechnicianProfile {
  name: string;
  badge: string;
  specialty: string;
  status: 'available' | 'on_site' | 'dispatched';
}

export const STAFF_TECHNICIANS: TechnicianProfile[] = [
  {
    name: 'Mark Stevens',
    badge: 'Senior Commercial Refrigeration Tech (F-Gas #FG-8812)',
    specialty: 'Refrigeration, Coldrooms & Blast Chillers',
    status: 'dispatched',
  },
  {
    name: 'Chris Vance',
    badge: 'Commercial Gas Safe Catering Engineer (#559124)',
    specialty: 'Combi Ovens, Gas Ranges & CP42 Safety Audits',
    status: 'available',
  },
  {
    name: 'David Patel',
    badge: 'Warewashing & Sanitization Specialist',
    specialty: 'Hood Dishwashers & Chemical Dosing Units',
    status: 'on_site',
  },
  {
    name: 'Elena Rostova',
    badge: 'Electrical Diagnostics & Thermal Controls Tech',
    specialty: 'Induction Hobs, Steam Boilers & PCB Electronics',
    status: 'available',
  },
];

interface FieldlineContextType {
  activeSite: CustomerSite;
  setActiveSiteId: (siteId: string) => void;
  sites: CustomerSite[];
  equipment: EquipmentDetail[];
  requests: ServiceRequest[];
  reports: ServiceReport[];
  history: ServiceHistoryEntry[];
  enquiries: ServiceEnquirySubmission[];
  quotes: Quote[];
  technicians: TechnicianProfile[];
  submitEnquiry: (enquiry: Omit<ServiceEnquirySubmission, 'id' | 'submittedAt' | 'status'>) => Promise<string>;
  createServiceRequest: (params: CreateRequestParams) => Promise<string>;
  updateRequestStatus: (
    requestId: string,
    newStatus: RequestStatus,
    note?: string,
    engineerName?: string,
    resolutionNotes?: string
  ) => Promise<void>;
  addStaffNote: (requestId: string, noteText: string) => Promise<void>;
  createQuote: (params: CreateQuoteParams) => Promise<string>;
  updateQuoteDraft: (quoteId: string, params: Partial<CreateQuoteParams>) => Promise<void>;
  presentQuoteToCustomer: (quoteId: string) => Promise<void>;
  approveQuote: (quoteId: string) => Promise<void>;
  declineQuote: (quoteId: string, reason?: string) => Promise<void>;
  cancelQuote: (quoteId: string, note?: string) => Promise<void>;
  resetDemoData: () => void;
  getSiteEquipment: (siteId?: string) => EquipmentDetail[];
  getSiteRequests: (siteId?: string) => ServiceRequest[];
  getSiteReports: (siteId?: string) => ServiceReport[];
  getSiteHistory: (siteId?: string) => ServiceHistoryEntry[];
  getQuotesBySite: (siteId?: string) => Quote[];
  getQuotesByRequest: (requestId: string) => Quote[];
  getEquipmentById: (id: string) => EquipmentDetail | undefined;
  getRequestById: (id: string) => ServiceRequest | undefined;
  getReportById: (id: string) => ServiceReport | undefined;
  getQuoteById: (id: string) => Quote | undefined;
  getCustomerSite: (siteId: string) => CustomerSite | undefined;
  isSimulationMode: boolean;
  isHydrated: boolean;
}

const FieldlineContext = createContext<FieldlineContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ACTIVE_SITE: 'fl_active_site_id',
  EQUIPMENT: 'fl_portal_equipment_v2',
  REQUESTS: 'fl_portal_requests_v2',
  REPORTS: 'fl_portal_reports_v2',
  HISTORY: 'fl_portal_history_v2',
  ENQUIRIES: 'fl_portal_enquiries_v2',
  QUOTES: 'fl_portal_quotes_v2',
};

export function FieldlineProvider({ children }: { children: React.ReactNode }) {
  const [activeSiteId, setActiveSiteIdState] = useState<string>('site-hotel');
  const [equipment, setEquipment] = useState<EquipmentDetail[]>(SEED_EQUIPMENT);
  const [requests, setRequests] = useState<ServiceRequest[]>(SEED_SERVICE_REQUESTS);
  const [reports, setReports] = useState<ServiceReport[]>(SEED_SERVICE_REPORTS);
  const [history, setHistory] = useState<ServiceHistoryEntry[]>(SEED_SERVICE_HISTORY);
  const [enquiries, setEnquiries] = useState<ServiceEnquirySubmission[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>(SEED_QUOTES);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Initialize and load persisted state from localStorage safely
  useEffect(() => {
    try {
      const savedSite = localStorage.getItem(STORAGE_KEYS.ACTIVE_SITE);
      if (savedSite && SEED_CUSTOMER_SITES.some((s) => s.id === savedSite)) {
        setActiveSiteIdState(savedSite);
      }

      const savedEquipment = localStorage.getItem(STORAGE_KEYS.EQUIPMENT);
      if (savedEquipment) {
        setEquipment(JSON.parse(savedEquipment));
      }

      const savedRequests = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      if (savedRequests) {
        setRequests(JSON.parse(savedRequests));
      }

      const savedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (savedReports) {
        setReports(JSON.parse(savedReports));
      }

      const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

      const savedEnquiries = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (savedEnquiries) {
        setEnquiries(JSON.parse(savedEnquiries));
      }

      const savedQuotes = localStorage.getItem(STORAGE_KEYS.QUOTES);
      if (savedQuotes) {
        setQuotes(JSON.parse(savedQuotes));
      }
    } catch (err) {
      console.warn('Fieldline demo storage load error:', err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const setActiveSiteId = (siteId: string) => {
    setActiveSiteIdState(siteId);
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SITE, siteId);
    } catch {
      // Graceful fallback
    }
  };

  const activeSite =
    SEED_CUSTOMER_SITES.find((s) => s.id === activeSiteId) || SEED_CUSTOMER_SITES[0];

  // Enquiry submission for public marketing site
  const submitEnquiry = async (
    data: Omit<ServiceEnquirySubmission, 'id' | 'submittedAt' | 'status'>
  ): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const refNumber = `FL-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSubmission: ServiceEnquirySubmission = {
      ...data,
      id: refNumber,
      submittedAt: new Date().toISOString(),
      status: 'simulated_received',
    };

    const updated = [newSubmission, ...enquiries];
    setEnquiries(updated);

    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
    } catch {
      // Fallback
    }

    return refNumber;
  };

  // Service Request creation within Customer Portal
  const createServiceRequest = async (params: CreateRequestParams): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const matchedEquipment = equipment.find((e) => e.id === params.equipmentId);
    const equipmentName = matchedEquipment ? matchedEquipment.name : 'Commercial Kitchen Equipment';
    const randomTicketSuffix = Math.floor(1050 + Math.random() * 900);
    const ticketNumber = `REQ-2026-${randomTicketSuffix}`;
    const requestId = `req-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const newRequest: ServiceRequest = {
      id: requestId,
      ticketNumber,
      siteId: activeSite.id,
      equipmentId: params.equipmentId,
      equipmentName,
      title: params.title,
      description: params.description,
      priority: params.priority,
      status: 'submitted',
      createdAt: nowIso,
      updatedAt: nowIso,
      reportedBy: params.reportedBy,
      contactPhone: params.contactPhone,
      requestedTiming: params.requestedTiming,
      assignedEngineer: {
        name: 'Service Desk Triage Assigned',
        badge: 'Priority Verification in Progress',
      },
      activities: [
        {
          id: `act-${Date.now()}-1`,
          timestamp: nowIso,
          status: 'submitted',
          title: 'Request Submitted Online',
          description: `Fault logged via Customer Portal by ${params.reportedBy}. Reference: ${ticketNumber}.`,
          actor: params.reportedBy,
        },
      ],
    };

    // Update state & update equipment status if critical
    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);

    let updatedEquipment = equipment;
    if (params.priority === 'emergency') {
      updatedEquipment = equipment.map((eq) =>
        eq.id === params.equipmentId ? { ...eq, status: 'critical_failure' } : eq
      );
      setEquipment(updatedEquipment);
    } else if (params.priority === 'high') {
      updatedEquipment = equipment.map((eq) =>
        eq.id === params.equipmentId && eq.status === 'operational'
          ? { ...eq, status: 'degraded' }
          : eq
      );
      setEquipment(updatedEquipment);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));
      localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(updatedEquipment));
    } catch {
      // Fallback
    }

    return ticketNumber;
  };

  // Staff Operations: Update Request Status & Add Milestones
  const updateRequestStatus = async (
    requestId: string,
    newStatus: RequestStatus,
    note?: string,
    engineerName?: string,
    resolutionNotes?: string
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const nowIso = new Date().toISOString();

    const targetRequest = requests.find((r) => r.id === requestId);
    if (!targetRequest) return;

    let updatedEngineer = targetRequest.assignedEngineer;
    if (engineerName) {
      const techProfile = STAFF_TECHNICIANS.find((t) => t.name === engineerName);
      updatedEngineer = {
        name: engineerName,
        badge: techProfile?.badge || 'Certified Catering Service Engineer',
        eta: newStatus === 'scheduled' ? 'Scheduled for morning window' : 'On-Site Diagnostic',
      };
    }

    const readableStatus = newStatus.replace(/_/g, ' ');
    const milestoneTitle =
      newStatus === 'completed'
        ? 'Work Completed & Service Signed Off'
        : newStatus === 'in_progress'
        ? 'Technician On-Site / Diagnostic In Progress'
        : newStatus === 'scheduled'
        ? 'Service Attendance Scheduled'
        : newStatus === 'under_review'
        ? 'Triage Completed by Operations Desk'
        : `Status Updated to ${readableStatus}`;

    const milestoneDesc =
      note ||
      (newStatus === 'completed'
        ? resolutionNotes || 'All diagnostic tests passed. Equipment returned to operational duty.'
        : `Work order transitioned to ${readableStatus} by Fieldline operations desk.`);

    const newMilestone: RequestActivityMilestone = {
      id: `act-${Date.now()}`,
      timestamp: nowIso,
      status: newStatus,
      title: milestoneTitle,
      description: milestoneDesc,
      actor: 'Fieldline Operations Desk',
    };

    let reportId = targetRequest.linkedReportId;
    let updatedReports = reports;
    let updatedHistory = history;

    // If marked Completed: generate/link report and restore equipment condition
    if (newStatus === 'completed') {
      if (!reportId) {
        const repNumber = `REP-2026-${Math.floor(7740 + Math.random() * 200)}`;
        reportId = `rep-${Date.now()}`;
        const newReport: ServiceReport = {
          id: reportId,
          reportNumber: repNumber,
          siteId: targetRequest.siteId,
          equipmentId: targetRequest.equipmentId,
          equipmentName: targetRequest.equipmentName,
          requestId: targetRequest.id,
          date: nowIso.split('T')[0],
          technicianName: updatedEngineer?.name || 'Chris Vance',
          technicianRole: updatedEngineer?.badge || 'Commercial Catering Engineer',
          inspectionType: 'Remedial Breakdown Repair & Operational Re-Commissioning',
          summary: `Breakdown attended and resolved: ${targetRequest.title}. All safety thresholds verified.`,
          findings: note || 'Component wear remediated. Operating values verified under duty load.',
          workPerformed: resolutionNotes || 'Replaced faulty component, performed electrical earth continuity test, calibrated thermostats.',
          recommendations: 'Monitor daily operating temperatures and log any recurrence.',
          complianceCertification: 'Commercial Catering Equipment Operational Proving Standard',
          checklist: [
            { item: 'Operating Duty Pressure & Voltage', status: 'Pass', measurement: 'Verified compliant' },
            { item: 'Safety Thermostat & Cut-out Proved', status: 'Pass', measurement: 'Operational' },
            { item: 'Electrical Earth Continuity', status: 'Pass', measurement: '< 0.1 Ω' },
            { item: 'Functional Commissioning Cycle', status: 'Pass', measurement: 'Passed' },
          ],
          nextMaintenanceDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        };
        updatedReports = [newReport, ...reports];
        setReports(updatedReports);
      }

      // Add to service history log
      const newHistoryEntry: ServiceHistoryEntry = {
        id: `hist-${Date.now()}`,
        siteId: targetRequest.siteId,
        equipmentId: targetRequest.equipmentId,
        equipmentName: targetRequest.equipmentName,
        date: nowIso.split('T')[0],
        serviceType: 'Breakdown Repair',
        summary: targetRequest.title,
        workPerformed: resolutionNotes || note || 'Fault repaired and equipment recommissioned.',
        engineerName: updatedEngineer?.name || 'Fieldline Technician',
        partsReplaced: ['Diagnostic OEM replacement component'],
        costSummary: 'Covered under commercial maintenance contract SLA',
        requestId: targetRequest.id,
        reportId,
      };
      updatedHistory = [newHistoryEntry, ...history];
      setHistory(updatedHistory);
    }

    const updatedRequests = requests.map((req) =>
      req.id === requestId
        ? {
            ...req,
            status: newStatus,
            updatedAt: nowIso,
            assignedEngineer: updatedEngineer,
            resolutionNotes: resolutionNotes || (newStatus === 'completed' ? milestoneDesc : req.resolutionNotes),
            linkedReportId: reportId,
            activities: [newMilestone, ...req.activities],
          }
        : req
    );

    // If completed or resolved, restore equipment status to operational
    let updatedEquipment = equipment;
    if (newStatus === 'completed' || newStatus === 'resolved') {
      updatedEquipment = equipment.map((eq) =>
        eq.id === targetRequest.equipmentId ? { ...eq, status: 'operational', lastServiceDate: nowIso.split('T')[0] } : eq
      );
      setEquipment(updatedEquipment);
    }

    setRequests(updatedRequests);

    try {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));
      localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(updatedEquipment));
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updatedReports));
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
    } catch {
      // Fallback
    }
  };

  // Staff Operations: Append internal note
  const addStaffNote = async (requestId: string, noteText: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const nowIso = new Date().toISOString();

    const targetRequest = requests.find((r) => r.id === requestId);
    if (!targetRequest) return;

    const newMilestone: RequestActivityMilestone = {
      id: `act-${Date.now()}`,
      timestamp: nowIso,
      status: targetRequest.status,
      title: 'Internal Operations Note Added',
      description: noteText,
      actor: 'Operations Desk Staff',
    };

    const updatedRequests = requests.map((req) =>
      req.id === requestId
        ? {
            ...req,
            updatedAt: nowIso,
            activities: [newMilestone, ...req.activities],
          }
        : req
    );

    setRequests(updatedRequests);
    try {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));
    } catch {
      // Fallback
    }
  };

  // Digital Quotations Management
  const createQuote = async (params: CreateQuoteParams): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const nowIso = new Date().toISOString();
    const expiry =
      params.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const quoteNumber = `QUO-2026-${randomSuffix}`;
    const quoteId = `quo-${Date.now()}`;

    const lineItems = params.lineItems.map((li, idx) => {
      const qty = Math.max(0.01, isNaN(li.quantity) ? 1 : li.quantity);
      const price = Math.max(0, isNaN(li.unitPrice) ? 0 : li.unitPrice);
      return {
        id: `li-${Date.now()}-${idx + 1}`,
        description: li.description.trim(),
        quantity: qty,
        unitPrice: price,
        lineTotal: Math.round(qty * price * 100) / 100,
      };
    });

    const { subtotal, discount, finalTotal } = calculateQuoteTotals(
      lineItems,
      params.discount || 0
    );

    const newQuote: Quote = {
      id: quoteId,
      quoteNumber,
      siteId: params.siteId,
      requestId: params.requestId,
      equipmentId: params.equipmentId,
      equipmentName: params.equipmentName,
      title: params.title.trim(),
      description: params.description.trim(),
      status: 'draft',
      currency: 'GBP',
      lineItems,
      subtotal,
      discount,
      finalTotal,
      terms:
        params.terms ||
        'Quotation valid for 30 calendar days from issue. All parts covered by 12-month manufacturer replacement warranty. Work scheduled upon formal customer approval via portal.',
      staffAuthor: params.staffAuthor || 'Fieldline Operations Desk',
      createdAt: nowIso,
      updatedAt: nowIso,
      expiryDate: expiry,
      statusHistory: [
        {
          timestamp: nowIso,
          status: 'draft',
          note: 'Draft quotation prepared by service operations desk.',
          actor: params.staffAuthor || 'Operations Desk Staff',
        },
      ],
    };

    const updatedQuotes = [newQuote, ...quotes];
    setQuotes(updatedQuotes);

    // Update linked request
    const targetRequest = requests.find((r) => r.id === params.requestId);
    if (targetRequest) {
      const milestone: RequestActivityMilestone = {
        id: `act-${Date.now()}`,
        timestamp: nowIso,
        status: targetRequest.status,
        title: `Draft Quotation Prepared: ${quoteNumber}`,
        description: `Draft estimate of £${finalTotal.toFixed(2)} prepared for review by operations staff.`,
        actor: params.staffAuthor || 'Operations Desk Staff',
      };
      const updatedRequests = requests.map((req) =>
        req.id === params.requestId
          ? {
              ...req,
              linkedQuoteId: quoteId,
              updatedAt: nowIso,
              activities: [milestone, ...req.activities],
            }
          : req
      );
      setRequests(updatedRequests);
      try {
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));
      } catch {}
    }

    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updatedQuotes));
    } catch {}

    return quoteId;
  };

  const updateQuoteDraft = async (
    quoteId: string,
    params: Partial<CreateQuoteParams>
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const nowIso = new Date().toISOString();
    const existing = quotes.find((q) => q.id === quoteId);
    if (!existing || existing.status !== 'draft') {
      throw new Error('Only draft quotations can be modified.');
    }

    let lineItems = existing.lineItems;
    if (params.lineItems) {
      lineItems = params.lineItems.map((li, idx) => {
        const qty = Math.max(0.01, isNaN(li.quantity) ? 1 : li.quantity);
        const price = Math.max(0, isNaN(li.unitPrice) ? 0 : li.unitPrice);
        return {
          id: `li-${Date.now()}-${idx + 1}`,
          description: li.description.trim(),
          quantity: qty,
          unitPrice: price,
          lineTotal: Math.round(qty * price * 100) / 100,
        };
      });
    }

    const { subtotal, discount, finalTotal } = calculateQuoteTotals(
      lineItems,
      params.discount !== undefined ? params.discount : existing.discount || 0
    );

    const updatedQuote: Quote = {
      ...existing,
      title: params.title !== undefined ? params.title.trim() : existing.title,
      description:
        params.description !== undefined ? params.description.trim() : existing.description,
      expiryDate: params.expiryDate || existing.expiryDate,
      terms: params.terms !== undefined ? params.terms : existing.terms,
      lineItems,
      subtotal,
      discount,
      finalTotal,
      updatedAt: nowIso,
      statusHistory: [
        {
          timestamp: nowIso,
          status: 'draft',
          note: 'Quotation draft updated with revised line items or terms.',
          actor: 'Operations Desk Staff',
        },
        ...existing.statusHistory,
      ],
    };

    const updatedQuotes = quotes.map((q) => (q.id === quoteId ? updatedQuote : q));
    setQuotes(updatedQuotes);
    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updatedQuotes));
    } catch {}
  };

  const presentQuoteToCustomer = async (quoteId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const nowIso = new Date().toISOString();
    const targetQuote = quotes.find((q) => q.id === quoteId);
    if (!targetQuote) throw new Error('Quotation not found.');
    if (targetQuote.status !== 'draft') {
      throw new Error('Only draft quotations can be presented to customer.');
    }
    if (targetQuote.lineItems.length === 0) {
      throw new Error('Cannot present a quotation with no line items.');
    }

    const updatedQuote: Quote = {
      ...targetQuote,
      status: 'awaiting_customer',
      updatedAt: nowIso,
      statusHistory: [
        {
          timestamp: nowIso,
          status: 'awaiting_customer',
          note: 'Quotation presented to Customer Portal for authorization.',
          actor: 'Operations Desk Dispatcher',
        },
        ...targetQuote.statusHistory,
      ],
    };

    const updatedQuotes = quotes.map((q) => (q.id === quoteId ? updatedQuote : q));
    setQuotes(updatedQuotes);

    // Update linked request activity
    const targetRequest = requests.find((r) => r.id === targetQuote.requestId);
    if (targetRequest) {
      const milestone: RequestActivityMilestone = {
        id: `act-${Date.now()}`,
        timestamp: nowIso,
        status: targetRequest.status,
        title: `Quotation Presented for Authorization: ${targetQuote.quoteNumber}`,
        description: `Formal quotation ${targetQuote.quoteNumber} (£${targetQuote.finalTotal.toFixed(2)}) published to customer portal for review.`,
        actor: 'Fieldline Operations Desk',
      };
      const updatedRequests = requests.map((req) =>
        req.id === targetQuote.requestId
          ? {
              ...req,
              linkedQuoteId: quoteId,
              updatedAt: nowIso,
              activities: [milestone, ...req.activities],
            }
          : req
      );
      setRequests(updatedRequests);
      try {
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));
      } catch {}
    }

    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updatedQuotes));
    } catch {}
  };

  const approveQuote = async (quoteId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const nowIso = new Date().toISOString();
    const targetQuote = quotes.find((q) => q.id === quoteId);
    if (!targetQuote) throw new Error('Quotation not found.');
    if (targetQuote.status !== 'awaiting_customer') {
      throw new Error('Quotation cannot be approved in its current state.');
    }

    // Check expiry
    if (new Date(targetQuote.expiryDate).getTime() < Date.now()) {
      throw new Error('This quotation has expired and can no longer be approved.');
    }

    const customerSite = SEED_CUSTOMER_SITES.find((s) => s.id === targetQuote.siteId);
    const actorName = customerSite?.contact.name || 'Client Authorizer';

    const updatedQuote: Quote = {
      ...targetQuote,
      status: 'approved',
      updatedAt: nowIso,
      customerDecisionDate: nowIso,
      statusHistory: [
        {
          timestamp: nowIso,
          status: 'approved',
          note: `Quotation approved via Customer Portal by ${actorName}. Demonstration authorization recorded.`,
          actor: actorName,
        },
        ...targetQuote.statusHistory,
      ],
    };

    const updatedQuotes = quotes.map((q) => (q.id === quoteId ? updatedQuote : q));
    setQuotes(updatedQuotes);

    // Update request
    const targetRequest = requests.find((r) => r.id === targetQuote.requestId);
    if (targetRequest) {
      const milestone: RequestActivityMilestone = {
        id: `act-${Date.now()}`,
        timestamp: nowIso,
        status: targetRequest.status,
        title: `Quotation Approved: ${targetQuote.quoteNumber}`,
        description: `Customer authorization confirmed for ${targetQuote.quoteNumber} (£${targetQuote.finalTotal.toFixed(2)}). Service operations desk notified to proceed with parts ordering and scheduling.`,
        actor: actorName,
      };
      const updatedRequests = requests.map((req) =>
        req.id === targetQuote.requestId
          ? {
              ...req,
              updatedAt: nowIso,
              activities: [milestone, ...req.activities],
            }
          : req
      );
      setRequests(updatedRequests);
      try {
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));
      } catch {}
    }

    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updatedQuotes));
    } catch {}
  };

  const declineQuote = async (quoteId: string, reason?: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const nowIso = new Date().toISOString();
    const targetQuote = quotes.find((q) => q.id === quoteId);
    if (!targetQuote) throw new Error('Quotation not found.');
    if (targetQuote.status !== 'awaiting_customer') {
      throw new Error('Quotation cannot be declined in its current state.');
    }

    const customerSite = SEED_CUSTOMER_SITES.find((s) => s.id === targetQuote.siteId);
    const actorName = customerSite?.contact.name || 'Client Authorizer';

    const updatedQuote: Quote = {
      ...targetQuote,
      status: 'declined',
      updatedAt: nowIso,
      customerDecisionDate: nowIso,
      declineReason: reason?.trim() || undefined,
      statusHistory: [
        {
          timestamp: nowIso,
          status: 'declined',
          note: reason?.trim()
            ? `Quotation declined by ${actorName}. Stated reason: "${reason.trim()}"`
            : `Quotation declined via portal by ${actorName}.`,
          actor: actorName,
        },
        ...targetQuote.statusHistory,
      ],
    };

    const updatedQuotes = quotes.map((q) => (q.id === quoteId ? updatedQuote : q));
    setQuotes(updatedQuotes);

    // Update request
    const targetRequest = requests.find((r) => r.id === targetQuote.requestId);
    if (targetRequest) {
      const milestone: RequestActivityMilestone = {
        id: `act-${Date.now()}`,
        timestamp: nowIso,
        status: targetRequest.status,
        title: `Quotation Declined: ${targetQuote.quoteNumber}`,
        description: reason?.trim()
          ? `Customer declined quotation ${targetQuote.quoteNumber}. Reason: "${reason.trim()}". Service desk reviewing alternative options.`
          : `Customer declined quotation ${targetQuote.quoteNumber}. Service desk reviewing alternative options.`,
        actor: actorName,
      };
      const updatedRequests = requests.map((req) =>
        req.id === targetQuote.requestId
          ? {
              ...req,
              updatedAt: nowIso,
              activities: [milestone, ...req.activities],
            }
          : req
      );
      setRequests(updatedRequests);
      try {
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));
      } catch {}
    }

    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updatedQuotes));
    } catch {}
  };

  const cancelQuote = async (quoteId: string, note?: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const nowIso = new Date().toISOString();
    const targetQuote = quotes.find((q) => q.id === quoteId);
    if (!targetQuote) throw new Error('Quotation not found.');
    if (targetQuote.status === 'approved' || targetQuote.status === 'declined') {
      throw new Error('Cannot cancel a quotation that has already received a customer decision.');
    }

    const updatedQuote: Quote = {
      ...targetQuote,
      status: 'cancelled',
      updatedAt: nowIso,
      statusHistory: [
        {
          timestamp: nowIso,
          status: 'cancelled',
          note: note?.trim() || 'Quotation withdrawn by operations desk.',
          actor: 'Operations Desk Staff',
        },
        ...targetQuote.statusHistory,
      ],
    };

    const updatedQuotes = quotes.map((q) => (q.id === quoteId ? updatedQuote : q));
    setQuotes(updatedQuotes);

    const targetRequest = requests.find((r) => r.id === targetQuote.requestId);
    if (targetRequest) {
      const milestone: RequestActivityMilestone = {
        id: `act-${Date.now()}`,
        timestamp: nowIso,
        status: targetRequest.status,
        title: `Quotation Cancelled: ${targetQuote.quoteNumber}`,
        description:
          note?.trim() || `Quotation ${targetQuote.quoteNumber} cancelled by operations staff.`,
        actor: 'Operations Desk Staff',
      };
      const updatedRequests = requests.map((req) =>
        req.id === targetQuote.requestId
          ? {
              ...req,
              updatedAt: nowIso,
              activities: [milestone, ...req.activities],
            }
          : req
      );
      setRequests(updatedRequests);
      try {
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));
      } catch {}
    }

    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updatedQuotes));
    } catch {}
  };

  const resetDemoData = () => {
    setActiveSiteIdState('site-hotel');
    setEquipment(SEED_EQUIPMENT);
    setRequests(SEED_SERVICE_REQUESTS);
    setReports(SEED_SERVICE_REPORTS);
    setHistory(SEED_SERVICE_HISTORY);
    setEnquiries([]);
    setQuotes(SEED_QUOTES);

    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SITE);
      localStorage.removeItem(STORAGE_KEYS.EQUIPMENT);
      localStorage.removeItem(STORAGE_KEYS.REQUESTS);
      localStorage.removeItem(STORAGE_KEYS.REPORTS);
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
      localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
      localStorage.removeItem(STORAGE_KEYS.QUOTES);
    } catch {
      // Fallback
    }
  };

  // Queries
  const getSiteEquipment = (siteId: string = activeSite.id) =>
    equipment.filter((e) => e.siteId === siteId);

  const getSiteRequests = (siteId: string = activeSite.id) =>
    requests.filter((r) => r.siteId === siteId);

  const getSiteReports = (siteId: string = activeSite.id) =>
    reports.filter((r) => r.siteId === siteId);

  const getSiteHistory = (siteId: string = activeSite.id) =>
    history.filter((h) => h.siteId === siteId);

  const getQuotesBySite = (siteId: string = activeSite.id) =>
    quotes.filter((q) => q.siteId === siteId);

  const getQuotesByRequest = (requestId: string) =>
    quotes.filter((q) => q.requestId === requestId);

  const getEquipmentById = (id: string) => equipment.find((e) => e.id === id);
  const getRequestById = (id: string) =>
    requests.find((r) => r.id === id || r.ticketNumber === id);
  const getReportById = (id: string) =>
    reports.find((rep) => rep.id === id || rep.reportNumber === id);
  const getQuoteById = (id: string) =>
    quotes.find((q) => q.id === id || q.quoteNumber === id);
  const getCustomerSite = (siteId: string) =>
    SEED_CUSTOMER_SITES.find((s) => s.id === siteId);

  return (
    <FieldlineContext.Provider
      value={{
        activeSite,
        setActiveSiteId,
        sites: SEED_CUSTOMER_SITES,
        equipment,
        requests,
        reports,
        history,
        enquiries,
        quotes,
        technicians: STAFF_TECHNICIANS,
        submitEnquiry,
        createServiceRequest,
        updateRequestStatus,
        addStaffNote,
        createQuote,
        updateQuoteDraft,
        presentQuoteToCustomer,
        approveQuote,
        declineQuote,
        cancelQuote,
        resetDemoData,
        getSiteEquipment,
        getSiteRequests,
        getSiteReports,
        getSiteHistory,
        getQuotesBySite,
        getQuotesByRequest,
        getEquipmentById,
        getRequestById,
        getReportById,
        getQuoteById,
        getCustomerSite,
        isSimulationMode: true,
        isHydrated,
      }}
    >
      {children}
    </FieldlineContext.Provider>
  );
}

export function useFieldline() {
  const context = useContext(FieldlineContext);
  if (!context) {
    throw new Error('useFieldline must be used within a FieldlineProvider');
  }
  return context;
}
