package com.gitrnd.gdsbuilder.geoserver.converter.impl;

import java.util.List;
import java.util.Map;

import com.gitrnd.gdsbuilder.geoserver.converter.GeoserverDataConverter;
import com.gitrnd.gdsbuilder.geoserver.converter.type.DigitalMapExport;
import com.gitrnd.gdsbuilder.geoserver.converter.type.UndergroundExport;

/**
 * {
		"layers":{
			"geoserver30":{
				"admin":[
					"geo_shp_37712012_A0010000_MULTIPOLYGON",
					"geo_shp_37712012_A0020000_MULTILINESTRING",
					"geo_shp_37712012_A0070000_MULTIPOLYGON",
					"geo_shp_37712012_B0010000_MULTIPOLYGON",
					"geo_shp_37712012_B0020000_MULTILINESTRING",
					"geo_shp_37712012_F0010000_MULTILINESTRING",
					"geo_shp_37712012_H0010000_MULTILINESTRING"
				],
				"shp":[
					"a0010000",
					"a0020000",
					"a0070000",
					"b0010000",
					"b0020000",
					"f0010000",
					"h0010000"
					]
				}
			}
		"cidx" : "0"
	}
 * @Description 
 * @author SG.Lee
 * @Date 2018. 9. 28. 오후 5:25:38
 * */
public class GeoserverDataConverterImpl implements GeoserverDataConverter{
	private final String serverURL;
	private final Map<String,List<String>> layerMaps;
	private final String outputFolderPath;
	private final int categoryIdx;
	private final String srs;
	
	public GeoserverDataConverterImpl(String serverURL, Map<String,List<String>> layerMaps, int categoryIdx, String outputFolderPath, String srs){
		if(serverURL.isEmpty()||layerMaps==null||outputFolderPath.isEmpty()||srs.isEmpty()){
			throw new IllegalArgumentException("필수파라미터 입력안됨");
		}
		this.serverURL = serverURL;
		this.layerMaps = layerMaps;
		this.categoryIdx = categoryIdx;
		this.outputFolderPath = outputFolderPath;
		this.srs = srs;
	}
	
	public String getSrs() {
		return srs;
	}

	public long getCategoryIdx() {
		return categoryIdx;
	}

	public String getServerURL() {
		return serverURL;
	}

	public Map<String,List<String>> getLayerMaps() {
		return layerMaps;
	}

	public String getOutputFolderPath() {
		return outputFolderPath;
	}

	
	
	public void digitalExport() {
		new DigitalMapExport(serverURL, layerMaps, outputFolderPath, srs).export();
	}
	
	public void undergroundExport(){
		new UndergroundExport(serverURL, layerMaps, outputFolderPath, srs).export();
	}
	
	public void forestExport(){
		
	}
}
