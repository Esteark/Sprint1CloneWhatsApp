export const HideElement = (objectHtml) => {
  objectHtml.classList.add("hidden");
};

export const showAnimation = (objectHtml) => {
  objectHtml.classList.remove("hidden");
  objectHtml.classList.remove("animate__fadeOut");
  objectHtml.classList.add("animate__fadeIn");
};

export const hideAnimation = (objectHtml) => {
  objectHtml.classList.remove("animate__fadeIn");
  objectHtml.classList.add("animate__fadeOut");
  setTimeout(() => {
    objectHtml.classList.add("hidden");
  }, 1000);
};

export const showModalSummary = (objectHtml) => {
  objectHtml.classList.remove("hidden");
  objectHtml.classList.remove("animate__fadeOutRight");
  objectHtml.classList.add("animate__fadeInRight");
};
export const hideModalSummary = (objectHtml) => {
  objectHtml.classList.remove("animate__fadeInRight");
  objectHtml.classList.add("animate__fadeOutRight");
  setTimeout(() => {
    objectHtml.classList.remove("hidden");
  }, 1000);
};
