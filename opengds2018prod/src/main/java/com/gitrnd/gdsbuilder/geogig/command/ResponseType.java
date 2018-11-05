package com.gitrnd.gdsbuilder.geogig.command;

public enum ResponseType {

	XML(".xml"), JSON(".json");

	String type;

	private ResponseType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}