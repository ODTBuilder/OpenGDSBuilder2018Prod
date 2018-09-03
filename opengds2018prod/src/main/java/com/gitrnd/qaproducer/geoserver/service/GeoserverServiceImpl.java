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
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geolayer.data.DTGeoGroupLayer;
import com.gitrnd.gdsbuilder.geolayer.data.DTGeoGroupLayerList;
import com.gitrnd.gdsbuilder.geolayer.data.DTGeoLayer;
import com.gitrnd.gdsbuilder.geolayer.data.DTGeoLayerList;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverPublisher;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverReader;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
import com.gitrnd.gdsbuilder.geoserver.data.tree.DTGeoserverTree.EnTreeType;
import com.gitrnd.gdsbuilder.geoserver.data.tree.factory.impl.DTGeoserverTreeFactoryImpl;
import com.gitrnd.gdsbuilder.type.geoserver.layer.GeoLayerInfo;
import com.vividsolutions.jts.geom.Geometry;

import it.geosolutions.geoserver.rest.encoder.GSLayerEncoder;
import it.geosolutions.geoserver.rest.encoder.GSLayerGroupEncoder;
import it.geosolutions.geoserver.rest.encoder.feature.GSFeatureTypeEncoder;

/**
 * Geoserver와 관련된 요청을 처리하는 클래스
 * 
 * @author SG.Lee
 * @Date 2017. 5. 12. 오전 2:22:14
 */
@Service("geoService")
public class GeoserverServiceImpl implements GeoserverService {

	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	private DTGeoserverReader dtReader;
	private DTGeoserverPublisher dtPublisher;

	
	/*public GeoserverServiceImpl(DTGeoserverManager dtGeoManager){
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
	}*/
	
