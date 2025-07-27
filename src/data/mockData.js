// Mock data for the Tika Admin Portal

export const mockUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    lastActive: '2024-01-15T10:30:00Z',
    documents: 15,
    status: 'active',
    role: 'Controller',
    organization: 'TechCorp Inc.'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    lastActive: '2024-01-14T16:45:00Z',
    documents: 8,
    status: 'active',
    role: 'User',
    organization: 'TechCorp Inc.'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    lastActive: '2024-01-13T09:15:00Z',
    documents: 23,
    status: 'inactive',
    role: 'User',
    organization: 'TechCorp Inc.'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    lastActive: '2024-01-15T14:20:00Z',
    documents: 12,
    status: 'active',
    role: 'Controller',
    organization: 'TechCorp Inc.'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@company.com',
    lastActive: '2024-01-12T11:30:00Z',
    documents: 5,
    status: 'active',
    role: 'User',
    organization: 'TechCorp Inc.'
  }
];

export const mockUploads = [
  {
    id: 1,
    filename: 'Q4_Financial_Report.pdf',
    user: 'John Smith',
    date: '2024-01-15T10:30:00Z',
    fileType: 'PDF',
    category: 'Financial',
    size: '2.4 MB'
  },
  {
    id: 2,
    filename: 'Employee_Handbook.docx',
    user: 'Sarah Johnson',
    date: '2024-01-14T16:45:00Z',
    fileType: 'DOCX',
    category: 'HR Policy',
    size: '1.8 MB'
  },
  {
    id: 3,
    filename: 'January_Payslips.xlsx',
    user: 'Mike Wilson',
    date: '2024-01-13T09:15:00Z',
    fileType: 'XLSX',
    category: 'Payslip',
    size: '3.2 MB'
  },
  {
    id: 4,
    filename: 'Security_Policy.pdf',
    user: 'Emily Davis',
    date: '2024-01-12T14:20:00Z',
    fileType: 'PDF',
    category: 'Policy',
    size: '1.5 MB'
  },
  {
    id: 5,
    filename: 'Project_Proposal.pptx',
    user: 'David Brown',
    date: '2024-01-11T11:30:00Z',
    fileType: 'PPTX',
    category: 'Project',
    size: '4.1 MB'
  }
];

export const mockActivityFeed = [
  {
    id: 1,
    timestamp: '2024-01-15T15:30:00Z',
    action: 'Upload',
    fileName: 'Q4_Financial_Report.pdf',
    linkedUser: 'John Smith',
    controller: 'Emily Davis'
  },
  {
    id: 2,
    timestamp: '2024-01-15T14:20:00Z',
    action: 'Delete',
    fileName: 'Old_Report.pdf',
    linkedUser: 'Sarah Johnson',
    controller: 'John Smith'
  },
  {
    id: 3,
    timestamp: '2024-01-15T13:15:00Z',
    action: 'Upload',
    fileName: 'Employee_Handbook.docx',
    linkedUser: 'Sarah Johnson',
    controller: 'Emily Davis'
  },
  {
    id: 4,
    timestamp: '2024-01-15T12:00:00Z',
    action: 'Edit',
    fileName: 'Security_Policy.pdf',
    linkedUser: 'Mike Wilson',
    controller: 'John Smith'
  },
  {
    id: 5,
    timestamp: '2024-01-15T11:45:00Z',
    action: 'Upload',
    fileName: 'January_Payslips.xlsx',
    linkedUser: 'Mike Wilson',
    controller: 'Emily Davis'
  }
];

export const mockAuditLog = [
  {
    id: 1,
    timestamp: '2024-01-15T15:30:00Z',
    action: 'Upload',
    fileName: 'Q4_Financial_Report.pdf',
    targetUser: 'John Smith',
    controllerName: 'Emily Davis',
    ipAddress: '192.168.1.100'
  },
  {
    id: 2,
    timestamp: '2024-01-15T14:20:00Z',
    action: 'Delete',
    fileName: 'Old_Report.pdf',
    targetUser: 'Sarah Johnson',
    controllerName: 'John Smith',
    ipAddress: '192.168.1.101'
  },
  {
    id: 3,
    timestamp: '2024-01-15T13:15:00Z',
    action: 'Upload',
    fileName: 'Employee_Handbook.docx',
    targetUser: 'Sarah Johnson',
    controllerName: 'Emily Davis',
    ipAddress: '192.168.1.102'
  },
  {
    id: 4,
    timestamp: '2024-01-15T12:00:00Z',
    action: 'Edit',
    fileName: 'Security_Policy.pdf',
    targetUser: 'Mike Wilson',
    controllerName: 'John Smith',
    ipAddress: '192.168.1.103'
  },
  {
    id: 5,
    timestamp: '2024-01-15T11:45:00Z',
    action: 'Upload',
    fileName: 'January_Payslips.xlsx',
    targetUser: 'Mike Wilson',
    controllerName: 'Emily Davis',
    ipAddress: '192.168.1.104'
  }
];

export const mockReports = {
  uploadsByController: [
    { controller: 'Emily Davis', uploads: 12 },
    { controller: 'John Smith', uploads: 8 },
    { controller: 'Sarah Johnson', uploads: 5 }
  ],
  activeUsers: [
    { name: 'John Smith', documents: 15, lastActive: '2024-01-15T10:30:00Z' },
    { name: 'Sarah Johnson', documents: 8, lastActive: '2024-01-14T16:45:00Z' },
    { name: 'Emily Davis', documents: 12, lastActive: '2024-01-15T14:20:00Z' }
  ],
  monthlyTrends: [
    { month: 'Jan', uploads: 45, deletions: 12 },
    { month: 'Feb', uploads: 52, deletions: 8 },
    { month: 'Mar', uploads: 38, deletions: 15 },
    { month: 'Apr', uploads: 61, deletions: 10 },
    { month: 'May', uploads: 48, deletions: 13 },
    { month: 'Jun', uploads: 55, deletions: 9 }
  ]
};

export const mockProfile = {
  fullName: 'John Smith',
  email: 'john.smith@company.com',
  organization: 'TechCorp Inc.',
  role: 'Controller',
  lastLogin: '2024-01-15T10:30:00Z',
  totalUploads: 45,
  totalDeletions: 12,
  mostRecentAction: 'Uploaded Q4_Financial_Report.pdf',
  twoFactorEnabled: true,
  lastPasswordChange: '2024-01-01T00:00:00Z'
};

export const mockCategories = [
  'Financial',
  'HR Policy',
  'Payslip',
  'Policy',
  'Project',
  'Contract',
  'Invoice',
  'Report'
];

export const mockFileTypes = [
  'PDF',
  'DOCX',
  'XLSX',
  'PPTX',
  'TXT',
  'JPG',
  'PNG'
]; 