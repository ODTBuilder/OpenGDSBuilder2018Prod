/*
 *    OpenGDS/Builder
 *    http://git.co.kr
 *
 *    (C) 2014-2017, GeoSpatial Information Technology(GIT)
 *    
 *    This library is free software; you can redistribute it and/or
 *    modify it under the terms of the GNU Lesser General Public
 *    License as published by the Free Software Foundation;
 *    version 3 of the License.
 *
 *    This library is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *    Lesser General Public License for more details.
 */

package com.gitrnd.qaproducer.geoserver.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.gitrnd.gdsbuilder.geolayer.data.DTGeoGroupLayerList;
import com.gitrnd.gdsbuilder.geolayer.data.DTGeoLayerList;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
import com.gitrnd.gdsbuilder.type.geoserver.layer.GeoLayerInfo;

/**
 * @ClassName: GeoserverService
 * @Description: Geoserver와 관련된 데이터를 처리한다.
 * @author JY.Kim
 * @date 2017. 4. 3. 오후 2:59:12
 */
public interface GeoserverService {

	/**
	 * @Description SHP파일 발행(레이어 존재해있어야함)
	 * @author SG.Lee
	 * @Date 2018. 7. 31. 오전 9:44:27
	 * @param dtGeoManager
	 * @param workspace    작업공간
	 * @param dsName       저장소
	 * @param layerName    레이어명
	 * @param zipFile      대상파일(shp,dxf,shx...)
	 * @param srs          좌표계
	 * @return boolean
	 */
	/**
	 * @Description
	 * @author SG.Lee
	 * @Date 2018. 12. 14. 오후 2:48:33
	 * @param dtGeoManager
	 * @param workspace    작업공간
	 * @param dsName       저장소
	 * @param layerName    레이어명
	 * @param zipFile      대상파일(shp,dxf,shx...)
	 * @param srs          좌표계
	 * @return int 200 발행성공 500 서버에러 605 서버존재X 610 발행실패
	 */
	public int shpLayerPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String dsName,
			String layerName, File zipFile, String srs);

	/**
	 * @Description SHP파일 발행(레이어 존재해있어야함)
	 * @author SG.Lee
	 * @Date 2018. 7. 31. 오전 9:44:29
	 * @param dtGeoManager
	 * @param workspace    작업공간
	 * @param dsName       저장소
	 * @param layerName    레이어명
	 * @param zipFile      대상파일(shp,dxf,shx...)
	 * @param srs          좌표계
	 * @param defaultStyle 스타일
	 * @return int 200 발행성공 500 서버에러 605 서버존재X 610 발행실패
	 */
	public int shpLayerPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String dsName,
			String layerName, File zipFile, String srs, String defaultStyle);

	/**
	 * @Description SHP파일 업로드
	 * @author SG.Lee
	 * @Date 2018. 11. 5. 오후 5:35:37
	 * @param dtGeoManager
	 * @param workspace    작업공간
	 * @param datastore    저장소
	 * @param request      MultipartHttpServletRequest
	 * @return JSONObject {file1 : 200, file2 : 500....} 200 : 성공 500 : 발행실패 600 :
	 *         로그인세션 없음 604 : Geoserver 정보오류 607 : workspace 또는 datastore 존재 X 608 :
	 *         파일구조 이상 609 : 레이어 중복 613 : 데이터 존재 -> 미발행레이어 615 : prj파일 없음
	 */
	public JSONObject shpCollectionPublishGeoserver(MultipartHttpServletRequest request,
			DTGeoserverManager dtGeoManager, String workspace, String datastore, boolean ignorePublication);

	/**
	 * @Description JSON파일 업로드
	 * @author SG.Lee
	 * @Date 2019. 2. 27. 오후 6:06:28
	 * @param dtGeoManager      DTGeoserverManager Object
	 * @param workspace         Geoserver Workspace명
	 * @param datastore         Geoserver Datasource명
	 * @param layerName         저장하고 싶은 layer명
	 * @param epsg              좌표계
	 * @param uploadJsons       { "serverName" : "테스트서버", "workspace" : "작업공간",
	 *                          "datastore" : "저장소", "epsg" : "4326",
	 *                          "ignorePublication" : "false", "uploadJson" :
	 *                          [{"layername":"layer1","geojson":{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[126.5011195,37.2537839],[126.5011442,37.2538722]...]]]},
	 *                          "properties":{"osm_id":"550217018","code":1020,"fclass":"island","population":0,"name":"빌딩"},"id":"d21dd1922902"}]},
	 *                          "attJson" :
	 *                          {"osm_id":"String","code":"Integer","fclass":"String","population":"Integer","name":"String"}},
	 *                          {"layername":"layer2","geojson":{}}] }
	 * @param ignorePublication 미발행 레이어 무시여부
	 * @return JSONObject {file1 : 200, file2 : 500....} 200 : 성공 500 : 발행실패 600 :
	 *         로그인세션 없음 604 : Geoserver 정보오류 607 : workspace 또는 datastore 존재 X 609 :
	 *         레이어 중복 610 : 발행실패 613 : 데이터 존재 -> 미발행레이어 614 : Geojson 오류
	 */
	public JSONObject geojsonPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String datastore,
			String epsg, List<JSONObject> uploadJsons, boolean ignorePublication);

	/**
	 * @Description 에러 레이어 발행
	 * @author SG.Lee
	 * @Date 2018. 7. 5. 오전 10:26:25
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace    - Geoserver Workspace명
	 * @param dsName       - Geoserver Datasource명
	 * @param layerInfo    - 레이어 정보객체
	 * @return boolean
	 */
	public boolean errLayerPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String dsName,
			GeoLayerInfo layerInfo);

	/**
	 * @Description Workspace 조건에 따른 Workspace단위 트리생성
	 * @author SG.Lee
	 * @Date 2018. 7. 13. 오후 4:48:25
	 * @param dtGeoManagers
	 * @param serverName    서버명
	 * @return JSONArray
	 */
	public JSONArray getGeoserverLayerCollectionTree(DTGeoserverManagerList dtGeoManagers, String parent,
			String serverName, String type);

	/**
	 * @Description 전체 트리생성
	 * @author SG.Lee
	 * @Date 2018. 7. 13. 오후 4:58:43
	 * @param dtGeoserverMList
	 * @return JSONArray
	 */
	public JSONArray getGeoserverLayerCollectionTrees(DTGeoserverManagerList dtGeoserverMList);

	/**
	 * 레이어를 중복체크한다.
	 * 
	 * @author SG.Lee
	 * @Date 2017. 7
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace    - Geoserver Workspace명
	 * @param layerList    - 중복체크할 레이어명 리스트
	 * @return JSONObject - {레이어명 : 중복여부}
	 */
	public JSONObject duplicateCheck(DTGeoserverManager dtGeoManager, String workspace, ArrayList<String> layerList);

	/**
	 * DTGeoLayerList를 조회한다.
	 * 
	 * @author SG.Lee
	 * @Date 2017. 4
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace    - Geoserver Workspace명
	 * @param layerList    - 레이어명 리스트
	 * @return DTGeoLayerList
	 */
	public DTGeoLayerList getGeoLayerList(DTGeoserverManager dtGeoManager, String workspace,
			ArrayList<String> layerList);

	/**
	 * DTGeoGroupLayerList를 조회한다.
	 * 
	 * @author SG.Lee
	 * @Date 2017. 4
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace    - Geoserver Workspace명
	 * @param groupList    - 그룹레이어명 리스트
	 * @return DTGeoGroupLayerList
	 */
	public DTGeoGroupLayerList getGeoGroupLayerList(DTGeoserverManager dtGeoManager, String workspace,
			ArrayList<String> groupList);

	/**
	 * 다중 레이어를 삭제
	 * 
	 * @author SG.Lee
	 * @Date 2017. 6. 5. 오전 10:40:17
	 * @param dtGeoManager  - DTGeoserverManager Object
	 * @param workspace     - Geoserver Workspace명
	 * @param dsName        - Geoserver Datasource명
	 * @param layerNameList 삭제할 레이어 이름 리스트
	 * @return int - 200 성공 - 500 요청실패 - 605 해당 조건에 맞는 서버존재X - 606 일부성공 또는 실패
	 */
	public int removeDTGeoserverLayers(DTGeoserverManager dtGeoManager, String workspace, String dsName,
			List<String> layerNameList);

	/**
	 * Geoserver Workspace내의 모든 레이어삭제
	 * 
	 * @author SG.Lee
	 * @Date 2017. 6. 5. 오전 11:08:03
	 * @param dtGeoManager   - DTGeoserverManager Object
	 * @param workspace      - Geoserver Workspace명
	 * @param dsName         - Geoserver Datasource명
	 * @param groupLayerName 삭제할 그룹레이어
	 * @return boolean - 삭제여부
	 */
	public boolean removeDTGeoserverAllLayer(DTGeoserverManager dtGeoManager, String workspace, String dsName,
			final String groupLayerName);

	/**
	 * Geoserver 스타일리스트 조회
	 * 
	 * @author SG.Lee
	 * @Date 2017. 6. 19. 오후 9:15:07
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @return boolean
	 */
	public List<String> getGeoserverStyleList(DTGeoserverManager dtGeoManager);

	/**
	 * Geoserver 스타일을 생성
	 * 
	 * @author SG.Lee
	 * @Date 2017. 6. 7. 오후 6:15:55
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param sldBody
	 * @param name
	 * @return boolean
	 */
	public boolean publishStyle(DTGeoserverManager dtGeoManager, String sldBody, String name);

	/**
	 * Geoserver 스타일을 수정한다.
	 * 
	 * @author SG.Lee
	 * @Date 2017. 6. 7. 오후 6:15:57
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param sldBody
	 * @param name
	 * @return boolean
	 */
	public boolean updateStyle(DTGeoserverManager dtGeoManager, final String sldBody, final String name);

	/**
	 * Geoserver 스타일을 삭제한다.
	 * 
	 * @author SG.Lee
	 * @Date 2017. 6. 7. 오후 6:16:01
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param styleName
	 * @return boolean
	 */
	public boolean removeStyle(DTGeoserverManager dtGeoManager, final String styleName);

	/**
	 * Geoserver 레이어를 업데이트한다.
	 * 
	 * @author SG.Lee
	 * @Date 2017. 6. 19. 오후 7:45:22
	 * @param orginalName
	 * @param name
	 * @param title
	 * @param abstractContent
	 * @param style
	 * @param attChangeFlag
	 * @return boolean
	 */
	public boolean updateFeatureType(DTGeoserverManager dtGeoManager, String workspace, String dsName,
			final String orginalName, final String name, final String title, final String abstractContent,
			final String srs, final String style, boolean attChangeFlag);

	/**
	 * @Description WFST 서비스를 요청한다.
	 * @author SG.Lee
	 * @Date 2018. 7. 20. 오후 2:47:50
	 * @param dtGeoManager
	 * @param wfstXml
	 * @return String
	 */
	public String requestWFSTransaction(DTGeoserverManager dtGeoManager, String workspace, String wfstXml);

	/**
	 * @Description sld 조회
	 * @author SG.Lee
	 * @Date 2018. 8. 16. 오후 1:26:03
	 * @param dtGeoManager
	 * @param workspace
	 * @param layerName
	 * @return String
	 */
	public String getLayerStyleSld(DTGeoserverManager dtGeoManager, String workspace, String layerName);

	/**
	 * @Description 레이어 유효성체크
	 * @author SG.Lee
	 * @Date 2018. 11. 5. 오후 3:22:37
	 * @param dtGeoManager
	 * @param workspace    작업공간
	 * @param layerName    레이어명
	 * @return boolean
	 */
	public boolean exsistLayer(DTGeoserverManager dtGeoManager, String workspace, String layerName);

	/**
	 * Geogig Repository 기반의 Datastore Branch Checkout 요청.
	 * <p>
	 * Checkout된 Branch의 데이터로 Datastore 변경.
	 * 
	 * @param geoserverManager Geoserver 접속 정보
	 * @param workspace        geoserver ws
	 * @param datastore        geoserver ds
	 * @param branch           checkout Branch 명
	 * @return checkout 성공 여부
	 *         <p>
	 *         {@code true} : 성공, {@code false} : 실패
	 * 
	 * @author DY.Oh
	 */
	public boolean updateGeogigGsStore(DTGeoserverManager geoserverManager, String workspace, String datastore,
			String branch);

	/**
	 * @Description 스타일리스트 조회
	 * @author SG.Lee
	 * @Date 2018. 11. 21. 오후 5:13:14
	 * @param geoserverManager
	 * @return List<String>
	 */
	public List<String> getStyleList(DTGeoserverManager geoserverManager);

	/**
	 * @Description 스타일리스트 조회
	 * @author SG.Lee
	 * @Date 2018. 11. 21. 오후 6:00:41
	 * @param geoserverManager
	 * @param workspace
	 * @return List<String>
	 */
	public List<String> getStyleList(DTGeoserverManager geoserverManager, String workspace);
}