	public boolean shpLayerPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String dsName, String layerName, File zipFile, String srs){
		boolean puFlag = false;
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
			dtPublisher = dtGeoManager.getPublisher();
			
			try {
				puFlag = dtPublisher.publishShp(workspace, dsName, layerName, zipFile, srs);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				logger.warn("발행실패");
			}
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		
		return puFlag;
	}
	
	public boolean shpLayerPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String dsName, String layerName, File zipFile, String srs, String defaultStyle){
		boolean puFlag = false;
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
			dtPublisher = dtGeoManager.getPublisher();
			try {
				puFlag = dtPublisher.publishShp(workspace, dsName, layerName, zipFile, srs, defaultStyle);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				logger.warn("발행실패");
			}
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		return puFlag;
	}
	
	
	

	/**
	 * @since 2018. 7. 13.
	 * @author SG.Lee
	 * @param dtGeoManagers
	 * @param serverName
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#getGeoserverLayerCollectionTree(com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList, java.lang.String)
	 */
	@SuppressWarnings("unchecked")
	@Override
	public JSONArray getGeoserverLayerCollectionTree(DTGeoserverManagerList dtGeoserverMList, String parent, String serverName, String type) {
		JSONArray jsonArray = new JSONArray();
		EnTreeType enType = null;
		if(dtGeoserverMList!=null){
			if(type.toLowerCase().equals("server")){
				enType = EnTreeType.SERVER;
			}else if(type.toLowerCase().equals("workspace")){
				enType = EnTreeType.WORKSPACE;
			}else if(type.toLowerCase().equals("datastore")){
				enType = EnTreeType.DATASTORE;
			}else if(type.toLowerCase().equals("layer")){
				enType = EnTreeType.LAYER;
			}else{
				logger.warn("DTGeoserverManagerList Null");
			}
			if(enType!=null){
				if(enType==EnTreeType.SERVER){
					jsonArray = new DTGeoserverTreeFactoryImpl().createDTGeoserverTree(dtGeoserverMList, enType);
				}else{
					jsonArray = new DTGeoserverTreeFactoryImpl().createDTGeoserverTree(dtGeoserverMList,parent,serverName,enType);
				}
			}
		} else {
			// TODO: handle exception
			logger.warn("DTGeoserverManagerList Null");
		}
		return jsonArray;
	}
	
	/**
	 * @since 2018. 7. 13.
	 * @author SG.Lee
	 * @param dtGeoserverMList
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#getGeoserverLayerCollectionTree(com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList)
	 */
	@SuppressWarnings("unchecked")
	public JSONArray getGeoserverLayerCollectionTrees(DTGeoserverManagerList dtGeoserverMList){
		JSONArray jsonArray = new JSONArray();
		
		if(dtGeoserverMList!=null){
			jsonArray = new DTGeoserverTreeFactoryImpl().createDTGeoserverTrees(dtGeoserverMList);
			if(jsonArray.size()==0){
				JSONObject errorJSON = new JSONObject();
				errorJSON.put("id", 200);
				errorJSON.put("parent", "#");
				errorJSON.put("text", "No Geoserver");
				errorJSON.put("type", "info");
				jsonArray.add(errorJSON);
			}
		}else{
			JSONObject errorJSON = new JSONObject();
			errorJSON.put("id", 200);
			errorJSON.put("parent", "#");
			errorJSON.put("text", "No Geoserver");
			errorJSON.put("type", "info");
			jsonArray.add(errorJSON);
		}
		return jsonArray;
	}

	/**
	 * @since 2018. 7. 5.
	 * @author SG.Lee
	 * @param dtGeoManager
	 * @param workspace
	 * @param layerList
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#duplicateCheck(com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String, java.util.ArrayList)
	 */
	@SuppressWarnings("unchecked")
	@Override
	public JSONObject duplicateCheck(DTGeoserverManager dtGeoManager, String workspace, ArrayList<String> layerList) {
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		
		
		JSONObject object = new JSONObject();
		for (String layerName : layerList) {
			object.put(layerName, dtReader.existsLayer(workspace, layerName));
		}
		
		return object;
	}

	/**
	 * @since 2018. 7. 5.
	 * @author SG.Lee
	 * @param dtGeoManager
	 * @param workspace
	 * @param layerList
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#getGeoLayerList(com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String, java.util.ArrayList)
	 */
	@Override
	public DTGeoLayerList getGeoLayerList(DTGeoserverManager dtGeoManager, String workspace, ArrayList<String> layerList) {
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		
		if (layerList == null)
			throw new IllegalArgumentException("LayerNames may not be null");
		if (layerList.size() == 0)
			throw new IllegalArgumentException("LayerNames may not be null");
		return dtReader.getDTGeoLayerList(workspace, layerList);
	}

	/**
	 * @since 2017. 4
	 * @author SG.Lee
	 * @param groupList
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#getGeoGroupLayerList(java.util.ArrayList)
	 */
	@Override
	public DTGeoGroupLayerList getGeoGroupLayerList(DTGeoserverManager dtGeoManager, String workspace, ArrayList<String> groupList) {
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		
		
		if (groupList == null)
			throw new IllegalArgumentException("GroupNames may not be null");
		if (groupList.size() == 0)
			throw new IllegalArgumentException("GroupNames may not be null");
		return dtReader.getDTGeoGroupLayerList(workspace, groupList);
	}

	/**
	 * @since 2017. 6. 5.
	 * @author SG.Lee
	 * @param layerName
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#removeGeoserverLayer(java.lang.String)
	 */
	@Override
	public boolean removeDTGeoserverLayer(DTGeoserverManager dtGeoManager, String workspace, String dsName, String groupLayerName, String layerName) {
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		
		boolean isConfigureGroup = false;
		boolean isRemoveFeatureType = false;
		DTGeoGroupLayer dtGeoGroupLayer = dtReader.getDTGeoGroupLayer(workspace, groupLayerName);

		if (dtGeoGroupLayer != null) {
			List<String> layerList = dtGeoGroupLayer.getPublishedList().getNames();
			layerList.remove(layerName);

			GSLayerGroupEncoder groupEncoder = new GSLayerGroupEncoder();
			groupEncoder.setName(dtGeoGroupLayer.getName());
			groupEncoder.setWorkspace(dtGeoGroupLayer.getWorkspace());
			groupEncoder.setBounds(dtGeoGroupLayer.getCRS(), dtGeoGroupLayer.getMinX(), dtGeoGroupLayer.getMaxY(),
					dtGeoGroupLayer.getMinY(), dtGeoGroupLayer.getMaxY());
			for (String name : layerList) {
				groupEncoder.addLayer(workspace + ":" + name);
			}
			isConfigureGroup = dtPublisher.configureLayerGroup(workspace, groupLayerName, groupEncoder);
			isRemoveFeatureType = dtPublisher.unpublishFeatureType(workspace, dsName, layerName);
			// isRemoveLayer = dtPublisher.removeLayer(userVO.getId(),
			// layerName);
		} else {
			isRemoveFeatureType = dtPublisher.unpublishFeatureType(workspace, dsName, layerName);
			if (!isRemoveFeatureType) {
				return false;
			}
			return true;
		}
		if (!isConfigureGroup && !isRemoveFeatureType) {
			return false;
		}
		return true;
	}

	/**
	 * @since 2018. 7. 5.6
	 * @author SG.Lee
	 * @param workspace
	 * @param layerNameList
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#removeDTGeoserverLayers(java.lang.String, java.util.List)
	 */
	@Override
	public long removeDTGeoserverLayers(DTGeoserverManager dtGeoManager, String workspace, List<String> layerNameList) {
		long resultFlag = 500;
		if(dtGeoManager!=null){
			dtPublisher = dtGeoManager.getPublisher();
			boolean removeFlag = dtPublisher.removeLayers(workspace, layerNameList);
			if(removeFlag){
				resultFlag = 200; // 성공
			}else{
				resultFlag = 606; //일부성공 또는 실패
			}
		}else{
			resultFlag = 605; // Geoserver 정보없음
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		return resultFlag;
	}

	/**
	 * @since 2017. 6. 5.
	 * @author SG.Lee
	 * @param groupLayerName
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#removeGeoserverGroupLayer(java.lang.String)
	 */
	@Override
	public boolean removeDTGeoserverAllLayer(DTGeoserverManager dtGeoManager, String workspace, String dsName, String groupLayerName) {
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}

		boolean isRemoveFlag = false;
		DTGeoGroupLayer dtGeoGroupLayer = dtReader.getDTGeoGroupLayer(workspace, groupLayerName);

		int flagVal = 0;
		if (dtGeoGroupLayer != null) {
			List<String> layerList = dtGeoGroupLayer.getPublishedList().getNames();

			dtPublisher.removeLayerGroup(workspace, groupLayerName);

			for (String layerName : layerList) {
				boolean isRemoveFeatureType = dtPublisher.unpublishFeatureType(workspace, dsName,
						layerName);
				if (isRemoveFeatureType) {
					flagVal++;
				}
			}

			if (layerList.size() == flagVal) {
				isRemoveFlag = true;
			} else
				isRemoveFlag = false;
		} else
			isRemoveFlag = false;
		return isRemoveFlag;
	}

	/**
	 *
	 * @author SG.Lee
	 * @Date 2017. 6. 19. 오후 9:15:07
	 * @return boolean
	 */
	@Override
	public List<String> getGeoserverStyleList(DTGeoserverManager dtGeoManager) {
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		return dtReader.getStyles().getNames();
	}

	/**
	 * 
	 * @since 2017. 6. 7.
	 * @author SG.Lee
	 * @param sldBody
	 * @param name
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#publishStyle(java.lang.String,
	 *      java.lang.String)
	 */
	@Override
	public boolean publishStyle(DTGeoserverManager dtGeoManager, final String sldBody, final String name) {
		if(dtGeoManager!=null){
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		return dtPublisher.publishStyle(sldBody, name);
	};

	/**
	 * 
	 * @since 2017. 6. 7.
	 * @author SG.Lee
	 * @param sldBody
	 * @param name
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#updateStyle(java.lang.String,
	 *      java.lang.String)
	 */
	@Override
	public boolean updateStyle(DTGeoserverManager dtGeoManager, final String sldBody, final String name) {
		if(dtGeoManager!=null){
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		return dtPublisher.updateStyle(sldBody, name);
	};

	/**
	 * 
	 * @since 2017. 6. 7.
	 * @author SG.Lee
	 * @param styleName
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#removeStyle(java.lang.String)
	 */
	@Override
	public boolean removeStyle(DTGeoserverManager dtGeoManager, String styleName) {
		if(dtGeoManager!=null){
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		return dtPublisher.removeStyle(styleName);
	};

	@Override
	public boolean updateFeatureType(DTGeoserverManager dtGeoManager, String workspace, String dsName, String orginalName, String name, String title,
			String abstractContent, String style, boolean attChangeFlag) {
		if(dtGeoManager!=null){
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		
		boolean updateFlag = false;
		GSFeatureTypeEncoder fte = new GSFeatureTypeEncoder();
		GSLayerEncoder layerEncoder = null;

		if (orginalName == null) {
			// throw new IllegalArgumentException("OriginalName may not be
			// null!");
			return false;
		}
		if (orginalName.isEmpty()) {
			// throw new IllegalArgumentException("OriginalName may not be
			// empty!");
			return false;
		}
		if (name != null && !name.isEmpty()) {
			fte.setName(name);
		}
		if (title != null && !title.isEmpty()) {
			fte.setTitle(title);
		}
		if (abstractContent != null && !abstractContent.isEmpty()) {
			fte.setAbstract(abstractContent);
		}
		if (style != null && !style.isEmpty()) {
			layerEncoder = new GSLayerEncoder();
			layerEncoder.setDefaultStyle(style);
		}

		// boolean flag = dtPublisher.recalculate(workspace, storename,
		// layerFullName, testFte, testLayerEncoder);
		updateFlag = dtPublisher.updateFeatureType(workspace, dsName, orginalName, fte, layerEncoder,
				attChangeFlag);

		return updateFlag;
	}


	@Override
	public boolean errLayerPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String dsName, GeoLayerInfo geoLayerInfo) {
		if(dtGeoManager!=null){
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		// TODO Auto-generated method stub
		return dtPublisher.publishErrLayer(workspace, dsName, geoLayerInfo);
	}
	
	@Override
	public String requestWFSTransaction(DTGeoserverManager dtGeoManager, String workspace, String wfstXml){
		if(dtGeoManager!=null){
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		return dtPublisher.requestWFSTransaction(workspace,wfstXml);
	}
	
	
	@Override
	public String getLayerStyleSld(DTGeoserverManager dtGeoManager, String workspace, String layerName){
		String sld = "";
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
			DTGeoLayer dtLayer = dtReader.getDTGeoLayer(workspace, layerName);
			String style = dtLayer.getStyle();
			sld = dtReader.getSLD(workspace, style);
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		return sld;
	}
}

/**
 * 쓰레드 Result 클래스
 * 
 * @author SG.Lee
 * @Date 2017. 9. 6. 오후 3:09:38
 */
class Result {
	List<String> successLayerList = new ArrayList<String>();
	Collection<Geometry> geometryCollection = new ArrayList<Geometry>();
	int failCount = 0;

	synchronized void addLayerName(String layerName) {
		successLayerList.add(layerName);
	}

	synchronized void addGeoCollection(Geometry geometry) {
		geometryCollection.add(geometry);
	}

	synchronized void addFailCount() {
		failCount++;
	}
}
