import fs from 'fs-extra';
import path from 'path';
import cloudinary from 'cloudinary';
import Boom from '@hapi/boom';
import { CloudinaryResource } from '../interfaces/cloudinary';
import { IResumeData, IJob, ISchool } from '../interfaces/resume';
import { getTempFileName, readJSON, removeFile, writeStreamFromURL } from '../utils/files';
import { populateTemplate } from '../utils/templates';
import { docToPdf } from '../utils/convertors';
import rootDir from '../constants/rootDir';
import MONTHS from '../constants/months';

const getResumeLink = async (resumeName: string) => {
  try {
    const resumes = await readJSON('resumes_list.json');

    const remoteResumePath = `resume_architect/resumes/${resumeName.slice(0, -4)}.docx`;
    const foundResume = resumes.find((resume: CloudinaryResource) => resume.public_id === remoteResumePath);

    return foundResume;
  } catch (err) {
    console.log(err);
    return Boom.badImplementation("Couldn't find the requested resume.");
  }
};

export const fetchAndStoreResumeLinks = async () => {
  try {
    const resumes = await cloudinary.v2.api.resources({
      resource_type: 'raw',
      type: 'upload',
      prefix: 'resume_architect/resumes',
    });

    const resumesList = resumes.resources.map((resume: CloudinaryResource) => {
      const { secure_url, public_id } = resume;

      return {
        secure_url,
        public_id,
      };
    });

    await fs.writeFile('resumes_list.json', JSON.stringify(resumesList));
    console.log('Resumes list updated');
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong fetching or storing the resume links.');
  }
};

export const sanitizeAndFormatFormData = (data: IResumeData) => {
  data.jobs = data.jobs.filter((job) => {
    return job.jobStartDate || job.jobEndDate || job.company || job.job || job.responsibilities;
  });

  data.schools = data.schools.filter((school) => {
    return school.schoolStartDate || school.schoolEndDate || school.degree || school.school;
  });

  data.jobs = formatJobDates(data.jobs);
  data.schools = formatSchoolDates(data.schools);

  return data;
};

const formatJobDates = (jobs: IJob[]) => {
  return jobs.map((job) => {
    job.jobStartDate = formatDate(job.jobStartDate);
    job.jobEndDate = formatDate(job.jobEndDate);

    return job;
  });
};

const formatSchoolDates = (schools: ISchool[]) => {
  return schools.map((school) => {
    school.schoolStartDate = formatDate(school.schoolStartDate);
    school.schoolEndDate = formatDate(school.schoolEndDate);

    return school;
  });
};

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  const day = parsedDate.getDate();
  const month = MONTHS[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  return `${day} ${month} ${year}`;
};

export const getResumeDOCX = async (resumeName: string, resumeData: IResumeData) => {
  try {
    const resume = await getResumeLink(resumeName);

    const localResumePath = getTempFileName('.docx');
    await writeStreamFromURL(resume.secure_url, localResumePath);

    const populatedResume = await populateTemplate(localResumePath, resumeData);
    removeFile(localResumePath);

    return populatedResume;
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong getting the resume DOCX file.');
  }
};

export const getResumePDF = async (resumeName: string, resumeData: IResumeData) => {
  try {
    const docxBuffer = await getResumeDOCX(resumeName, resumeData);
    const docxPath = path.join(rootDir, getTempFileName('.docx'));
    await fs.writeFile(docxPath, docxBuffer);

    const pdfBuffer = await docToPdf(docxPath);
    fs.unlink(docxPath);

    return pdfBuffer;
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong getting the resume PDF file.');
  }
};
