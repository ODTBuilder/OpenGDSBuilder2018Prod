package com.gitrnd.gdsbuilder.geogig.type;

import java.util.List;

import com.gitrnd.gdsbuilder.geogig.type.GeogigCat.Attribute;

public class GeogigFeatureAttribute {

	private String success;

	private String error;

	private String layerName;

	private String featureId;

	private List<Attribute> attributes;

	public String getSuccess() {
		return success;
	}

	public void setSuccess(String success) {
		this.success = success;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getLayerName() {
		return layerName;
	}

	public void setLayerName(String layerName) {
		this.layerName = layerName;
	}

	public String getFeatureId() {
		return featureId;
	}

	public void setFeatureId(String featureId) {
		this.featureId = featureId;
	}

	public List<Attribute> getAttributes() {
		return attributes;
	}

	public void setAttributes(List<Attribute> attributes) {
		this.attributes = attributes;
	}

}