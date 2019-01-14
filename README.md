<a name="korean"></a>
OpenGDSBuilder2018Prod (웹 기반 공간 정보 검수 및 편집 솔루션) 
=======
이 프로젝트는 국토공간정보연구사업 중 [공간정보 SW 활용을 위한 오픈소스 가공기술 개발]과제의 연구성과 입니다.<br>
웹 상에서 공간 정보를 검수하고 편집할 수 있으며 OpenLayers, GeoTools, GeoSolution 등의 오픈소스 라이브러리들을 사용하여 개발되었습니다.<br>
별도의 프로그램 설치 없이 웹 브라우저 상에서 바로 살펴보고 버저닝 기능을 통하여 협업도 할 수 있습니다.<br>

감사합니다.<br>
공간정보기술(주) 연구소 <link>http://www.git.co.kr/<br>
OpenGeoDT 팀


특징
=====
- OpenGDSBuilder2018Prod 은 자사 GIS 통합 솔루션인 GeoDT 2.2를 기반으로한 웹 공간데이터 편집/검수 솔루션임.
- 웹 페이지상에서 공간정보의 기하학적/논리적 구조와 속성값에 대한 검수편집 기능을 제공함(파일 검수, Geoserver Layer 검수 지원)
- 다양한 웹 브라우저 지원가능, 플러그인 및 ActiveX 설치 없이 사용 가능함.
- JavaScript, Java 라이브러리 형태로 개발되어 사용자 요구사항에 따라 커스터 마이징 및 확장이 가능함.
- OGC 표준을 준수하고 있으며 국가기본도, 지하시설물도, 임상도 작성 작업규정을 따르는 총 53여종의 검수기능을 제공함.


연구기관
=====
- 세부 책임 : 부산대학교 <link>http://www.pusan.ac.kr/<br>
- 연구 책임 : 국토연구원 <link>http://www.krihs.re.kr/


Getting Started
=====
### 1. 환경 ###
- Java – OpenJDK 1.8.0.111 64 bit
- eclipse neon 
- PostgreSQL 9.4 
- Geoserver 2.13.2

### 2. Geoserver 설치 및 설정 ###
- http://geoserver.org/ 접속 후 Geoserver 2.13.2 Windows Installer 다운로드 <br> 
** jdk 1.8 버전 이상 사용 시 Geoserver 2.8 버전 이상 사용
- Windows Installer 실행 후  C:\Program Files (x86) 경로에 설치
- C:\Program Files (x86)\GeoServer 2.13.2\bin 경로의 startup.bat 실행
- Geoserver url 접속
<pre><code> http://[host]:[port]/geoserver </code></pre> 
- 사용자 계정(테스트 계정 : admin)을 작업공간 이름으로 입력 후 작업공간 생성

### 3. PostgreSQL 설치 및 설정 ###
- http://www.postgresql.org/download/ 접속 후 PostgreSQL 다운로드 및 설치
- pgAdmin 실행 후 Databases 생성 후 New Database 클릭 
- 사용자 계정(테스트 계정 : admin)을 Name으로 입력 후 Database 생성 
- 소스코드에서 gdo2018scheme 파일 다운로드
- 생성한 Database에 gdo2018scheme 파일 restore

### 4. RabbitMQ 설치 및 설정 ###
- erlang 다운로드 및 설치 http://www.erlang.org/download.html
- rabbitMQ windows 버전 다운로드 및 설치 http://www.rabbitmq.com/download.html 에서 installer 버전을 받아 설치
- plugins 설치 명령 프롬프트에서 c:/Program Files/RabbitMQ Server/rabbitmq_server-x.x.x/sbin 으로 이동후
  >   rabbitmq-plugins enable rabbitmq_management 커맨드 실행
- RabbitMQ 서비스 재시작

