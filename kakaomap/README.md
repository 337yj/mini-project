### [🔎 지도 서비스](https://337yj.github.io/mini-project/kakaomap/)

***

**Kakao 지도 API 사용**
  * 지도에 위치 표시
  * 사용자의 현재 위치 가져오기
    * Geolocation API 사용   
       getCurrentPosition() 메서드를 사용하여 사용자의 위치를 비동기로 확인한 다음 지정한 콜백 함수를 호출.   
       선택적으로, 이 과정 중 오류가 발생하면 호출할 오류 콜백을 두 번째 매개변수로 지정하였습니다.  
 
 ```javascript
 const successGeolocation = (position) => {
    const { latitude, longitude } = position.coords;
    mapContainer.setCenter(new kakao.maps.LatLng(latitude, longitude));
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
  ```
