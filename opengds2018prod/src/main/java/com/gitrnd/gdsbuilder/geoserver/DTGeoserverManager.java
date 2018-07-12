package com.gitrnd.gdsbuilder.geoserver;

import java.net.MalformedURLException;
import java.net.URL;

import it.geosolutions.geoserver.rest.GeoServerRESTManager;
import it.geosolutions.geoserver.rest.manager.GeoServerRESTStoreManager;
import it.geosolutions.geoserver.rest.manager.GeoServerRESTStructuredGridCoverageReaderManager;
import it.geosolutions.geoserver.rest.manager.GeoServerRESTStyleManager;

public class DTGeoserverManager extends GeoServerRESTManager
{
    private final DTGeoserverPublisher publisher;
    private final DTGeoserverReader reader;

    private final GeoServerRESTStoreManager storeManager;
    private final GeoServerRESTStyleManager styleManager;
    
    private final GeoServerRESTStructuredGridCoverageReaderManager structuredGridCoverageReader;

  public DTGeoserverManager(String restURL, String username, String password) throws MalformedURLException
  {
	  super(new URL(restURL), username, password);

      // Internal publisher and reader, provide simple access methods.
      publisher = new DTGeoserverPublisher(restURL.toString(), username, password);
      reader = new DTGeoserverReader(restURL, username, password);
      structuredGridCoverageReader = new GeoServerRESTStructuredGridCoverageReaderManager(new URL(restURL), username, password);
      storeManager = new GeoServerRESTStoreManager(new URL(restURL), username, password);
      styleManager = new GeoServerRESTStyleManager(new URL(restURL), username, password);
      
      
  }
  
  public DTGeoserverPublisher getPublisher() {
      return publisher;
  }

  public DTGeoserverReader getReader() {
      return reader;
  }

  public GeoServerRESTStoreManager getStoreManager() {
      return storeManager;
  }

  public GeoServerRESTStyleManager getStyleManager() {
      return styleManager;
  }

  public GeoServerRESTStructuredGridCoverageReaderManager getStructuredGridCoverageReader() {
      return structuredGridCoverageReader;
  }
}