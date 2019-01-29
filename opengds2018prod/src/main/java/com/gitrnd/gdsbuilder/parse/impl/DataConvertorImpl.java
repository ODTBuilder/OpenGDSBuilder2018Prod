package com.gitrnd.gdsbuilder.parse.impl;

import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.feature.SchemaException;
import org.json.simple.JSONObject;

import com.gitrnd.gdsbuilder.parse.DataConvertor;

public class DataConvertorImpl implements DataConvertor {
	
	@Override
	public JSONObject simpleToGeojson(SimpleFeatureCollection collection) {
		return new SimpleToGeojsonImpl().build(collection);
	};

	@Override
	public SimpleFeatureCollection geoJsonToSimpleFeatureCollecion(JSONObject geojson, JSONObject attribute) throws SchemaException {
		return new GeoJsonToSimpleImpl().converToSimpleFeatureCollection(geojson, attribute);
	};

	@Override
	public SimpleFeatureCollection geoJsonToSimpleFeatureCollecion(JSONObject geojson) throws SchemaException {
		return new GeoJsonToSimpleImpl().converToSimpleFeatureCollection(geojson);
	};

}
