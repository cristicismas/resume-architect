import Joi from '@hapi/joi';

const buildResumeSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().allow(''),
  phoneNumber: Joi.string().allow(''),
  email: Joi.string()
    .email()
    .required(),
  about: Joi.string().required(),
  jobs: Joi.array().items(
    Joi.object({
      company: Joi.string().allow(''),
      job: Joi.string().allow(''),
      jobStartDate: Joi.date(),
      jobEndDate: Joi.date(),
      responsibilities: Joi.string()
    })
  ),
  schools: Joi.array().items(
    Joi.object({
      school: Joi.string().allow(''),
      degree: Joi.string().allow(''),
      schoolStartDate: Joi.date(),
      schoolEndDate: Joi.date()
    })
  ),
  extra: Joi.string().allow('')
});

export default { buildResumeSchema };
