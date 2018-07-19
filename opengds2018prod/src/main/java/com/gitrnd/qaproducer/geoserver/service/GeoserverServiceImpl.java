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

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.geotools.geometry.jts.JTSFactoryFinder;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.fileread.FileMeta;
import com.gitrnd.gdsbuilder.geolayer.data.DTGeoGroupLayer;
import com.gitrnd.gdsbuilder.geolayer.data.DTGeoGroupLayerList;
import com.gitrnd.gdsbuilder.geolayer.data.DTGeoLayerList;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverPublisher;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverReader;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
import com.gitrnd.gdsbuilder.geoserver.data.tree.DTGeoserverTree.EnTreeType;
import com.gitrnd.gdsbuilder.geoserver.data.tree.factory.impl.DTGeoserverTreeFactoryImpl;
import com.gitrnd.gdsbuilder.type.geoserver.layer.GeoLayerInfo;
import com.gitrnd.qaproducer.geoserver.data.style.GeoserverSldTextType;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.LinearRing;
import com.vividsolutions.jts.geom.Polygon;

import it.geosolutions.geoserver.rest.decoder.RESTFeatureType;
import it.geosolutions.geoserver.rest.decoder.RESTLayer;
import it.geosolutions.geoserver.rest.encoder.GSLayerEncoder;
import it.geosolutions.geoserver.rest.encoder.GSLayerGroupEncoder;
import it.geosolutions.geoserver.rest.encoder.GSResourceEncoder.ProjectionPolicy;
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

	/**
	 *
	 * @author SG.Lee
	 * @Date 2018. 7. 5. 오전 11:07:51
	 * @param workspace
	 * @param dsName
	 * @param layerInfo
	 * @return FileMeta
	 * */
	@SuppressWarnings("unused")
	public FileMeta dbLayerPublishGeoserver(DTGeoserverManager dtGeoManager, String workspace, String dsName,GeoLayerInfo layerInfo) {
		if(dtGeoManager!=null){
			dtReader = dtGeoManager.getReader();
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		
		String fileName = layerInfo.getFileName();
		List<String> layerNameList = layerInfo.getLayerNames();
		String originSrc = "EPSG:" + layerInfo.getOriginSrc();
		List<String> successLayerList = new ArrayList<String>();
		String fileType = layerInfo.getFileType();
		// boolean flag = false;

		// Collection<Geometry> geometryCollection = new ArrayList<Geometry>();
		GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory();

		GeoserverSldTextType sldType = new GeoserverSldTextType(); // Geoserver
																	// TEXT 타입

		ExecutorService executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());

		System.out.println("작업 처리 요청 !");

		Result result = new Result();

		class Task implements Runnable {
			Result result;
			String layerName;

			boolean flag = false;

			Task(Result result, String layerName) {
				this.result = result;
				this.layerName = layerName;
			}

			@Override
			public void run() {
				/*
				 * int sum = 0;
				 * 
				 * for (int i = 1; i <= 10; i++) { sum += i; }
				 * 
				 * result.addValue(sum);
				 */
				GSFeatureTypeEncoder fte = new GSFeatureTypeEncoder();
				GSLayerEncoder layerEncoder = new GSLayerEncoder();
				String upperLayerName = layerName.toUpperCase();

				int dash = layerName.indexOf("_");
				String cutLayerName = layerName.substring(0, dash);
				String layerType = layerName.substring(dash + 1);
				String layerFullName = "geo_" + fileType + "_" + fileName + "_" + layerName;

				fte.setProjectionPolicy(ProjectionPolicy.REPROJECT_TO_DECLARED);
				fte.setTitle(layerFullName); // 제목
				fte.setName(layerFullName); // 이름
				fte.setSRS(originSrc); // 좌표
				fte.setNativeCRS(originSrc);
				fte.setNativeName(layerFullName); // nativeName

				// 성능향상
				// fte.addMetadata("cacheAgeMax", "604800");
				// fte.addMetadata("cachingEnabled", ("true"));

				// Style 적용
				String styleName = upperLayerName;

				if (layerType.equals("TEXT")) {
					List<String> smallTextList = sldType.getSmallTextList();
					List<String> mediumTextList = sldType.getMediumTextList();
					List<String> largeTextList = sldType.getLargeTextList();
					List<String> exceptTextList = sldType.getExceptTextList();

					boolean isTextStyle = false;

					for (String stext : smallTextList) {
						if (cutLayerName.equals(stext)) {
							styleName = "SMALL_TEXT";
							isTextStyle = true;
						}
					}

					if (!isTextStyle) {
						for (String mtext : mediumTextList) {
							if (cutLayerName.equals(mtext)) {
								styleName = "MEDIUM_TEXT";
								isTextStyle = true;
								break;
							}
						}
						if (!isTextStyle) {
							for (String ltext : largeTextList) {
								if (cutLayerName.equals(ltext)) {
									styleName = "LARGE_TEXT";
									isTextStyle = true;
								}
							}
						}
						if (!isTextStyle) {
							if (cutLayerName.toUpperCase().equals("H0059153")) {
								if (fileType.equals("dxf")) {
									styleName = "DXF_" + cutLayerName + "+_TEXT";
									isTextStyle = true;
								} else if (fileType.equals("ngi")) {
									styleName = "NGI_" + cutLayerName + "+_TEXT";
									isTextStyle = true;
								}
							} else if (cutLayerName.equals("H0040000")) {
								styleName = cutLayerName + "+_TEXT";
								isTextStyle = true;
							}
						}
					}
				}

				if (layerType.equals("LWPOLYLINE") || layerType.equals("POLYLINE") || layerType.equals("LINE")) {
					styleName = cutLayerName.toUpperCase() + "_LWPOLYLINE";
				}
				if (layerType.equals("MULTILINESTRING")) {
					styleName = cutLayerName.toUpperCase() + "_LINESTRING";
				}
				if (layerType.equals("MULTIPOLYGON")) {
					styleName = cutLayerName.toUpperCase() + "_POLYGON";
				}
				if (layerType.equals("MULTIPOINT")) {
					styleName = cutLayerName.toUpperCase() + "_POINT";
				}

				boolean styleFlag = dtReader.existsStyle(styleName);
				if (styleFlag) {
					layerEncoder.setDefaultStyle(styleName);
				} else {
					layerEncoder.setDefaultStyle("defaultStyle");
				}

				flag = dtPublisher.publishDBLayer(workspace, dsName, fte, layerEncoder);

				if (flag == true) {
					RESTLayer layer = dtReader.getLayer(workspace, layerFullName);
					RESTFeatureType featureType = dtReader.getFeatureType(layer);

					double minx = featureType.getNativeBoundingBox().getMinX();
					double miny = featureType.getNativeBoundingBox().getMinY();
					double maxx = featureType.getNativeBoundingBox().getMaxX();
					double maxy = featureType.getNativeBoundingBox().getMaxY();

					if (minx != 0 && minx != -1 && miny != 0 && miny != -1 && maxx != 0 && maxx != -1 && maxy != 0
							&& maxy != -1) {
						Coordinate[] coords = new Coordinate[] { new Coordinate(minx, miny), new Coordinate(maxx, miny),
								new Coordinate(maxx, maxy), new Coordinate(minx, maxy), new Coordinate(minx, miny) };

						LinearRing ring = geometryFactory.createLinearRing(coords);
						LinearRing holes[] = null; // use LinearRing[] to
													// represent
													// holes
						Polygon polygon = geometryFactory.createPolygon(ring, holes);
						Geometry geometry = polygon;
						result.addGeoCollection(geometry);
					}
					result.addLayerName(workspace + ":" + layerFullName);
				} else if (flag == false) {
					result.addFailCount();

					/*
					 * for (String sucLayerName : successLayerList) {
					 * dtPublisher.removeLayer(workspace, sucLayerName); }
					 * dtPublisher.removeLayer(workspace, layerName);
					 * layerInfo.setServerPublishFlag(flag); return layerInfo;
					 */
				}

			}
		}
		;

		List<Future<Result>> futures = new ArrayList<Future<Result>>();

		for (int i = 0; i < layerNameList.size(); i++) {
			Runnable task = new Task(result, layerNameList.get(i));
			Future<Result> future = executorService.submit(task, result);

			futures.add(future);
		}

		for (Future<Result> future : futures) {
			try {
				result = future.get();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		executorService.shutdown();

		if (result.failCount > 0) {
			for (String sucLayerName : result.successLayerList) {
				dtPublisher.removeLayer(workspace, sucLayerName);
			}
			layerInfo.setServerPublishFlag(false);
		} else {
			int layerSize = result.successLayerList.size();
			if (layerSize != 0) {
				GSLayerGroupEncoder group = new GSLayerGroupEncoder();
				for (int i = 0; i < result.successLayerList.size(); i++) {
					String layer = (String) result.successLayerList.get(i);
					group.addLayer(layer);
				}
				Geometry geometry = null;
				if (layerSize == 1) {
					geometry = geometryFactory.buildGeometry(result.geometryCollection);
				} else {
					GeometryCollection collection = (GeometryCollection) geometryFactory
							.buildGeometry(result.geometryCollection);
					geometry = collection.union();
				}
				Coordinate[] coordinateArray = geometry.getEnvelope().getCoordinates();
				Coordinate minCoordinate = new Coordinate();
				Coordinate maxCoordinate = new Coordinate();

				minCoordinate = coordinateArray[0];
				maxCoordinate = coordinateArray[2];

				double minx = minCoordinate.x;
				double miny = minCoordinate.y;
				double maxx = maxCoordinate.x;
				double maxy = maxCoordinate.y;

				group.setBounds(originSrc, minx, maxx, miny, maxy);

				dtPublisher.createLayerGroup(workspace, "gro_" + fileType + "_" + fileName, group);
			}
			layerInfo.setServerPublishFlag(true);
		}
		System.out.println("그룹레이어 발행");
		return layerInfo;

		/*
		 * class GeoCollectionResult{ Collection<Geometry> geometryCollection =
		 * new ArrayList<Geometry>(); synchronized void add(Geometry geometry) {
		 * geometryCollection.add(geometry); } }
		 */
		/*
		 * for (int i = 0; i < layerNameList.size(); i++) {
		 * 
		 * GSFeatureTypeEncoder fte = new GSFeatureTypeEncoder(); GSLayerEncoder
		 * layerEncoder = new GSLayerEncoder(); String layerName =
		 * layerNameList.get(i);
		 * 
		 * String upperLayerName = layerName.toUpperCase();
		 * 
		 * int dash = layerName.indexOf("_"); String cutLayerName =
		 * layerName.substring(0, dash); String layerType =
		 * layerName.substring(dash + 1); String layerFullName = "geo_" +
		 * fileType + "_" + fileName + "_" + layerName;
		 * 
		 * fte.setProjectionPolicy(ProjectionPolicy.REPROJECT_TO_DECLARED);
		 * fte.setTitle(layerFullName); // 제목 fte.setName(layerFullName); // 이름
		 * fte.setSRS(originSrc); // 좌표 fte.setNativeCRS(originSrc);
		 * fte.setNativeName(layerFullName); // nativeName //
		 * fte.setLatLonBoundingBox(minx, miny, maxx, maxy, originSrc);
		 * 
		 * // 성능향상 fte.addMetadata("cacheAgeMax", "604800");
		 * fte.addMetadata("cachingEnabled", ("true"));
		 * 
		 * // Style 적용 String styleName = upperLayerName;
		 * 
		 * if (layerType.equals("TEXT")) { List<String> smallTextList =
		 * sldType.getSmallTextList(); List<String> mediumTextList =
		 * sldType.getMediumTextList(); List<String> largeTextList =
		 * sldType.getLargeTextList(); List<String> exceptTextList =
		 * sldType.getExceptTextList();
		 * 
		 * boolean isTextStyle = false;
		 * 
		 * for (String stext : smallTextList) { if (cutLayerName.equals(stext))
		 * { styleName = "SMALL_TEXT"; isTextStyle = true; } }
		 * 
		 * if (!isTextStyle) { for (String mtext : mediumTextList) { if
		 * (cutLayerName.equals(mtext)) { styleName = "MEDIUM_TEXT"; isTextStyle
		 * = true; break; } } if (!isTextStyle) { for (String ltext :
		 * largeTextList) { if (cutLayerName.equals(ltext)) { styleName =
		 * "LARGE_TEXT"; isTextStyle = true; } } } if (!isTextStyle) { if
		 * (cutLayerName.toUpperCase().equals("H0059153")) { if
		 * (fileType.equals("dxf")) { styleName = "DXF_" + cutLayerName +
		 * "+_TEXT"; isTextStyle = true; } else if (fileType.equals("ngi")) {
		 * styleName = "NGI_" + cutLayerName + "+_TEXT"; isTextStyle = true; } }
		 * else if (cutLayerName.equals("H0040000")) { styleName = cutLayerName
		 * + "+_TEXT"; isTextStyle = true; } } } }
		 * 
		 * if (layerType.equals("LWPOLYLINE") || layerType.equals("POLYLINE") ||
		 * layerType.equals("LINE")) { styleName = cutLayerName.toUpperCase() +
		 * "_LWPOLYLINE"; } if (layerType.equals("MULTILINESTRING")) { styleName
		 * = cutLayerName.toUpperCase() + "_LINESTRING"; } if
		 * (layerType.equals("MULTIPOLYGON")) { styleName =
		 * cutLayerName.toUpperCase() + "_POLYGON"; } if
		 * (layerType.equals("MULTIPOINT")) { styleName =
		 * cutLayerName.toUpperCase() + "_POINT"; }
		 * 
		 * boolean styleFlag = dtReader.existsStyle(styleName); if (styleFlag) {
		 * layerEncoder.setDefaultStyle(styleName); } else {
		 * layerEncoder.setDefaultStyle("defaultStyle"); }
		 * 
		 * flag = dtPublisher.publishDBLayer(workspace, dsName, fte, layerEncoder);
		 * 
		 * if (flag == true) { RESTLayer layer =
		 * dtReader.getLayer(userVO.getId(), layerFullName); RESTFeatureType
		 * featureType = dtReader.getFeatureType(layer);
		 * 
		 * double minx = featureType.getNativeBoundingBox().getMinX(); double
		 * miny = featureType.getNativeBoundingBox().getMinY(); double maxx =
		 * featureType.getNativeBoundingBox().getMaxX(); double maxy =
		 * featureType.getNativeBoundingBox().getMaxY();
		 * 
		 * if (minx != 0 && minx != -1 && miny != 0 && miny != -1 && maxx != 0
		 * && maxx != -1 && maxy != 0 && maxy != -1) { Coordinate[] coords = new
		 * Coordinate[] { new Coordinate(minx, miny), new Coordinate(maxx,
		 * miny), new Coordinate(maxx, maxy), new Coordinate(minx, maxy), new
		 * Coordinate(minx, miny) };
		 * 
		 * LinearRing ring = geometryFactory.createLinearRing(coords);
		 * LinearRing holes[] = null; // use LinearRing[] to represent // holes
		 * Polygon polygon = geometryFactory.createPolygon(ring, holes);
		 * Geometry geometry = polygon; geometryCollection.add(geometry); } }
		 * else if (flag == false) { for (String sucLayerName :
		 * successLayerList) { dtPublisher.removeLayer(workspace, sucLayerName); }
		 * dtPublisher.removeLayer(workspace, layerName);
		 * layerInfo.setServerPublishFlag(flag); return layerInfo; }
		 * successLayerList.add(userVO.getId() + ":" + layerFullName); }
		 * 
		 * if (layerNameList.size() != 0) { GeometryCollection collection =
		 * (GeometryCollection)
		 * geometryFactory.buildGeometry(geometryCollection); Geometry geometry
		 * = collection.union(); GSLayerGroupEncoder group = new
		 * GSLayerGroupEncoder(); for (int i = 0; i < successLayerList.size();
		 * i++) { String layer = (String) successLayerList.get(i);
		 * group.addLayer(layer); }
		 * 
		 * Coordinate[] coordinateArray =
		 * geometry.getEnvelope().getCoordinates(); Coordinate minCoordinate =
		 * new Coordinate(); Coordinate maxCoordinate = new Coordinate();
		 * 
		 * minCoordinate = coordinateArray[0]; maxCoordinate =
		 * coordinateArray[2];
		 * 
		 * double minx = minCoordinate.x; double miny = minCoordinate.y; double
		 * maxx = maxCoordinate.x; double maxy = maxCoordinate.y;
		 * 
		 * group.setBounds(originSrc, minx, maxx, miny, maxy);
		 * 
		 * dtPublisher.createLayerGroup(workspace, "gro_" + fileType + "_" +
		 * fileName, group); } layerInfo.setServerPublishFlag(flag);
		 * 
		 * return layerInfo;
		 */
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
				jsonArray = new DTGeoserverTreeFactoryImpl().createDTGeoserverTree(dtGeoserverMList,parent,serverName,enType);
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
	 * @since 2018. 7. 5.
	 * @author SG.Lee
	 * @param workspace
	 * @param layerNameList
	 * @return
	 * @see com.gitrnd.qaproducer.geoserver.service.GeoserverService#removeDTGeoserverLayers(java.lang.String, java.util.List)
	 */
	@Override
	public boolean removeDTGeoserverLayers(DTGeoserverManager dtGeoManager, String workspace, List<String> layerNameList) {
		if(dtGeoManager!=null){
			dtPublisher = dtGeoManager.getPublisher();
		}else{
			throw new IllegalArgumentException("Geoserver 정보 없음");
		}
		return dtPublisher.removeLayers(workspace, layerNameList);
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
