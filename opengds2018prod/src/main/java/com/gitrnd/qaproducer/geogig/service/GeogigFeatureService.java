package com.gitrnd.qaproducer.geogig.service;

import javax.xml.bind.JAXBException;

import com.gitrnd.gdsbuilder.geogig.type.GeogigBlame;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureRevert;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositorySimpleLog;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.qaproducer.common.security.LoginUser;

public interface GeogigFeatureService {

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param path
	 * @param oldIndex
	 * @param newIndex
	 * @return
	 * @throws JAXBException
	 */
	GeogigFeatureDiff featureDiff(DTGeoserverManager geoserverManager, String repoName, String path, int oldIndex,
			int newIndex) throws JAXBException;

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param path
	 * @param branch
	 * @return
	 * @throws JAXBException
	 */
	GeogigBlame featureBlame(DTGeoserverManager geoserverManager, String repoName, String path, String branch)
			throws JAXBException;

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param path
	 * @return
	 */
	GeogigRepositorySimpleLog featureSimpleLog(DTGeoserverManager geoserverManager, String repoName, String path)
			throws JAXBException;

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param path
	 * @param oldCommitId
	 * @param newCommitId
	 * @param commitMessage
	 * @param mergeMessage
	 * @param loginUser
	 * @return
	 * @throws JAXBException
	 */
	GeogigFeatureRevert featureRevert(DTGeoserverManager geoserverManager, String repoName, String path,
			String oldCommitId, String newCommitId, String commitMessage, String mergeMessage, LoginUser loginUser)
			throws JAXBException;

}
