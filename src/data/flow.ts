export type Perspective = 'Alex' | 'Amy';

export interface FlowStep {
  id: string;
  stepNumber: number;
  label: string;
  blurb: string;
  perspective: Perspective;
  fidelity: 'low' | 'high';
  component: string; // component name, used for routing
  supportsQuoteAdvisorToggle?: boolean; // show layout picker in control panel
  supportsFSHLayoutToggle?: boolean;    // show FSH table layout picker in control panel
}

export const flowSteps: FlowStep[] = [
  {
    id: 'post-job',
    stepNumber: 1,
    label: 'Post a job (LTS)',
    blurb: 'Alex wants to post a job on LinkedIn to find new hires. He starts the "post a job" flow and specifies the job description and job settings.',
    perspective: 'Alex',
    fidelity: 'low',
    component: 'PostJobScreen',
  },
  {
    id: 'plan-selection',
    stepNumber: 2,
    label: 'Choose a Plan (LTS)',
    blurb: 'Alex selects Full service hiring plan and clicks Submit.',
    perspective: 'Alex',
    fidelity: 'low',
    component: 'PlanSelectionScreen',
  },
  {
    id: 'phone-modal',
    stepNumber: 3,
    label: 'Enter phone number (LTS)',
    blurb: 'A modal opens up where he can choose to enter his phone number.',
    perspective: 'Alex',
    fidelity: 'low',
    component: 'PhoneModalScreen',
  },
  {
    id: 'job-plan',
    stepNumber: 4,
    label: 'Job plan (LTS)',
    blurb: 'He is taken to his job plan page. No payment details are collected at this point, only job details and settings. No specification on how many people customer wants to hire...',
    perspective: 'Alex',
    fidelity: 'low',
    component: 'JobPlanScreen',
  },
  {
    id: 'amy-crm',
    stepNumber: 5,
    label: 'HireNow CRM intake (LTS)',
    blurb: 'Amy sees Alex appear in her Leads list in HireNow CRM, and reaches out to understand his hiring needs. Amy confirms that Alex is the right fit for Full Service Hiring. Amy clicks More Info, on Alex\'s lead row.',
    perspective: 'Amy',
    fidelity: 'high',
    component: 'AmyCRMScreen',
  },
  {
    id: 'amy-crm-detail',
    stepNumber: 6,
    label: 'HireNow lead detail (LTS)',
    blurb: "Amy opens Alex's lead details page in the HireNow CRM and clicks the \"Create quote in Solution Builder\" link.",
    perspective: 'Amy',
    fidelity: 'high',
    component: 'AmyCRMDetailScreen',
  },
  {
    id: 'solution-builder',
    stepNumber: 7,
    label: 'Build quote in Solution Builder (LBP)',
    blurb: "In Solution Builder Amy can configure a tailored quote based on talking to Alex. For MVP the customer is already preselected and cannot be edited. The value is determined based on the Lead detail page she navigated here from.<br><br>To proceed please add <strong>1+ products</strong> and ensure no errors on page.",
    perspective: 'Amy',
    fidelity: 'high',
    component: 'SolutionBuilderScreen',
    supportsQuoteAdvisorToggle: true,
    supportsFSHLayoutToggle: true,
  },
  {
    id: 'solution-builder-filled',
    stepNumber: 9,
    label: 'Checkout link in Solution Builder (LBP)',
    blurb: 'The view updates, the checkout link has been generated. She sees the status of this quote move from "Quote in progress". A read only view of the order is shown. Amy shares the checkout link with Alex.',
    perspective: 'Amy',
    fidelity: 'high',
    component: 'SolutionBuilderScreen',
  },
  {
    id: 'checkout',
    stepNumber: 10,
    label: 'Email checkout link (LBP)',
    blurb: 'Alex opens the link that Amy has shared with him via email.',
    perspective: 'Alex',
    fidelity: 'low',
    component: 'CheckoutScreen',
  },
  {
    id: 'checkout-page',
    stepNumber: 11,
    label: 'Open checkout link (LBP)',
    blurb: 'Alex is already logged into linkedin.com, he opens the link and sees the custom checkout page. He can clearly understand that he owes nothing now. He clicks "Place order."',
    perspective: 'Alex',
    fidelity: 'high',
    component: 'CheckoutPageScreen',
  },
  {
    id: 'order-confirmation',
    stepNumber: 12,
    label: 'Order success (LBP)',
    blurb: 'Alex sees a confirmation/success page where he can view his order number and order summary (this is important to have since we don\'t have Admin Center UX for MVP).',
    perspective: 'Alex',
    fidelity: 'high',
    component: 'OrderConfirmationScreen',
  },
  // Additional steps will be added as screens are fed in
];
