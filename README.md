# Map Web

네이버 지도표시를 위한 웹페이지

## 실행 방법

nginx, apache 등 웹 서버에 serving 하거나 간단하게 아래 http-server 로 실행한다.

- https://www.npmjs.com/package/http-server

웹과의 연동을 위해서 `8080` 포트로 실행한다.

User App, Car App 에서 지도 웹페이지 URL 을 설정 한다.

- `lib/com/config.dart`

## 전체 프로젝트

### naver_map : 네이버 지도 표시를 위한 웹 페이지 소스 코드

### user_app : 일반 사용자를 위한 App 코드

### car_app : 화물 차주를 위한 App 코드
