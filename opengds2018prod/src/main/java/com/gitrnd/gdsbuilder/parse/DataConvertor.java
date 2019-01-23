package com.gitrnd.gdsbuilder.parse;

import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.feature.SchemaException;
import org.json.simple.JSONObject;

/**
 * 데이터 변환을 지원하는 클래스
 * @author SG.Lee
 * @Date 2017. 5. 11. 오전 12:06:59
 * */
public interface DataConvertor {

	/**
	 * SimpleFeatureCollection클래스를 JSONObject클래스로 변환
	 * @author SG.Lee
	 * @Date 2017. 2
	 * @param collection
	 * @return JSONObject
	 * @throws
	 * */
	public JSONObject simpleToGeojson(SimpleFeatureCollection collection);
	
	/**
	 * 속성을 가진 JSONObject를 SimpleFeatureCollection으로 변환하여 반환한다.
	 * @author SG.Lee
	 * @Date 2017. 2
	 * @param geojson
	 * @param attribute
	 * @return SimpleFeatureCollection
	 * @throws
	 * */
	public SimpleFeatureCollection geoJsonToSimpleFeatureCollecion(JSONObject geojson, JSONObject attribute) throws SchemaException;
	
	/**
	 * 속성이 없는 JSONObject를 SimpleFeatureCollection으로 변환하여 반환한다.
	 * @author SG.Lee
	 * @Date 2017. 2
	 * @param geojson
	 * @return SimpleFeatureCollection
	 * @throws
	 * */
	public SimpleFeatureCollection geoJsonToSimpleFeatureCollecion(JSONObject geojson) throws SchemaException;
}
