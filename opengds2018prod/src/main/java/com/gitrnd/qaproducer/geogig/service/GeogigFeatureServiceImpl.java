package com.gitrnd.qaproducer.geogig.service;

import java.io.StringReader;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigCommandException;
import com.gitrnd.gdsbuilder.geogig.command.repository.DiffRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.FeatureBlame;
import com.gitrnd.gdsbuilder.geogig.command.repository.FeatureDiff;
import com.gitrnd.gdsbuilder.geogig.command.repository.LogRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigBlame;
import com.gitrnd.gdsbuilder.geogig.type.GeogigDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigDiff.Diff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog.Commit;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositorySimpleLog;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositorySimpleLog.SimpleCommit;
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
			List<Commit> commits = geogigLog.getCommits();
			List<SimpleCommit> simpleCommits = new ArrayList<>();

			String tmpCommitId = "";
			for (int i = 0; i < commits.size(); i++) {
				Commit commit = commits.get(i);
				SimpleCommit simpleCommit = new SimpleCommit();

				simpleCommit.setcIdx(i); // idx

				String commitId = commit.getCommitId(); // commit id
				simpleCommit.setCommitId(commitId);

				simpleCommit.setAuthorName(commit.getAuthor().getName()); // author

				Timestamp timestamp = new Timestamp(Long.parseLong(commit.getAuthor().getTimestamp())); // time stamp
				Date date = new Date(timestamp.getTime());
				DateFormat dateformat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
				String dateStr = dateformat.format(date);
				simpleCommit.setDate(dateStr);
				if (i == 0) { // change type
					simpleCommit.setChangeType("ADDED");
				} else {
					DiffRepository diffRepos = new DiffRepository();
					GeogigDiff geogigdiff = diffRepos.executeCommand(url, user, pw, repoName, tmpCommitId, commitId,
							path, null);
					List<Diff> diffs = geogigdiff.getDiffs();
					String changeType = diffs.get(0).getChangeType();
					simpleCommit.setChangeType(changeType);
				}
				simpleCommits.add(simpleCommit);
				tmpCommitId = commitId;
			}
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