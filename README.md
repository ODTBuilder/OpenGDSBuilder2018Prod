<a name="korean"></a>
OpenGDSBuilder2018Prod (웹 기반 공간 정보 검수 및 편집 솔루션) 
=======
이 프로젝트는 국토공간정보연구사업 중 [공간정보 SW 활용을 위한 오픈소스 가공기술 개발]과제의 연구성과 입니다.<br>
웹 상에서 공간 정보를 검수하고 편집할 수 있으며 OpenLayers, GeoTools, GeoSolution 등의 오픈소스 라이브러리들을 사용하여 개발되었습니다.<br>
별도의 프로그램 설치 없이 웹 브라우저 상에서 바로 살펴보고 버저닝 기능을 통하여 협업도 할 수 있습니다.<br>
Geoserver 연동, 레이어 검수, 레이어 편집, 객체단위 버저닝 기능을 지원하며, 사용자 편의를 고려하여 쉽고 간편한 UI로 제작되었습니다.<br>

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
- Query Tool 실행 후 아래의 query를 차례로 실행
<pre><code> 1) create extension postgis;<br>
 2) create extension postgis_topology;<br> 
 3) create table shp_layercollection (<br>
    c_idx serial primary key,<br>
    c_name character varying(200)<br>
    );<br>
 4) create table shp_layer_metadata (<br>
    lm_idx serial primary key,<br>
    layer_name varchar(200),<br>
    layer_t_name varchar(200),<br>
    current_layer_name character varying(200),<br>
    c_idx int references shp_layercollection(c_idx)<br> 
    );<br>
 5) create table shp_layercollection_qa_progress (<br>
    p_idx serial primary key,<br>
    collection_name character varying(100),<br>
    file_type character varying(50),<br>
    state int,<br>
    request_time timestamp,<br> 
    response_time timestamp,<br> 
    err_layer_name character varying(100),<br>
    c_idx int<br>
    );</code></pre>

### 4. 소스코드 설치 및 프로젝트 실행 ###
- https://github.com/ODTBuilder/OpenGDSBuilder2018Prod 접속 후 소스코드 다운로드
- eclipse 실행 후 zip 파일 형태로 Project Import
- eclipse와 톰캣 연동 후 해당 프로젝트 서버 생성
- server.xml 파일의 Context path를 "/opengds"로 변경
- src\main\resources\geoserver.properties 파일에 Geoserver 정보 입력
<pre><code> url=http://[host]:[port]/geoserver<br>
 id=[admin]<br>
 pw=[geoserver]<br> </code></pre>
- src\main\webapp\WEB-INF\spring\root-context.xml 파일에 생성한 Database 정보 입력
<pre><code> property name="url" value="jdbc:postgresql://[host]:[port]/admin" <br>
 property name="username" value="[username]" <br>
 property name="password" value="[password]" <br></code></pre>
- 서버 실행 후 메인 페이지 url 접속 
 <pre><code> http://[host]:[port]/opengds/builder.do </code></pre>
- 테스트 계정으로 로그인
 <pre><code> id : guest<br>
 pw : guest<br> </code></pre>
- 편집도구 초기화면 접속 

### 5. 검수 Test 파일 및 설정 파일 다운로드 ###
- test_data.zip 다운로드 후 압축해체
- 검수 Test 파일 (37712012.zip, 37712013.zip) 확인
<pre><code> ** 검수 Test zip 파일 구조 **
   압축파일.zip
     ㄴ폴더 (1/5000 수치지형도 인덱스명)
          ㄴ test1.shp
          ㄴ test2.shp
          ㄴ test3.shp
          ㄴ area.shp (LineString 타입의 검수 영역 레이어)
   * 모든 폴더 및 파일에 특수문자 입력 불가</code></pre>
- 레이어 설정 파일 (layer_setting.json) 확인<br>
<pre><code> ** 레이어 설정 파일 json 구조 **
    [{ 
      "layers" : [{
        "geometry" : geometry타입,
        "fix" : [{
          "values" : [val1, val2, val3, ...],
          "isnull" : boolean,
          "length" : float,
          "type" : 속성유형,
          "name" : 속성명},
          ...
        ],
        "code" : 레이어코드 },
        ...
      ],
      "name" : 레이어그룹명 },
      ...
    ]
