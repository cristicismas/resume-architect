export const saveResumeData = data => {
  const dataString = JSON.stringify(data);
  const resume = localStorage.getItem('latestResumeDraft');

  // Fast object comparison. Property order matters.
  if (resume !== dataString) {
    localStorage.setItem('latestResumeDraft', dataString);
  }
};
