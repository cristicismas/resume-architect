export const saveResumeData = (data, templateName) => {
  const formattedData = formatResumeToSave(data, templateName, true);
  const stringifiedData = JSON.stringify(formattedData);

  const resume = localStorage.getItem('latestResumeDraft');

  // Fast object comparison. Property order matters.
  if (resume !== stringifiedData) {
    localStorage.setItem('latestResumeDraft', stringifiedData);
  }
};

export const formatResumeToSave = (data, templateName, isAutoSaved = false) => {
  return {
    data,
    meta: {
      templateName,
      isAutoSaved,
      draftDate: new Date()
    }
  };
};
