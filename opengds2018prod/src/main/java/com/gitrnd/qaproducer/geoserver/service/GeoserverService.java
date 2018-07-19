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

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.gitrnd.gdsbuilder.fileread.FileMeta;
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
	
	
	
//	public boolean existGeoserver(String url, String id, String pw);
	
	
	/**
	 * DB에 저장된 Layer를 Geoserver에 발행하기
	 * @author SG.Lee
	 * @Date 2018. 7. 5. 오전 10:23:12
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace - Geoserver Workspace명
	 * @param dsName - Geoserver Datasource명
	 * @param layerInfo - 레이어 정보객체
	 * @return FileMeta - file 정보를 담은 객체
	 * @throws IllegalArgumentException
	 * @throws MalformedURLException FileMeta
	 * */
	public FileMeta dbLayerPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String dsName, GeoLayerInfo layerInfo);

	/**
	 *
	 * @author SG.Lee
	 * @Date 2018. 7. 5. 오전 10:26:25
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace - Geoserver Workspace명
	 * @param dsName - Geoserver Datasource명
	 * @param layerInfo - 레이어 정보객체
	 * @return boolean
	 * */
	public boolean errLayerPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String dsName, GeoLayerInfo layerInfo);
	
	/**
	 * @Description Workspace 조건에 따른 Workspace단위 트리생성
	 * @author SG.Lee
	 * @Date 2018. 7. 13. 오후 4:48:25
	 * @param dtGeoManagers
	 * @param serverName 서버명
	 * @return JSONArray
	 * */
	public JSONArray getGeoserverLayerCollectionTree(DTGeoserverManagerList dtGeoManagers, String treeID, String type);
	
	/**
	 * @Description 전체 트리생성 
	 * @author SG.Lee
	 * @Date 2018. 7. 13. 오후 4:58:43
	 * @param dtGeoserverMList
	 * @return JSONArray
	 * */
	public JSONArray getGeoserverLayerCollectionTrees(DTGeoserverManagerList dtGeoserverMList);
	
	
	/**
	 * 레이어를 중복체크한다.
	 * @author SG.Lee
	 * @Date 2017. 7
	 * @param dtGeoManager - DTGeoserverManager Object 
	 * @param workspace - Geoserver Workspace명
	 * @param layerList - 중복체크할 레이어명 리스트
	 * @return JSONObject - {레이어명 : 중복여부}
	 * */
	public JSONObject duplicateCheck(DTGeoserverManager dtGeoManager, String workspace, ArrayList<String> layerList);
	
	/**
	 * DTGeoLayerList를 조회한다.
	 * @author SG.Lee
	 * @Date 2017. 4
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace - Geoserver Workspace명
	 * @param layerList - 레이어명 리스트
	 * @return DTGeoLayerList
	 * */
	public DTGeoLayerList getGeoLayerList(DTGeoserverManager dtGeoManager, String workspace, ArrayList<String> layerList);
	
	/**
	 * DTGeoGroupLayerList를 조회한다.
	 * @author SG.Lee 
	 * @Date 2017. 4
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace - Geoserver Workspace명
	 * @param groupList - 그룹레이어명 리스트
	 * @return DTGeoGroupLayerList
	 * */
	public DTGeoGroupLayerList getGeoGroupLayerList(DTGeoserverManager dtGeoManager, String workspace, ArrayList<String> groupList);
	
	/**
	 * 그룹레이어 삭제
	 * @author SG.Lee
	 * @Date 2018. 7. 5. 오후 1:17:28
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace - Geoserver Workspace명
	 * @param dsName - Geoserver Datasource명
	 * @param groupLayerName - 그룹레이어명
	 * @param layerName - 레이어명
	 * @return boolean
	 * */
	public boolean removeDTGeoserverLayer(DTGeoserverManager dtGeoManager, String workspace, String dsName, String groupLayerName, String layerName);
	
	/**
	 * 다중 레이어를 삭제
	 * @author SG.Lee
	 * @Date 2017. 6. 5. 오전 10:40:17
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace - Geoserver Workspace명
	 * @param layerNameList 삭제할 레이어 이름 리스트
	 * @return boolean - 삭제여부
	 * */
	public boolean removeDTGeoserverLayers(DTGeoserverManager dtGeoManager, String workspace, List<String> layerNameList);
	
	/**
	 * Geoserver Workspace내의 모든 레이어삭제
	 * @author SG.Lee
	 * @Date 2017. 6. 5. 오전 11:08:03
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param workspace - Geoserver Workspace명
	 * @param dsName - Geoserver Datasource명
	 * @param groupLayerName 삭제할 그룹레이어
	 * @return boolean - 삭제여부
	 * */
	public boolean removeDTGeoserverAllLayer(DTGeoserverManager dtGeoManager, String workspace, String dsName, final String groupLayerName);
	
	
	/**
	 * Geoserver 스타일리스트 조회
	 * @author SG.Lee
	 * @Date 2017. 6. 19. 오후 9:15:07
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @return boolean
	 * */
	public List<String> getGeoserverStyleList(DTGeoserverManager dtGeoManager);
	
	
	/**
	 * Geoserver 스타일을 생성
	 * @author SG.Lee
	 * @Date 2017. 6. 7. 오후 6:15:55
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param sldBody
	 * @param name
	 * @return boolean
	 * */
	public boolean publishStyle(DTGeoserverManager dtGeoManager, String sldBody, String name);
	
	/**
	 * Geoserver 스타일을 수정한다.
	 * @author SG.Lee
	 * @Date 2017. 6. 7. 오후 6:15:57
	 * @param dtGeoManager - DTGeoserverManager Object 
	 * @param sldBody
	 * @param name
	 * @return boolean
	 * */
	public boolean updateStyle(DTGeoserverManager dtGeoManager, final String sldBody, final String name);
	
	/**
	 * Geoserver 스타일을 삭제한다.
	 * @author SG.Lee
	 * @Date 2017. 6. 7. 오후 6:16:01
	 * @param dtGeoManager - DTGeoserverManager Object
	 * @param styleName
	 * @return boolean
	 * */
	public boolean removeStyle(DTGeoserverManager dtGeoManager, final String styleName);
	
	
	
	/**
	 * Geoserver 레이어를 업데이트한다.
	 * @author SG.Lee
	 * @Date 2017. 6. 19. 오후 7:45:22
	 * @param orginalName
	 * @param name
	 * @param title
	 * @param abstractContent
	 * @param style
	 * @param attChangeFlag
	 * @return boolean
	 * */
	public boolean updateFeatureType(DTGeoserverManager dtGeoManager, String workspace, String dsName, final String orginalName,final String name,final String title,final String abstractContent,final String style, boolean attChangeFlag);
}