### 5. 소스코드 설치 및 프로젝트 실행 ###
- https://github.com/ODTBuilder/OpenGDSBuilder2018Prod 접속 후 소스코드 다운로드
- eclipse 실행 후 zip 파일 형태로 Project Import
- 프로젝트 경로 내 src/main/resources/application.yml 접근 후 아래 속성들을 수정
<pre><code>
spring:
  rabbitmq:
    host: 레빗엠큐 호스트 주소 EX)175.111.222.333
    port: 레빗엠큐 포트번호 EX)5672
    virtual-host: 레빗 엠큐 버추얼 호스트
    username: 레빗엠큐 계정명
    password: 레빗엠큐 비밀번호
    template:
      exchange: 레빗엠큐 익스체인지
      routing-key: 레빗엠큐 라우팅키
      routing-key-mobile: 레빗엠큐 모바일용 라우팅키
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    url: jdbc:postgresql://postgresql주소:포트번호/데이터베이스 이름?charSet=UTF-8&prepareThreshold=1
    username: 데이터베이스 계정명
    password: 데이터베이스 비밀번호
    driver-class-name: org.postgresql.Driver
    hikari:
      connection-test-query: SELECT 1
      minimum-idle: 3
      maximum-pool-size: 20
      pool-name: gdoDBPool_Prod
      auto-commit: false
  mvc:
    view:
      prefix: /WEB-INF/jsp/
      suffix: .jsp
  http:
    multipart:
      max-file-size: 10485760KB
      max-request-size: 10485760KB
server:
  port: 프로젝트 접속 포트번호
  context-path: /geodt
  servlet:
    session:
      timeout: 3600
  jsp-servlet:
    init-parameters:
      development: true
  error:
    whitelabel:
      enabled: false
gitrnd:
  serverhost: 프로젝트 접속 주소 EX)175.111.222.333
  apache:
    host: 아파치 서버 주소 EX) 127.0.0.1
    port: 아파치 서버 포트 EX) 8888
    basedir: 디렉토리 이름 EX) gdofiles
    basedrive: 드라이브 명 EX) C
mybatis:
  config-location: classpath:config/mybatis.xml
  mapper-location: classpath:sql/*.xml
  configuration:
    map-underscore-to-camel-case: true
    use-column-label: true
</code></pre>
- 서버 실행 후 메인 페이지 url 접속 
 <pre><code> http://[host]:[port]/geodt/main.do </code></pre>
- 테스트 계정으로 로그인
 <pre><code> id : guest<br>
 pw : guest<br> </code></pre>
- 편집도구 초기화면 접속 

### 6. 지원 기능 ###

- ### Openlayers Layer 편집 기능 지원<br>
<img src="https://user-images.githubusercontent.com/11713603/50584143-11137980-0eb1-11e9-8dc9-8ca533d129f9.png" alt="alt text" width="75%">

- ### Geoserver Layer 검수 및 공간정보 파일 검수 지원<br>
<img src="https://user-images.githubusercontent.com/11713603/50584588-ca734e80-0eb3-11e9-965d-7aca0a2fac4b.png" alt="alt text" width="75%">

- ### Openlayers Layer 객체 Navigator 기능 지원<br>
<img src="https://user-images.githubusercontent.com/11713603/50585150-f9d78a80-0eb6-11e9-9fbb-065536614d7d.gif" alt="alt text" width="75%">

- ### Geoserver Layer 분산 버전 관리(버저닝) 기능 지원<br>
<img src="https://user-images.githubusercontent.com/11713603/50584579-bd565f80-0eb3-11e9-8318-a8672eef256a.jpg" alt="alt text" width="75%">

사용 라이브러리
=====
1. jQuery 2.2.2 (MIT License, CC0) http://jquery.com/
2. jQuery UI 1.11.4 (MIT License & GPL License, this case MIT License), start theme. http://jqueryui.com/
3. GeoTools 16.5 (LGPL) http://www.geotools.org/
4. ApachePOI 3.14 (Apache License 2.0) http://poi.apache.org
5. ApacheCommons 1.3.3 (Apache License 2.0) commons.apache.org/proper/commons-logging/
6. JACKSON 1.9.7 (Apache License (AL) 2.0, LGPL 2.1)
7. JSON 20160212 (MIT License)
8. Openlayers3 v5.3.0 (FreeBSD) www.openlayers.org
9. Spectrum 1.8.0 (MIT) http://numeraljs.com/
10. Bootstrap v3.3.2 (MIT) http://getbootstrap.com
11. JSTS (EPL) http://bjornharrtell.github.io/jsts/


Mail
=====
Developer : SG.LEE
ghre55@git.co.kr

