export interface JobRequisition {
    id: string;
    // Section 1: Basic Info
    title: string;
    department: string;
    location: string;
    employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    positions: number;
    priority: 'High' | 'Medium' | 'Low';

    // Section 2: Job Details
    description: string;
    skills: string[];
    experienceRange: string;
    education: string;
    salaryMin?: number;
    salaryMax?: number;

    // Section 3: Workflow
    hiringManager: string;
    recruiter: string;
    interviewPanel: string[];

    // Section 4: Approval
    approver1: string; // Manager
    approver2: string; // HR Head
    status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';
    timeline: TimelineEvent[];
}

export interface TimelineEvent {
    step: string;
    approver: string;
    date: Date;
    status: 'Completed' | 'Pending' | 'Current';
}