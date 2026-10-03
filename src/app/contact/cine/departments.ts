export const DEPARTMENTS = [
  { id: 'sales', name: 'Sales & Business Development', description: 'New business inquiries, product quotations, OEM partnerships and export relations.', email: 'sales@greenboy.co.in', availability: 'Mon–Sat · 9:00 AM–6:00 PM IST', response: '4–6 business hours' },
  { id: 'compliance', name: 'Compliance & Certifications', description: 'Regulatory documentation, certification verification, audit coordination and compliance queries.', email: 'compliance@greenboy.co.in', availability: 'Mon–Fri · 9:00 AM–5:30 PM IST', response: '24–48 business hours' },
  { id: 'operations', name: 'Operations & Production', description: 'Manufacturing capacity, production scheduling, quality control and facility tours.', email: 'operations@greenboy.co.in', availability: 'Mon–Sat · 8:00 AM–7:00 PM IST', response: '6–8 business hours' },
  { id: 'technical', name: 'Technical Engineering', description: 'Product specifications, custom engineering, testing procedures and technical consultations.', email: 'technical@greenboy.co.in', availability: 'Mon–Sat · 9:00 AM–6:00 PM IST', response: '4–6 business hours' },
  { id: 'support', name: 'Customer Support', description: 'Product support, warranty claims, maintenance services and spare parts.', email: 'support@greenboy.co.in', availability: '24/7 emergency support', response: '2–4 hours (urgent)' },
  { id: 'export', name: 'Export & International', description: 'International orders, export documentation, shipping coordination and global partnerships.', email: 'export@greenboy.co.in', availability: 'Mon–Sat · 9:00 AM–6:00 PM IST', response: '6–12 business hours' },
];

export const INQUIRY_TYPES = [
  { value: 'product_inquiry', label: 'Product Inquiry' },
  { value: 'quotation', label: 'Quotation Request' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'compliance', label: 'Compliance Documentation' },
  { value: 'technical', label: 'Technical Consultation' },
  { value: 'support', label: 'Product Support' },
  { value: 'export', label: 'Export Inquiry' },
  { value: 'other', label: 'Other' },
];

export const ORGANIZATION_TYPES = [
  { value: 'government', label: 'Government / Public Sector' },
  { value: 'oem', label: 'OEM / Manufacturing Partner' },
  { value: 'distributor', label: 'Distributor / Dealer' },
  { value: 'end_user', label: 'End User / Corporate' },
  { value: 'export', label: 'International Buyer' },
  { value: 'consultant', label: 'Consultant / Auditor' },
  { value: 'other', label: 'Other' },
];

export const HOURS = [
  { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM IST' },
  { day: 'Saturday', hours: '9:00 AM – 2:00 PM IST' },
  { day: 'Sunday', hours: 'Closed' },
];
