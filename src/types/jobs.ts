export interface Job {
  Name: string;
  Company: string;
  Keywords: string[];
  Start: string;
  End?: string;
  Title: string;
  Bullets?: string[];
  BannerAlt?: string;
}

// EXAMPLE
/*
import jobsData from '../data/jobs.json';
import { Job } from '../types/jobs';

const jobs: Job[] = jobsData;
*/