</code></pre>
- 검수 설정 파일 (validation_setting.json) 확인<br>
<pre><code> ** 검수 설정 파일 json 구조 **
    {
      "definition" : [{
        "name" : 레이어그룹명,
        "options" : {
          "attribute" : {
            검수항목1 : {
              "filter" : 속성필터,
              "relation" : 관계레이어,
              "figure" : 수치조건
            },
            ...
          }
        }
    }
</code></pre>
** 레이어 설정 파일 및 검수 설정 파일은 편집화면에 업로드 후 편집 가능
** 자세한 내용은 GeoDT Web 웹검수 매뉴얼 "검수 항목 세부설정" 부분 참조

### 6. 검수 실행 및 오류 네비게이터 실행 ###
- 메인 페이지 url 접속 및 로그인
<pre><code> http://[host]:[port]/geodt/main.do </code></pre>
- 설정 페이지로 이동 후 레이어 설정 파일 및 검수 설정 파일 업로드 및 생성
<pre><code> 화면 상단 메뉴 “설정” 클릭 -> 새로 만들기 -> 수치지도, 구조화 선택 후 다음 버튼 클릭 </code></pre>
- 레이어 설정 파일 업로드 
<pre><code> 설정 파일 불러오기 버튼 클릭 -> layer_setting.json 업로드 -> 다음 버튼 클릭</code></pre>
- 검수 설정 파일 업로드 
<pre><code> 설정 파일 불러오기 버튼 클릭 -> validation_setting.json 업로드 -> 다음 버튼 클릭 -> 옵션 정의 이름 설정 후 저장 </code></pre>
- 검수 수행
<pre><code> 화면 상단 메뉴 “검수” 클릭 -> 사용자 설정 부분에서 방금 전 설정한 옵션을 선택 -> 파일형식 shp 선택, 좌표계 “중부원점 투영좌표계” 선택 ->검수 Test 파일 업로드 -> 검수 요청 버튼 클릭 </code></pre>
- 검수 결과
<pre><code> 화면 상단 메뉴 “요청목록” 클릭 -> 파일 이름과 검수 요청 시간을 확인 -> <br>상태 메시지가 완료가 될 때까지 대기 -> 검수 결과 파일 다운로드 링크 클릭 </code></pre>
- 검수 결과 확인 및 네비게이터
<pre><code> 화면 상단 메뉴 “편집” 클릭 -> 좌측 하단 “Now editing” 패널 부분 zip file 아이콘 클릭 -> 검수 Test 파일 및 검수 결과 파일 업로드 -> “Now editing” 패널 부분 검수 결과 부분 항목 우클릭 후 “Navigator” 클릭 -> 화면 우측에 오류 네비게이터의 화살표 버튼을 클릭하며 오류 사항 확인 </code></pre>


사용 라이브러리
=====
1. jQuery 2.2.2 (MIT License, CC0) http://jquery.com/
2. jQuery UI 1.11.4 (MIT License & GPL License, this case MIT License), start theme. http://jqueryui.com/
3. GeoTools 16.5 (LGPL) http://www.geotools.org/
4. ApachePOI 3.14 (Apache License 2.0) http://poi.apache.org
5. ApacheCommons 1.3.3 (Apache License 2.0) commons.apache.org/proper/commons-logging/
6. JACKSON 1.9.7 (Apache License (AL) 2.0, LGPL 2.1)
7. JSON 20160212 (MIT License)
8. Openlayers3 3.13.0 (FreeBSD) www.openlayers.org
9. Spectrum 1.8.0 (MIT) http://numeraljs.com/
10. Bootstrap v3.3.2 (MIT) http://getbootstrap.com
11. JSTS (EPL) http://bjornharrtell.github.io/jsts/


Mail
=====
Developer : SG.LEE
ghre55@git.co.kr

