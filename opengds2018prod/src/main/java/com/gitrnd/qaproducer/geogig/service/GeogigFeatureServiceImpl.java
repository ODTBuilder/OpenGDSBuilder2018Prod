package com.gitrnd.qaproducer.geogig.service;

import java.io.StringReader;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigCommandException;
import com.gitrnd.gdsbuilder.geogig.command.repository.FeatureBlame;
import com.gitrnd.gdsbuilder.geogig.command.repository.FeatureDiff;
import com.gitrnd.gdsbuilder.geogig.command.repository.LogRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigBlame;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositorySimpleLog;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

@Service("featureService")
public class GeogigFeatureServiceImpl implements GeogigFeatureService {

	@Override
	public GeogigFeatureDiff featureDiff(DTGeoserverManager geoserverManager, String repoName, String path,
			int oldIndex, int newIndex) throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		String oldTreeish = "HEAD";
		String newTreeish = "HEAD";

		if (newIndex > 0) {
			newTreeish += "~" + newIndex;
		}
		oldTreeish += "~" + oldIndex;

		FeatureDiff featureDiff = new FeatureDiff();
		GeogigFeatureDiff geogigFeatureDiff = null;
		try {
			geogigFeatureDiff = featureDiff.executeCommand(url, user, pw, repoName, path, oldTreeish, newTreeish);
		} catch (GeogigCommandException e) {
			JAXBContext jaxbContext = JAXBContext.newInstance(GeogigFeatureDiff.class);
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
			geogigFeatureDiff = (GeogigFeatureDiff) unmarshaller.unmarshal(new StringReader(e.getMessage()));
		}
		return geogigFeatureDiff;
	}

	@Override
	public GeogigBlame featureBlame(DTGeoserverManager geoserverManager, String repoName, String path, String branch)
			throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		FeatureBlame featureBlame = new FeatureBlame();
		GeogigBlame geogigBlame = null;
		try {
			geogigBlame = featureBlame.executeCommand(url, user, pw, repoName, path, branch);
		} catch (Exception e) {
			JAXBContext jaxbContext = JAXBContext.newInstance(GeogigBlame.class);
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
			geogigBlame = (GeogigBlame) unmarshaller.unmarshal(new StringReader(e.getMessage()));
		}
		return geogigBlame;
	}

	@Override
	public GeogigRepositorySimpleLog featureSimpleLog(DTGeoserverManager geoserverManager, String repoName, String path)
			throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		LogRepository logRepos = new LogRepository();
		GeogigRepositorySimpleLog simpleLog = new GeogigRepositorySimpleLog();
		try {
			GeogigRepositoryLog geogigLog = logRepos.executeCommand(url, user, pw, repoName, path);
			simpleLog.setSuccess(geogigLog.getSuccess());
			geogigLog.getCommits();
		} catch (Exception e) {
			JAXBContext jaxbContext = JAXBContext.newInstance(GeogigBlame.class);
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
			GeogigRepositoryLog geogigLog = (GeogigRepositoryLog) unmarshaller
					.unmarshal(new StringReader(e.getMessage()));
			simpleLog.setSuccess(geogigLog.getSuccess());
			simpleLog.setError(geogigLog.getError());
		}
		return simpleLog;
	}

}