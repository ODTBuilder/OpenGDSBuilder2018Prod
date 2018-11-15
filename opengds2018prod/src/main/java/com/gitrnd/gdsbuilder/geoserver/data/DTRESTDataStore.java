package com.gitrnd.gdsbuilder.geoserver.data;

import org.jdom.Element;

import it.geosolutions.geoserver.rest.decoder.RESTDataStore;

public class DTRESTDataStore extends RESTDataStore {

	public enum DBType {

		POSTGIS("postgis"), ORACLE("oracle"), SHP("shp"), GEOGIG("geogig"), UNKNOWN(null);
		private final String restName;

		private DBType(String restName) {
			this.restName = restName;
		}

		public static DBType get(String restName) {
			for (DBType type : values()) {
				if (type == UNKNOWN) {
					continue;
				}
				if (type.restName.equals(restName)) {
					return type;
				}
			}
			return UNKNOWN;
		}
	};

	public DTRESTDataStore(Element dsElem) {
		super(dsElem);
		// TODO Auto-generated constructor stub
	}

	protected String setConnectionParameter(String paramName) {

		return null;
	}
}
