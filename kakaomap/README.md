### [π μ§λ μλΉμ€](https://337yj.github.io/mini-project/kakaomap/)

***

**Kakao μ§λ API μ¬μ©**
  * μ§λμ μμΉ νμ
  * μ¬μ©μμ νμ¬ μμΉ κ°μ Έμ€κΈ°
    * Geolocation API μ¬μ©   
       getCurrentPosition() λ©μλλ₯Ό μ¬μ©νμ¬ μ¬μ©μμ μμΉλ₯Ό λΉλκΈ°λ‘ νμΈν λ€μ μ§μ ν μ½λ°± ν¨μλ₯Ό νΈμΆ.   
       μ νμ μΌλ‘, μ΄ κ³Όμ  μ€ μ€λ₯κ° λ°μνλ©΄ νΈμΆν  μ€λ₯ μ½λ°±μ λ λ²μ§Έ λ§€κ°λ³μλ‘ μ§μ νμμ΅λλ€.  
 
 ```javascript
 const successGeolocation = (position) => {
    const { latitude, longitude } = position.coords;
    mapContainer.setCenter(new kakao.maps.LatLng(latitude, longitude));
    const marker = createMarker(latitude, longitude);
    marker.setMap(mapContainer);
  };

  const errorGeolocation = (error) => {
    if (error.code == 1) {
      alert("μμΉ μ λ³΄λ₯Ό νμ©ν΄μ£ΌμΈμ.");
    } else if (error.code == 2) {
      alert("μ¬μ©ν μ μλ μμΉ μλλ€.");
    } else {
      alert("μ€λ₯κ° λ°μνμ΅λλ€.");
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
    } else {
      alert("μ§λ κ΄λ ¨ api λ₯Ό λΆλ¬μ¬μ μμ΅λλ€");
    }
  };
  ```
