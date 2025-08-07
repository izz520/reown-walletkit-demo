const backTab = (targetUrl: string | undefined) => {
  if (targetUrl) {
    window.location.href = targetUrl;
    window.close();
  }
};

export default backTab;
