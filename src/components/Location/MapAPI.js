import React, { useEffect, useState, useRef } from "react";

function MapAPI({ location }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [gps, setGps] = useState(null);
  const mapRef = useRef();

  // 네이버 지도 스크립트 로딩
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=kgs02uxrvy";
    document.head.appendChild(script);

    script.onload = () => setGps(location); // 스크립트 로딩 후 GPS 상태 설정

    return () => {
      script.remove();
    };
  }, [location]);

  // 차량 번호에 따른 경로 설정
  // gps.carnumber에 따라 polylinePath 값 변경
  useEffect(() => {
    let polylinePath = [];
    if (!gps) return;

    if (gps.carnumber === 1) {
      polylinePath = [
        new window.naver.maps.LatLng(37.509601, 127.11172),
        new window.naver.maps.LatLng(37.510321, 127.112175),
        new window.naver.maps.LatLng(37.511988, 127.108133),
        new window.naver.maps.LatLng(37.515563, 127.106607),
        new window.naver.maps.LatLng(37.514395, 127.103134),
        new window.naver.maps.LatLng(37.515495, 127.102553),
        new window.naver.maps.LatLng(37.51492, 127.100712),
        new window.naver.maps.LatLng(37.514965, 127.100581),
        new window.naver.maps.LatLng(37.516561, 127.099627),
        new window.naver.maps.LatLng(37.515984, 127.098111),
        new window.naver.maps.LatLng(37.515803, 127.098029),
        new window.naver.maps.LatLng(37.513146, 127.099976),
        new window.naver.maps.LatLng(37.509812, 127.102804),
        new window.naver.maps.LatLng(37.505083, 127.107074),
        new window.naver.maps.LatLng(37.505553, 127.107975),
        new window.naver.maps.LatLng(37.50525, 127.108265),
        new window.naver.maps.LatLng(37.505968, 127.109341),
        new window.naver.maps.LatLng(37.505505, 127.109869),
        new window.naver.maps.LatLng(37.50789, 127.112307),
        new window.naver.maps.LatLng(37.508105, 127.11189),
        new window.naver.maps.LatLng(37.509094, 127.112583),
        new window.naver.maps.LatLng(37.508898, 127.113106),
        new window.naver.maps.LatLng(37.509558, 127.113535),
        new window.naver.maps.LatLng(37.510309, 127.11217),
        new window.naver.maps.LatLng(37.509601, 127.11172),
        new window.naver.maps.LatLng(37.509601, 127.11172),
        new window.naver.maps.LatLng(37.509601, 127.11172),
        new window.naver.maps.LatLng(37.509601, 127.11172),
        new window.naver.maps.LatLng(37.509601, 127.11172),
      ];
    } else if (gps.carnumber === 2) {
      polylinePath = [
        new window.naver.maps.LatLng(37.509601, 127.11172),
        new window.naver.maps.LatLng(37.508774, 127.111215),
        new window.naver.maps.LatLng(37.509601, 127.11172),
        new window.naver.maps.LatLng(37.50779, 127.110462),
        new window.naver.maps.LatLng(37.506962, 127.109681),
        new window.naver.maps.LatLng(37.506615, 127.109273),
        new window.naver.maps.LatLng(37.50582, 127.110209),
        new window.naver.maps.LatLng(37.506466, 127.110928),
        new window.naver.maps.LatLng(37.50586, 127.111899),
        new window.naver.maps.LatLng(37.506309, 127.112379),
        new window.naver.maps.LatLng(37.506441, 127.112385),
        new window.naver.maps.LatLng(37.506537, 127.112275),
        new window.naver.maps.LatLng(37.507001, 127.111505),
        new window.naver.maps.LatLng(37.507888, 127.112309),
        new window.naver.maps.LatLng(37.508109, 127.111889),
        new window.naver.maps.LatLng(37.508441, 127.112149),
        new window.naver.maps.LatLng(37.506541, 127.115923),
        new window.naver.maps.LatLng(37.514434, 127.120843),
        new window.naver.maps.LatLng(37.513972, 127.122212),
        new window.naver.maps.LatLng(37.514213, 127.122352),
        new window.naver.maps.LatLng(37.516429, 127.115954),
        new window.naver.maps.LatLng(37.509601, 127.11172),
      ];
    } else if (gps.carnumber === 3) {
      polylinePath = [
        new window.naver.maps.LatLng(37.509601, 127.11172),
        new window.naver.maps.LatLng(37.510325, 127.112163),
        new window.naver.maps.LatLng(37.515231, 127.11051),
        new window.naver.maps.LatLng(37.516176, 127.110098),
        new window.naver.maps.LatLng(37.51632, 127.110542),
        new window.naver.maps.LatLng(37.516624, 127.110415),
        new window.naver.maps.LatLng(37.517371, 127.112454),
        new window.naver.maps.LatLng(37.517487, 127.112717),
        new window.naver.maps.LatLng(37.527881, 127.119116),
        new window.naver.maps.LatLng(37.521404, 127.133725),
        new window.naver.maps.LatLng(37.519649, 127.133097),
        new window.naver.maps.LatLng(37.51197, 127.127951),
        new window.naver.maps.LatLng(37.516434, 127.115945),
        new window.naver.maps.LatLng(37.51629, 127.115885),
        new window.naver.maps.LatLng(37.514434, 127.120841),
        new window.naver.maps.LatLng(37.511182, 127.11881),
        new window.naver.maps.LatLng(37.510315, 127.120962),
        new window.naver.maps.LatLng(37.510531, 127.121098),
        new window.naver.maps.LatLng(37.508683, 127.125891),
        new window.naver.maps.LatLng(37.504878, 127.123592),
        new window.naver.maps.LatLng(37.505919, 127.121298),
        new window.naver.maps.LatLng(37.510316, 127.112168),
        new window.naver.maps.LatLng(37.509601, 127.11172),
        new window.naver.maps.LatLng(37.509601, 127.11172),
      ];
    }

    const mapOptions = { zoom: 15 };
    const mapInstance = new window.naver.maps.Map(mapRef.current, mapOptions);

    // 학원 위치 표시
    const markerPosition = new window.naver.maps.LatLng(37.509601, 127.11172);
    const customIconUrl1 =
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFNsTD%2Fbtso8zY4mjW%2FQhjAS5xAOLJXlAeDXYNEC0%2Fimg.png"; // Icon for the first marker
    const markerInstance1 = new window.naver.maps.Marker({
      position: markerPosition,
      map: mapInstance,
      icon: {
        url: customIconUrl1,
        scaledSize: new window.naver.maps.Size(46, 50),
      },
    });

    setMarker(markerInstance1);

    // 차량 위치 표시
    // gps.carnumber 값에 따라 다른 아이콘 사용
    let markerInstance;

    if (gps.carnumber === 1) {
      markerInstance = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(gps.latitude, gps.longitude),
        map: mapInstance,
        icon: {
          url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdqoJzG%2Fbtso927bDSA%2FYaak0dYr59WrU7WayDdhD1%2Fimg.png",
          scaledSize: new window.naver.maps.Size(47, 25),
        },
      });
    } else if (gps.carnumber === 2) {
      markerInstance = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(gps.latitude, gps.longitude),
        map: mapInstance,
        icon: {
          url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDF7ic%2Fbtso5td6KCO%2FT2E2wrtkWRx4cGAsgTEUek%2Fimg.png",
          scaledSize: new window.naver.maps.Size(47, 25),
        },
      });
    } else if (gps.carnumber === 3) {
      markerInstance = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(gps.latitude, gps.longitude),
        map: mapInstance,
        icon: {
          url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F0meLk%2Fbtso6rfNSo7%2FyuK1fOjNUGUwSuMeOKtkzK%2Fimg.png",
          scaledSize: new window.naver.maps.Size(47, 25),
        },
      });
    } else {
      markerInstance = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(gps.latitude, gps.longitude),
        map: mapInstance,
        icon: {
          url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F0meLk%2Fbtso6rfNSo7%2FyuK1fOjNUGUwSuMeOKtkzK%2Fimg.png",
          scaledSize: new window.naver.maps.Size(47, 25),
        },
      });
    }

    // 경로를 지도에 선으로 그리기
    // gps.carnumber 값에 따라 다른 선 색상 사용
    if (gps.carnumber === 1) {
      new window.naver.maps.Polyline({
        path: polylinePath,
        strokeColor: "#217701",
        strokeOpacity: 0.8,
        strokeWeight: 6,
        map: mapInstance,
      });
    } else if (gps.carnumber === 2) {
      new window.naver.maps.Polyline({
        path: polylinePath,
        strokeColor: "#f608a1",
        strokeOpacity: 0.8,
        strokeWeight: 6,
        map: mapInstance,
      });
    } else if (gps.carnumber === 3) {
      new window.naver.maps.Polyline({
        path: polylinePath,
        strokeColor: "#ff8a00",
        strokeOpacity: 0.8,
        strokeWeight: 6,
        map: mapInstance,
      });
    }

    setMap(mapInstance);
    setMarker(markerInstance);
  }, [gps]);

  // 마커와 지도 중심 업데이트
  // gps 값 변경 시, 마커 위치와 지도 중심을 업데이트
  useEffect(() => {
    if (map && marker) {
      const position = new window.naver.maps.LatLng(
        gps.latitude,
        gps.longitude
      );
      marker.setPosition(position);
      map.setCenter(position);
    }
  }, [gps, map, marker]);

  return <div ref={mapRef} style={{ width: "1000px", height: "620px" }} />;
}

export default MapAPI;
