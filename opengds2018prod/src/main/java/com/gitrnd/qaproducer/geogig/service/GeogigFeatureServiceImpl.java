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
import com.gitrnd.gdsbuilder.geogig.command.repository.LogRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.feature.FeatureBlame;
import com.gitrnd.gdsbuilder.geogig.command.repository.feature.FeatureDiff;
import com.gitrnd.gdsbuilder.geogig.command.repository.feature.RevertFeature;
import com.gitrnd.gdsbuilder.geogig.command.transaction.BeginTransaction;
import com.gitrnd.gdsbuilder.geogig.command.transaction.EndTransaction;
import com.gitrnd.gdsbuilder.geogig.type.GeogigBlame;
import com.gitrnd.gdsbuilder.geogig.type.GeogigDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigDiff.Diff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureRevert;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureSimpleLog;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureSimpleLog.SimpleCommit;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog.Commit;
import com.gitrnd.gdsbuilder.geogig.type.GeogigTransaction;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.qaproducer.common.security.LoginUser;

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
	public GeogigFeatureSimpleLog featureLog(DTGeoserverManager geoserverManager, String repoName, String path,
			Long limit, String until, String head) throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		LogRepository logRepos = new LogRepository();
		GeogigFeatureSimpleLog simpleLog = new GeogigFeatureSimpleLog();
		try {
			List<SimpleCommit> simpleCommits = new ArrayList<>();
			List<Commit> commits = new ArrayList<>();
			String limitStr = String.valueOf(limit + 1);
			GeogigRepositoryLog geogigLog = logRepos.executeCommand(url, user, pw, repoName, path, limitStr, null);
			simpleLog.setSuccess(geogigLog.getSuccess());
			commits.addAll(geogigLog.getCommits());
			for (int i = 0; i < commits.size() - 1; i++) {
				Commit newCommit = commits.get(i); // current
				SimpleCommit simpleCommit = new SimpleCommit();
				simpleCommit.setcIdx(i); // idx
				String commitId = newCommit.getCommitId(); // commit id
				simpleCommit.setCommitId(commitId);
				simpleCommit.setAuthorName(newCommit.getAuthor().getName()); // author
				simpleCommit.setMessage(newCommit.getMessage()); // message
				Timestamp timestamp = new Timestamp(Long.parseLong(newCommit.getAuthor().getTimestamp())); // time stamp
				Date date = new Date(timestamp.getTime());
				DateFormat dateformat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
				String dateStr = dateformat.format(date);
				simpleCommit.setDate(dateStr);

				Commit oldCommit = commits.get(i + 1); // parent
				String oldCommitId = oldCommit.getCommitId();

				DiffRepository diffRepos = new DiffRepository();
				GeogigDiff geogigdiff = diffRepos.executeCommand(url, user, pw, repoName, oldCommitId, commitId, path,
						null);
				List<Diff> diffs = geogigdiff.getDiffs();
				if (diffs != null) {
					String changeType = diffs.get(0).getChangeType();
					simpleCommit.setChangeType(changeType);
				}
				simpleCommits.add(simpleCommit);
			}
			simpleLog.setSimpleCommits(simpleCommits);
		} catch (GeogigCommandException e) {
			GeogigRepositoryLog geogigLog = null;
			if (e.isXml()) {
				JAXBContext jaxbContext = JAXBContext.newInstance(GeogigRepositoryLog.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				geogigLog = (GeogigRepositoryLog) unmarshaller.unmarshal(new StringReader(e.getMessage()));
				simpleLog.setSuccess(geogigLog.getSuccess());
				simpleLog.setError(geogigLog.getError());
			} else {
				simpleLog.setError(e.getMessage());
				simpleLog.setSuccess("false");
			}
		}

		return simpleLog;
	}

	@Override
	public GeogigFeatureRevert featureRevert(DTGeoserverManager geoserverManager, String repoName, String path,
			String oldCommitId, String newCommitId, String commitMessage, String mergeMessage, LoginUser loginUser)
			throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		String authorName = loginUser.getUsername();
		String authorEmail = loginUser.getEmail();

		RevertFeature revertFeature = new RevertFeature();
		GeogigFeatureRevert geogigFeatureRevert = null;
		try {
			BeginTransaction beginTransaction = new BeginTransaction();
			GeogigTransaction transaction = beginTransaction.executeCommand(url, user, pw, repoName);
			String transactionId = transaction.getTransaction().getId();
			geogigFeatureRevert = revertFeature.executeCommand(url, user, pw, repoName, transactionId, oldCommitId,
					newCommitId, path, commitMessage, mergeMessage, authorName, authorEmail);
			if (geogigFeatureRevert.getMerge().getConflicts() != null) {
				geogigFeatureRevert.setTransactionId(transactionId);
			} else {
				EndTransaction endTransaction = new EndTransaction();
				endTransaction.executeCommand(url, user, pw, repoName, transactionId);
			}
		} catch (GeogigCommandException e) {
			JAXBContext jaxbContext = JAXBContext.newInstance(GeogigFeatureRevert.class);
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
			geogigFeatureRevert = (GeogigFeatureRevert) unmarshaller.unmarshal(new StringReader(e.getMessage()));
		}
		return geogigFeatureRevert;
	}

}