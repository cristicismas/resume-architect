import React from 'react';
import { useParams } from 'react-router-dom';

const ResumeForm = () => {
  const { id } = useParams();

  return (
    <form id="resume-form">
      <h1>Resume: {id}</h1>
    </form>
  );
};

export default ResumeForm;
