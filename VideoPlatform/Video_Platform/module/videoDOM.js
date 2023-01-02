import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";

export const getVideoDOM = (videoInfoList) => {
  const { webpImgSrc, jpgImgSrc, profile, title, name, view, update } = videoInfoList;

  const figure = document.createElement("figure");
  const btnView = makeDOMwithProperties("a", {
    href: "./view.html",
    className: "btn_view",
  });
  const picture = document.createElement("picture");
  const sourceWebp = makeDOMwithProperties("source", {
    srcset: webpImgSrc,
    type: "image/webp",
  });
  const thumbnail = makeDOMwithProperties("img", {
    src: jpgImgSrc,
    alt: title,
  });
  const figcaption = document.createElement("figcaption");
  const icon = document.createElement("i");
  icon.style.backgroundImage = `url("${profile}")`;

  const description = makeDOMwithProperties("span", {
    className: "description",
  });
  const videoTitle = makeDOMwithProperties("strong", {
    innerHTML: title,
  });
  const userName = makeDOMwithProperties("em", {
    innerHTML: name,
  });
  const videoInfo = makeDOMwithProperties("span", {
    innerHTML: `${view} ${update}`,
  });

  appendChildrenList(figure, [btnView, figcaption]);

  appendChildrenList(btnView, [picture]);
  appendChildrenList(picture, [sourceWebp, thumbnail]);

  appendChildrenList(figcaption, [icon, description]);

  appendChildrenList(description, [videoTitle, userName, videoInfo]);

  return figure;
};
