package com.gitrnd.gdsbuilder.geoserver.data.tree.factory.impl;

import com.gitrnd.gdsbuilder.geoserver.DTGeoserverReader;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
import com.gitrnd.gdsbuilder.geoserver.data.tree.DTGeoserverTrees;
import com.gitrnd.gdsbuilder.geoserver.data.tree.factory.DTGeoserverTreeFactory;

public class DTGeoserverTreeFactoryImpl implements DTGeoserverTreeFactory {

	public DTGeoserverTrees createDTGeoserverTrees(DTGeoserverManagerList dtGeoserverList){
		return new DTGeoserverTrees(dtGeoserverList);
	}
}
