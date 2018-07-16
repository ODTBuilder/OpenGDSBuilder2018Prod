package com.gitrnd.gdsbuilder.geoserver.data.tree.factory.impl;

import com.gitrnd.gdsbuilder.geoserver.DTGeoserverReader;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
import com.gitrnd.gdsbuilder.geoserver.data.tree.DTGeoserverTree;
import com.gitrnd.gdsbuilder.geoserver.data.tree.DTGeoserverTrees;
import com.gitrnd.gdsbuilder.geoserver.data.tree.factory.DTGeoserverTreeFactory;

public class DTGeoserverTreeFactoryImpl implements DTGeoserverTreeFactory {
	public DTGeoserverTree createDTGeoserverTree(DTGeoserverReader dtGeoserverReader) {
		return new DTGeoserverTree(dtGeoserverReader);
	}

	public DTGeoserverTrees createDTGeoserverTrees(DTGeoserverManagerList dtGeoserverList){
		return new DTGeoserverTrees(dtGeoserverList);
	}
}
