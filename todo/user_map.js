      console.log(">>> 네이버 지도 생성 시작");

      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 12,
        zoomControl: true, // 줌 컨트롤러 활성화 여부
        mapTypeControl: true, // 지도 유형 컨트롤러 활성화 여부
        scaleControl: true, // 지도 스케일 표시 여부
        // GeolocationControl: true,  // 사용자의 위치를 나타내는 버튼 활성화 여부
        mapTypeId: naver.maps.MapTypeId.NORMAL,
      };

      const map = new naver.maps.Map("map", mapOptions);

      function completedInitMap() {
        console.log(">>> 네이버 지도 로딩 완료");
      }

      var latitude = null;
      var longitude = null;

      // var currentInfowindow = new naver.maps.InfoWindow();

      // function onSuccessGeolocation(position) {
      //     var location = new naver.maps.LatLng(position.coords.latitude,
      //         position.coords.longitude);

      //     latitude = position.coords.latitude;
      //     longitude = position.coords.longitude;

      //     map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
      //     map.setZoom(15); // 지도의 줌 레벨을 변경합니다.

      //     currentInfowindow.setContent('<div style="padding:20px;">' + '현재 위치 (geolocation.getCurrentPosition())' + '</div>');

      //     currentInfowindow.open(map, location);
      //     console.log('Coordinates: ' + location.toString());
      // }

      // function onErrorGeolocation() {
      //     var center = map.getCenter();

      //     currentInfowindow.setContent('<div style="padding:20px;">' +
      //         '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>'+ "latitude: "+ center.lat() +"<br />longitude: "+ center.lng() +'</div>');

      //     currentInfowindow.open(map, center);
      // }

      $(window).on("load", function () {
        // setTimeout(() => {
        //     if (!isFlutterInAppWebViewReady) {
        //         setCurrentPosition();
        //     }
        // }, 3000);
      });

      // --------------------------------------------------------------------------------------------------------
      const buttonPosition = naver.maps.Position.TOP_RIGHT;

      naver.maps.Event.once(map, "init", function () {
        // //customControl 객체 이용하기
        // var customControl = new naver.maps.CustomControl('<button type="button">현재 위치</button>', {
        //     position: buttonPosition
        // });
        // customControl.setMap(map);
        // var domEventListener = naver.maps.Event.addDOMListener(customControl.getElement(), 'click', function () {
        //     console.log('click current location button');
        //     setCurrentPosition();
        // });
        // //Map 객체의 controls 활용하기
        // var $defaultBtn = $('<button type="button">기본</button>'),
        //     defaultBtnEl = $defaultBtn[0];
        // map.controls[buttonPosition].push(defaultBtnEl);
        // var domEventListener = naver.maps.Event.addDOMListener(defaultBtnEl, 'click', function () {
        //     map.setCenter(new naver.maps.LatLng(37.3595953, 127.1553971));
        //     map.setZoom(12);
        // });
      });

      var latitude = 37.395704;
      var longitude = 127.105399;

      var userMarker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(latitude, longitude),
        title: "User",
        data: {},
        icon: {
          // url: 'https://cdn-icons-png.flaticon.com/128/12536/12536136.png',  // 사람
          // url: 'https://cdn-icons-png.flaticon.com/128/3710/3710242.png',  // 사람
          url: "https://cdn-icons-png.flaticon.com/128/2442/2442108.png", // 사람
          scaledSize: new naver.maps.Size(36, 36), // 표시할 크기 설정
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(18, 18), // 아이콘 중심점 설정
        },
      });
      var markers = [];
      var infoWindows = [];
      var icons = [];
      var polylines = [];

      naver.maps.Event.addListener(map, "click", function () {
        console.log("click map");
        removeAllInfoWindows();
        resetIcon();
      });

      function removeAllInfoWindows() {
        for (var i = 0; i < infoWindows.length; i++) {
          console.log(infoWindows[i]);
          if (infoWindows[i].getMap()) {
            infoWindows[i].close();
          }
        }
      }

      function removeAllMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }

      function removePolylines() {
        for (var i = 0; i < polylines.length; i++) {
          polylines[i].setMap(null);
        }
      }

      function removeAllObjectsInMap() {
        removeAllInfoWindows();
        removeAllMarkers();
        removePolylines();
      }

      function resetIcon() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setIcon(icons[i]);
        }
      }

      function generateRandomColor(i) {
        if (i == 0) {
          return "#000000";
        } else if (i == 1) {
          return "#ff0000";
        } else if (i == 2) {
          return "#0000ff";
        } else {
          var r = Math.floor(Math.random() * 256); // 0 ~ 255
          var g = Math.floor(Math.random() * 256);
          var b = Math.floor(Math.random() * 256);
          return (
            "#" +
            r.toString(16).padStart(2, "0") +
            g.toString(16).padStart(2, "0") +
            b.toString(16).padStart(2, "0")
          );
        }
      }

      function setCarMarker(latitude, longitude) {
        if (typeof latitude === "string") {
          latitude = parseFloat(latitude);
        }
        if (typeof longitude === "string") {
          longitude = parseFloat(longitude);
        }

        markers = [];
        infoWindows = [];
        icons = [];

        // var latitude = 37.3595704;
        // var longitude = 127.105399;

        for (var i = 0; i < 3; i++) {
          latitude = latitude + (i * 0.001 + Math.random() / 500);
          longitude = longitude + (i * 0.001 + Math.random() / 500);

          console.log(">>> setMarker start");
          console.log(">>>>>>> latitude : " + latitude);
          console.log(">>>>>>> longitude : " + longitude);

          var description = `화물차 : ${i + 1}`;

          var path = [];
          if (i == 0) {
            path = [
              new naver.maps.LatLng(latitude - 0.0005, longitude + 0.0005),
              new naver.maps.LatLng(latitude - 0.001, longitude + 0.001),
              new naver.maps.LatLng(latitude - 0.001, longitude + 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude + 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude + 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude + 0.003),
              new naver.maps.LatLng(latitude - 0.001, longitude + 0.003),
              new naver.maps.LatLng(latitude - 0.002, longitude + 0.003),
              new naver.maps.LatLng(latitude - 0.002, longitude + 0.002),
              new naver.maps.LatLng(latitude - 0.002, longitude + 0.001),
              new naver.maps.LatLng(latitude - 0.003, longitude - 0.001),
              new naver.maps.LatLng(latitude - 0.003, longitude - 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude - 0.003),
              new naver.maps.LatLng(latitude - 0.0005, longitude - 0.0005),
            ];
          } else if (i === 1) {
            path = [
              new naver.maps.LatLng(latitude + 0.0005, longitude + 0.0005),
              new naver.maps.LatLng(latitude + 0.001, longitude - 0.001),
              new naver.maps.LatLng(latitude + 0.001, longitude - 0.001),
              new naver.maps.LatLng(latitude + 0.001, longitude - 0.001),
              new naver.maps.LatLng(latitude + 0.001, longitude + 0.003),
              new naver.maps.LatLng(latitude - 0.001, longitude + 0.003),
              new naver.maps.LatLng(latitude - 0.001, longitude + 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude + 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude - 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude - 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude - 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude - 0.002),
              new naver.maps.LatLng(latitude - 0.001, longitude - 0.002),
              new naver.maps.LatLng(latitude - 0.0005, longitude - 0.0005),
            ];
          } else if (i === 2) {
            path = [
              new naver.maps.LatLng(latitude + 0.0005, longitude + 0.0005),
              new naver.maps.LatLng(latitude + 0.0, longitude + 0.001),
              new naver.maps.LatLng(latitude + 0.0, longitude + 0.001),
              new naver.maps.LatLng(latitude + 0.0, longitude + 0.001),
              new naver.maps.LatLng(latitude + 0.0, longitude + 0.002),
              new naver.maps.LatLng(latitude + 0.001, longitude + 0.002),
              new naver.maps.LatLng(latitude + 0.001, longitude + 0.003),
              new naver.maps.LatLng(latitude + 0.001, longitude + 0.003),
              new naver.maps.LatLng(latitude + 0.002, longitude + 0.002),
              new naver.maps.LatLng(latitude + 0.002, longitude + 0.002),
              new naver.maps.LatLng(latitude + 0.003, longitude + 0.001),
              new naver.maps.LatLng(latitude + 0.003, longitude - 0.001),
              new naver.maps.LatLng(latitude + 0.002, longitude - 0.001),
              new naver.maps.LatLng(latitude + 0.0005, longitude - 0.0005),
            ];
          }

          // Polyline 생성
          var polyline = new naver.maps.Polyline({
            path: path,
            strokeColor: generateRandomColor(i),
            strokeWeight: 1,
            strokeOpacity: 1, // 불투명도
            strokeStyle: "shortdash", // 점선 스타일 설정
            startIcon: naver.maps.PointingIcon.CIRCLE,
            startIconSize: 10,
            endIcon: naver.maps.PointingIcon.BLOCK_ARROW,
            endIconSize: 10,

            map: map,
          });

          polylines.push(polyline);

          var defaultCarIcon = {
            url: "https://cdn-icons-png.flaticon.com/128/776/776588.png",
            // url: 'https://cdn-icons-png.flaticon.com/128/1839/1839268.png',
            scaledSize: new naver.maps.Size(30, 30), // 표시할 크기 설정
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(15, 15), // 중심점 설정
          };

          var selectedCarIcon = {
            url: "https://cdn-icons-png.flaticon.com/128/7839/7839594.png",
            scaledSize: new naver.maps.Size(40, 40), // 표시할 크기 설정
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(20, 20), // 중심점 설정
          };

          var orderdCarIcon = {
            url: "https://cdn-icons-png.flaticon.com/128/1839/1839233.png",
            scaledSize: new naver.maps.Size(36, 36), // 표시할 크기 설정
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(18, 18), // 중심점 설정
          };

          var marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(latitude, longitude),
            title: "marker:" + (i + 1),
            data: {
              id: i + 1,
              name: "marker:" + (i + 1),
              desc: description,
            },
            icon: defaultCarIcon,
          });

          if (i == 0) {
            marker.setIcon(orderdCarIcon);
            icons.push(orderdCarIcon);
            var infoWin = new naver.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:10px;">[내가주문한 차량 표시:${description}]</div>`,
            });
          } else {
            marker.setIcon(defaultCarIcon);
            icons.push(defaultCarIcon);
            var infoWin = new naver.maps.InfoWindow({
              content: ``,
            });
          }

          markers.push(marker);
          infoWindows.push(infoWin);
          // icons.push(icon);

          naver.maps.Event.addListener(marker, "idle", (e) => {
            updateMarkers(map, markers);
          });
          console.log("setMarker finish");
        }

        function updateMarkers(map, markers) {
          var mapBounds = map.getBounds();
          var marker, position;

          for (var i = 0; i < markers.length; i++) {
            marker = markers[i];
            position = marker.getPosition();

            if (mapBounds.hasLatLng(position)) {
              showMarker(map, marker);
            } else {
              hideMarker(map, marker);
            }
          }
        }

        function showMarker(map, marker) {
          if (marker.setMap()) return;
          marker.setMap(map);
        }

        function hideMarker(map, marker) {
          if (!marker.setMap()) return;
          marker.setMap(null);
        }

        // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
        function getClickHandler(seq) {
          return function (e) {
            // console.log(e);
            sendMessageToApp(MySendCommands.openCarInfo, e.overlay.data.id);

            resetIcon();

            var marker = markers[seq],
              infoWindow = infoWindows[seq];

            marker.setIcon(selectedCarIcon);

            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              if (infoWindow.getContent() != "") {
                infoWindow.open(map, marker);
              }
            }
          };
        }

        for (var i = 0; i < markers.length; i++) {
          naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
        }
      }

      function setCurrentPosition() {
        // 우리집
        // 37.442228
        // 126.712872

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              console.log(
                ">>>>> curreunt position : " +
                  position.coords.latitude +
                  ", " +
                  position.coords.longitude
              );
              movePosition(position.coords.latitude, position.coords.longitude);
            },
            function (error) {
              alert("Error occurred while retrieving location:", error);
            }
          );
        } else {
          alert("Geolocation is not supported by this browser.");
          console.error("Geolocation is not supported by this browser.");
          var center = map.getCenter();
          currentInfowindow.setContent(
            '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>'
          );
          currentInfowindow.open(map, center);
        }
      }

      function movePosition(lat, lng) {
        console.log(">>>>> movePosition : " + lat + ", " + lng);

        var currentLocation = new naver.maps.LatLng(lat, lng);

        removeAllObjectsInMap();

        userMarker.setPosition(new naver.maps.LatLng(lat, lng));
        userMarker.setMap(map);

        setCarMarker(lat, lng);

        // 지도 중심을 현재 위치로 이동
        map.setCenter(currentLocation);
        map.setZoom(15); // 적절한 줌 레벨로 설정
      }