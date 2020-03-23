export const saveResumeData = (data, template_name) => {
  const stringifiedData = JSON.stringify({
    data,
    meta: {
      template_name,
      isAutoSaved: true,
      draft_date: new Date()
    }
  });

  const resume = localStorage.getItem('latestResumeDraft');

  // Fast object comparison. Property order matters.
  if (resume !== stringifiedData) {
    localStorage.setItem('latestResumeDraft', stringifiedData);
  }
};
