# HireFlow - AI Recruitment System

## Overview

AI-powered recruitment platform that automates CV screening, candidate matching, and initial interviews. Reduces manual HR workload by 80% while ensuring fair, consistent evaluation.

## Problem

- Recruiters spend 6-7 seconds per resume, manually reviewing hundreds
- Initial interviews are time-consuming and inconsistent
- Human bias and fatigue affect hiring decisions
- Cannot scale beyond 50-100 applicants efficiently

## Solution

Automate early-stage recruitment from application through initial assessment using AI.

---

## Core Features

### 1. User Roles & Onboarding

**Applicant**:

- Registration: email, password, basic info
- Onboarding: interests/preferences, CV upload (PDF/DOCX, max 5MB)
- System immediately parses CV and extracts text for future analysis
- Profile displays: interests (not full CV details)

**Recruiter**:

- Registration: email, password, company info
- Post jobs, review candidates, schedule interviews, access reports

### 2. CV Processing (During Onboarding)

- Applicant uploads CV during registration/onboarding
- System extracts full text from CV and stores it
- Parsed data includes: skills, experience, education, contact info
- **Match score NOT calculated yet** - happens only when applying to specific jobs
- Applicant profile shows only interests, not full CV details

### 3. Job Management

- Recruiters create postings: title, description, requirements, qualifications, salary, deadline
- Save as draft or publish immediately
- Jobs get unique URLs for sharing

### 4. Application Flow

- Applicants search with keywords and filters (location, type, experience level)
- One-click apply (no need to re-upload CV)
- **At application time**: AI analyzes stored CV text against specific job requirements
- Calculates match score (0-100) for this job
- Auto-ranks applicant among other candidates
- System prevents duplicate applications
- Automatic confirmation emails sent

### 5. CV Screening Stage

- After application, candidates auto-ranked by match score
- Recruiter reviews parsed CVs and match scores
- Recruiter can reject low-scoring candidates directly (e.g., <40% match)
- Only qualified candidates advance to interview stage

### 6. AI Interview System

**Interview Creation:**

- Recruiter schedules interview for selected candidates who passed CV screening
- AI generates 5-10 role-specific questions based on job requirements
- Unique interview link sent to candidate

**Interview Execution:**

- Real-time bidirectional conversation with AI interviewer
- AI asks questions via voice and listens to candidate responses
- Live speech-to-text transcription during conversation
- AI adapts follow-up questions based on candidate answers
- Natural conversation flow (like talking to a human interviewer)

**Evaluation:**

- Automatic speech-to-text transcription
- AI analyzes each response for: technical accuracy, relevance, clarity, reasoning
- Individual question scores (0-10) and overall interview score (0-100)
- Pass/fail recommendation (threshold: 60-70%)

### 7. Evaluation Reports

Generated automatically after interview completion:

- Overall score with percentile ranking
- Question-by-question breakdown with transcripts
- Strengths and weaknesses summary
- Comparative metrics vs other applicants
- AI-generated suitability recommendation
- Downloadable as PDF

### 8. AI Email Assistant

Auto-drafts personalized emails for:

- Application confirmations
- Interview invitations
- Status updates
- Rejections

Recruiter reviews and approves before sending.

### 9. Pipeline Management

- Visual applicant pipeline with statuses: new → screening → interviewed → shortlisted/rejected
- Filter and sort by match score, date, status
- Bulk actions: shortlist/reject multiple candidates
- Analytics dashboard with hiring metrics

---

## Key Workflows

### Applicant Path

Register → **Onboarding (add interests + upload CV)** → CV text extracted and stored → Search jobs → Apply → **AI analyzes CV against job requirements** → Match score calculated → Wait for CV screening → If passed: Receive interview invite → Real-time AI conversation → Get evaluated → Track status

### Recruiter Path

Register → Post job → **Review auto-ranked applicants by match score** → **Reject low-scoring CVs** → Schedule interviews for qualified candidates → Review reports → Shortlist/reject → Send emails

### System Automation

- **Onboarding**: CV uploaded → Extract text → Store
- **Application**: Retrieve CV text → Analyze against job → Calculate match score → Rank
- Interview completed → Transcribe → Evaluate → Generate report
- Email requested → Draft → Present for approval

---

## Requirements

**Performance:**

- CV parsing: <10 seconds
- Match calculation: <5 seconds (100 applicants)
- Interview transcription: 95%+ accuracy
- Support 100+ concurrent users

**Security:**

- Encrypted data transmission
- Password hashing with bcrypt
- JWT session tokens (24h expiry)
- Role-based access control
- File validation and size limits
- Audit logging

**Business Rules:**

- One application per job per applicant
- Profile + CV required before applying
- Interview accessible only before deadline + 24h grace period
- Evaluation scores immutable once calculated
- Data retained 2 years post-job closure

---

## Out of Scope

- Post-hire onboarding/payroll
- Manual final interviews
- Background verification
- Offer letter generation
- Integration with existing HR systems

---

**Project**: Final Year Capstone, BS Computer Science
**University**: Government College University, Faisalabad (2022-2026)
**Students**: Abdul Rahman (221709), Ali Hamza (221710)
