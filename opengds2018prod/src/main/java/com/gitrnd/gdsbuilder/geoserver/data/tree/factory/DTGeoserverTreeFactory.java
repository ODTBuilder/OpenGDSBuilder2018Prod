package com.gitrnd.gdsbuilder.geoserver.data.tree.factory;

import com.gitrnd.gdsbuilder.geoserver.DTGeoserverReader;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
import com.gitrnd.gdsbuilder.geoserver.data.tree.DTGeoserverTrees;

public interface DTGeoserverTreeFactory {
	
	
	DTGeoserverTrees createDTGeoserverTrees(DTGeoserverManagerList dtGeoserverList);
}
