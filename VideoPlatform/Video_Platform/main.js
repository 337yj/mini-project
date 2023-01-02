import { fetchSectionListData } from "./module/fetch.js";
import { getVideoDOM } from "./module/videoDOM.js";
import { get, getAll } from "./utils/dom.js";
import { makeDOMwithProperties } from "./utils/dom.js";

const sectionDOM = document.getElementsByTagName("section")[0];
const contents = makeDOMwithProperties("div", {
  className: "contents list",
});

try {
  const videoInfoList = await fetchSectionListData();

  videoInfoList.forEach((videoInfo) => {
    const productSectionDOM = getVideoDOM(videoInfo);
    contents.appendChild(productSectionDOM);
    sectionDOM.appendChild(contents);
  });
} catch (error) {
  console.log(error);
}

const $search = get("#search");
const $searchButton = get(".btn_search");

const $list = getAll(".contents.list figure");

const init = () => {
  $search.addEventListener("keyup", search);
  $searchButton.addEventListener("click", search);
};

const search = () => {
  let searchText = $search.value.toLowerCase();
  for (let i = 0; i < $list.length; i++) {
    const $target = $list[i].querySelector("strong");
    const text = $target.textContent.toLowerCase();
    if (-1 < text.indexOf(searchText)) {
      $list[i].style.display = "flex";
    } else {
      $list[i].style.display = "none";
    }
  }

  for (let i = 0; i < $list.length; i++) {
    const $target = $list[i].querySelector("picture");
    $target.addEventListener("mouseover", onMouseOver);
    $target.addEventListener("mouseout", onMouseOut);
  }
};

const onMouseOver = (e) => {
  const webpPlay = e.target.parentNode.querySelector("source");
  webpPlay.setAttribute("srcset", "./public/assets/벚꽃놀이.webp");
};

const onMouseOut = (e) => {
  const webpPlay = e.target.parentNode.querySelector("source");
  webpPlay.setAttribute("srcset", "./public/assets/벚꽃놀이.jpg");
};

init();
search();
