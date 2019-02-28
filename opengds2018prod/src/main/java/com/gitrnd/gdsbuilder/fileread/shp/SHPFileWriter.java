package com.gitrnd.gdsbuilder.fileread.shp;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Collections;
import java.util.Map;

import org.geotools.data.DefaultTransaction;
import org.geotools.data.Transaction;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.shapefile.ShapefileDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.data.simple.SimpleFeatureStore;
import org.geotools.feature.SchemaException;
import org.geotools.referencing.CRS;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.referencing.FactoryException;
import org.opengis.referencing.NoSuchAuthorityCodeException;

public class SHPFileWriter {

	public static void writeSHP(String epsg, SimpleFeatureCollection simpleFeatureCollection, String filePath)
			throws IOException, SchemaException, NoSuchAuthorityCodeException, FactoryException {

		ShapefileDataStoreFactory factory = new ShapefileDataStoreFactory();
		File file = new File(filePath);
		Map map = Collections.singletonMap("url", file.toURI().toURL());
		ShapefileDataStore myData = (ShapefileDataStore) factory.createNewDataStore(map);
		myData.setCharset(Charset.forName("EUC-KR"));
		SimpleFeatureType featureType = simpleFeatureCollection.getSchema();
		myData.createSchema(featureType);
		Transaction transaction = new DefaultTransaction("create");
		String typeName = myData.getTypeNames()[0];
		myData.forceSchemaCRS(CRS.decode(epsg));

		SimpleFeatureSource featureSource = myData.getFeatureSource(typeName);

		if (featureSource instanceof SimpleFeatureStore) {
			SimpleFeatureStore featureStore = (SimpleFeatureStore) featureSource;
			featureStore.setTransaction(transaction);
			try {
				featureStore.addFeatures(simpleFeatureCollection);
				transaction.commit();
			} catch (Exception e) {
				e.printStackTrace();
				transaction.rollback();
			} finally {
				transaction.close();
			}
		}
	}
}
