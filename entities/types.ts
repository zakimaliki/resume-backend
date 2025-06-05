export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  teamDescription: string;
  jobDescription: string;
  responsibilities: string[];
  recruitmentTeamName: string;
  recruitmentManager: string;
  createdAt: Date;
  updatedAt: Date;
  interviewers?: Interviewer[];
  candidates?: Candidate[];
}

export interface Interviewer {
  id: string;
  jobId: string;
  department: string;
  name: string;
  createdAt: Date;
}

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  location: string;
  resumeData: any; // You might want to type this more specifically based on your needs
  createdAt: Date;
} 