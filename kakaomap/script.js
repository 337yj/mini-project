(function () {
  "use strict";

  const cafes = [
    {
      id: 27548456,
      name: "길모퉁이 카페",
      lat: 35.17682129418099,
      lng: 128.8051018491449,
    },
    {
      id: 629541324,
      name: "길가온 카페",
      lat: 35.17744479806251,
      lng: 128.80317503968396,
    },
    {
      id: 455835640,
      name: "율하 도자기카페",
      lat: 35.17552683006794,
      lng: 128.80367269167132,
    },
  ];

  const defaultPos = {
    lat: 35.17661765865315,
    lng: 128.80261862847456,
  };

  const get = (target) => {
    return document.querySelector(target);
  };

  const $map = get("#map");
  const geoLocationButton = get(".geolocation_button");

  const mapContainer = new window.kakao.maps.Map($map, {
    center: new kakao.maps.LatLng(defaultPos.lat, defaultPos.lng),
    level: 3,
  });

  const createMarkerImage = () => {
    let markerImageSrc = "assets/marker.png";
    let imageSize = new window.kakao.maps.Size(45, 48);
    return new kakao.maps.MarkerImage(markerImageSrc, imageSize);
  };

  const createMarker = (lat, lng) => {
    const marker = new window.kakao.maps.Marker({
      map: mapContainer,
      position: new window.kakao.maps.LatLng(lat, lng),
      image: createMarkerImage(),
    });
    return marker;
  };

  const createCafeElement = () => {
    cafes.map((cafe) => {
      const { lat, lng } = cafe;
      const marker = createMarker(lat, lng);
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:6px 2px;">
                  <a href="https://place.map.kakao.com/${cafe.id}" target="_blank">${cafe.name}</a>
                </div>`,
      });

      infowindow.open(mapContainer, marker);
    });
  };

  const successGeolocation = (position) => {
    const { latitude, longitude } = position.coords;
    mapContainer.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
    const marker = createMarker(latitude, longitude);
    marker.setMap(mapContainer);
  };

  const errorGeolocation = (error) => {
    if (error.code == 1) {
      alert("위치 정보를 허용해주세요.");
    } else if (error.code == 2) {
      alert("사용할수 없는 위치 입니다.");
    } else {
      alert("오류가 발생했습니다.");
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
    } else {
      alert("지도 관련 api 를 불러올수 없습니다");
    }
  };

  const init = () => {
    geoLocationButton.addEventListener("click", () => {
      getLocation();
    });
    createCafeElement();
  };

  init();
})();
