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

/*
 *  GeoServer-Manager - Simple Manager Library for GeoServer
 *  
 *  Copyright (C) 2007,2011 GeoSolutions S.A.S.
 *  http://www.geo-solutions.it
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

package com.gitrnd.gdsbuilder.geoserver.data.tree;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gitrnd.gdsbuilder.geolayer.data.DTGeoLayer;
import com.gitrnd.gdsbuilder.geolayer.data.DTGeoLayerList;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverReader;

import it.geosolutions.geoserver.rest.decoder.RESTDataStore;
import it.geosolutions.geoserver.rest.decoder.RESTDataStoreList;
import it.geosolutions.geoserver.rest.decoder.RESTFeatureTypeList;
import it.geosolutions.geoserver.rest.decoder.RESTWorkspaceList;

/**
 * @Description GeoserverLayer Tree 관련 클래스
 * @author SG.Lee
 * @Date 2018. 7. 12. 오후 6:56:21
 * */
@SuppressWarnings("serial")
public class DTGeoserverTree extends JSONArray {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/**
	 * 생성자 생성
	 * 
	 * @param reader
	 *            - Geosolution Format
	 */
	public DTGeoserverTree(DTGeoserverReader dtGeoserverReader) {
			build(dtGeoserverReader);
	}

	
	@SuppressWarnings("unchecked")
	private DTGeoserverTree build(DTGeoserverReader dtGeoserverReader){
		
		if(dtGeoserverReader!=null){
			RESTWorkspaceList restWorkspaceList = dtGeoserverReader.getWorkspaces();
			
			if(restWorkspaceList!=null){
				for (RESTWorkspaceList.RESTShortWorkspace item : restWorkspaceList) {
		            String wsName = item.getName();
		            JSONObject wsTree = new JSONObject();
		            wsTree.put("id", wsName);
		            wsTree.put("parent", "#");
		            wsTree.put("text", wsName);
		            wsTree.put("type", "workspace");
		            super.add(wsTree);
		            wsTree.clear();
		            
		            RESTDataStoreList dataStoreList = dtGeoserverReader.getDatastores(wsName);
		            
		            List<String> dsNames = dataStoreList.getNames();
		            
		            for(String dsName : dsNames){
		            	RESTDataStore dStore = dtGeoserverReader.getDatastore(wsName, dsName);
		            	if(dStore!=null){
		            		String dsType = dStore.getStoreType();
		            		JSONObject dsTree = new JSONObject();
							dsTree.put("id", wsName+"_"+dsName);
							dsTree.put("parent", wsName);
							dsTree.put("text", dsName);
							dsTree.put("type", "datastore");
							super.add(dsTree);
			            	dsTree.clear();
			            	
			            	RESTFeatureTypeList ftList = dtGeoserverReader.getFeatureTypes(wsName, dsName);
			            	ArrayList<String> layerNames = new ArrayList<String>(ftList.getNames());
			            	
			            	DTGeoLayerList dtGLayerList = dtGeoserverReader.getDTGeoLayerList(wsName, layerNames);
			            	
			            	for(DTGeoLayer dtGLayer : dtGLayerList){
			            		if(dtGLayer!=null){
			            			JSONObject layerTree = new JSONObject();
									layerTree.put("id", wsName+"_"+dsName+"_"+dtGLayer.getlName());
									layerTree.put("parent", wsName+"_"+dsName);
									layerTree.put("text", dtGLayer.getlName());
									layerTree.put("type", dtGLayer.getGeomType().toLowerCase());
									super.add(layerTree);
			            		}
			            	}
		            	}
		            }
		        }
			}else{
				JSONObject errorJSON = new JSONObject();
				errorJSON.put("id", 500);
				errorJSON.put("parent", "#");
				errorJSON.put("text", "Geoserver에 Workspace가 존재하지 않습니다");
				errorJSON.put("type", "error");
				
				super.add(errorJSON);
				logger.warn("Geoserver에 Workspace가 존재하지 않습니다");
			}
		}else{
			JSONObject errorJSON = new JSONObject();
			errorJSON.put("id", 500);
			errorJSON.put("parent", "#");
			errorJSON.put("text", "Geoserver를 다시 추가해주세요");
			errorJSON.put("type", "error");
			
			super.add(errorJSON);
			logger.warn("Geoserver를 다시 추가해주세요");
		}
		return this;
	}
}
