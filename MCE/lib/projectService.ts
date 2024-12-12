import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

export interface Project {
  id: string
  name: string
  company: string
  postedBy: string
  details: string
  createdAt: Date
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary: string
  createdAt: Date
}

export interface Company {
  id: string
  name: string
  industry: string
  description: string
  logo: string
  employees: string
  founded: number
}

const dummyProjects: Project[] = [
  {
    id: '1',
    name: 'Sustainable Office Complex',
    company: 'BuildRight Inc.',
    postedBy: 'John Doe',
    details: 'Design and construct a state-of-the-art sustainable office complex using green technologies and materials.',
    createdAt: new Date('2023-05-10')
  },
  {
    id: '2',
    name: 'Smart Grid Implementation',
    company: 'PowerUp Solutions',
    postedBy: 'Jane Smith',
    details: 'Implement a smart grid system for a mid-sized city to improve energy efficiency and reduce power outages.',
    createdAt: new Date('2023-05-12')
  },
  {
    id: '3',
    name: 'Urban Park Renovation',
    company: 'UrbanDev Enterprises',
    postedBy: 'Mike Johnson',
    details: 'Renovate and expand an existing urban park to include more green spaces, recreational areas, and sustainable features.',
    createdAt: new Date('2023-05-14')
  }
]

const dummyJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Construction Manager',
    company: 'BuildRight Inc.',
    location: 'New York, NY',
    description: 'Experienced construction manager needed to oversee large-scale commercial projects.',
    salary: '$80,000 - $120,000',
    createdAt: new Date('2023-05-15')
  },
  {
    id: '2',
    title: 'Electrical Engineer',
    company: 'PowerUp Solutions',
    location: 'Chicago, IL',
    description: 'Seeking a skilled electrical engineer for innovative green energy projects.',
    salary: '$70,000 - $90,000',
    createdAt: new Date('2023-05-14')
  },
  {
    id: '3',
    title: 'Project Coordinator',
    company: 'UrbanDev Enterprises',
    location: 'Los Angeles, CA',
    description: 'Organized individual needed to coordinate multiple urban development projects.',
    salary: '$50,000 - $65,000',
    createdAt: new Date('2023-05-13')
  }
]

const dummyCompanies: Company[] = [
  {
    id: '1',
    name: 'BuildRight Inc.',
    industry: 'Construction',
    description: 'Leading construction company specializing in sustainable commercial buildings.',
    logo: 'https://images.unsplash.com/photo-1507297230445-ff678f10b524?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    employees: '100-250',
    founded: 1995
  },
  {
    id: '2',
    name: 'PowerUp Solutions',
    industry: 'Electrical Engineering',
    description: 'Innovative electrical engineering firm focused on renewable energy solutions.',
    logo: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    employees: '50-100',
    founded: 2005
  },
  {
    id: '3',
    name: 'UrbanDev Enterprises',
    industry: 'Urban Planning',
    description: 'Urban development company creating sustainable and livable city spaces.',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    employees: '25-50',
    founded: 2010
  }
]

export async function searchProjects(searchTerm: string): Promise<Project[]> {
  // For now, return all dummy projects filtered by the search term
  return dummyProjects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.company.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export async function getProjectById(id: string): Promise<Project | null> {
  return dummyProjects.find(project => project.id === id) || null
}

export async function searchJobs(searchTerm: string): Promise<Job[]> {
  return dummyJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export async function getJobById(id: string): Promise<Job | null> {
  return dummyJobs.find(job => job.id === id) || null
}

export async function searchCompanies(searchTerm: string): Promise<Company[]> {
  return dummyCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export async function getCompanyById(id: string): Promise<Company | null> {
  return dummyCompanies.find(company => company.id === id) || null
}

