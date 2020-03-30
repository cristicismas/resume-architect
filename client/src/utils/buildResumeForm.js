export const saveResumeData = (data, template_name) => {
  const formattedData = formatResumeToSave(data, template_name);
  const stringifiedData = JSON.stringify(formattedData);

  const resume = localStorage.getItem('latestResumeDraft');

  // Fast object comparison. Property order matters.
  if (resume !== stringifiedData) {
    localStorage.setItem('latestResumeDraft', stringifiedData);
  }
};

export const formatResumeToSave = (data, template_name) => {
  return {
    data,
    meta: {
      template_name,
      isAutoSaved: true,
      draft_date: new Date()
    }
  };
};
