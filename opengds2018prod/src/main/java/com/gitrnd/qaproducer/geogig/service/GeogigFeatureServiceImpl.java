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
import com.gitrnd.gdsbuilder.geogig.command.repository.feature.RevertFeature;
import com.gitrnd.gdsbuilder.geogig.command.transaction.BeginTransaction;
import com.gitrnd.gdsbuilder.geogig.command.transaction.EndTransaction;
import com.gitrnd.gdsbuilder.geogig.type.GeogigBlame;
import com.gitrnd.gdsbuilder.geogig.type.GeogigDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureRevert;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureSimpleLog;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureSimpleLog.SimpleCommit;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog.Commit;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog.Commit.ChangeType;
import com.gitrnd.gdsbuilder.geogig.type.GeogigTransaction;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.qaproducer.common.security.LoginUser;

@Service("featureService")
public class GeogigFeatureServiceImpl implements GeogigFeatureService {

	@Override
	public GeogigDiff featureDiff(DTGeoserverManager geoserverManager, String repoName, String path, String newCommitId,
			String oldCommitId) throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		DiffRepository diffRepos = new DiffRepository();
		GeogigDiff geogigDiff = null;
		try {
			geogigDiff = diffRepos.executeCommand(url, user, pw, repoName, newCommitId, oldCommitId, path, null);
		} catch (GeogigCommandException e) {
			if (e.isXml()) {
				JAXBContext jaxbContext = JAXBContext.newInstance(GeogigDiff.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				geogigDiff = (GeogigDiff) unmarshaller.unmarshal(new StringReader(e.getResponseBodyAsString()));
			} else {
				geogigDiff = new GeogigDiff();
				geogigDiff.setError(e.getMessage());
				geogigDiff.setSuccess("false");
			}
		}
		return geogigDiff;
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
		} catch (GeogigCommandException e) {
			if (e.isXml()) {
				JAXBContext jaxbContext = JAXBContext.newInstance(GeogigBlame.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				geogigBlame = (GeogigBlame) unmarshaller.unmarshal(new StringReader(e.getResponseBodyAsString()));
			} else {
				geogigBlame = new GeogigBlame();
				geogigBlame.setError(e.getMessage());
				geogigBlame.setSuccess("false");
			}
		}
		return geogigBlame;
	}

	@Override
	public GeogigFeatureSimpleLog featureLog(DTGeoserverManager geoserverManager, String repoName, String path,
			int limit, String until, String head, int index) throws JAXBException {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		LogRepository logRepos = new LogRepository();
		GeogigFeatureSimpleLog simpleLog = new GeogigFeatureSimpleLog();
		try {
			List<SimpleCommit> simpleCommits = new ArrayList<>();
			List<Commit> commits = new ArrayList<>();
			GeogigRepositoryLog geogigLog = logRepos.executeCommand(url, user, pw, repoName, path,
					String.valueOf(limit), until, true);
			simpleLog.setSuccess(geogigLog.getSuccess());
			commits.addAll(geogigLog.getCommits());

			int commitSize = commits.size();
			for (int i = 0; i < commitSize; i++) {
				Commit newCommit = commits.get(i); // current
				SimpleCommit simpleCommit = new SimpleCommit();
				simpleCommit.setcIdx(i + index); // idx
				String commitId = newCommit.getCommitId(); // commit id
				simpleCommit.setCommitId(commitId);
				simpleCommit.setAuthorName(newCommit.getAuthor().getName()); // author
				simpleCommit.setMessage(newCommit.getMessage()); // message
				Timestamp timestamp = new Timestamp(Long.parseLong(newCommit.getAuthor().getTimestamp())); // time
				Date date = new Date(timestamp.getTime());
				DateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String dateStr = dateformat.format(date);

				ChangeType changeType = ChangeType.ADDED;
				int addedCount = Integer.parseInt(newCommit.getAdds());
				if (addedCount > 0) {
					changeType = ChangeType.ADDED;
				}
				int removedCount = Integer.parseInt(newCommit.getRemoves());
				if (removedCount > 0) {
					changeType = ChangeType.REMOVED;
				}
				int modifiedCount = Integer.parseInt(newCommit.getModifies());
				if (modifiedCount > 0) {
					changeType = ChangeType.MODIFIED;
				}
				simpleCommit.setChangeType(changeType);
				simpleCommit.setDate(dateStr);
				simpleCommits.add(simpleCommit);
			}
			simpleLog.setSimpleCommits(simpleCommits);
		} catch (GeogigCommandException e) {
			GeogigRepositoryLog geogigLog = null;
			if (e.isXml()) {
				JAXBContext jaxbContext = JAXBContext.newInstance(GeogigRepositoryLog.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				geogigLog = (GeogigRepositoryLog) unmarshaller.unmarshal(new StringReader(e.getResponseBodyAsString()));
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
			if (e.isXml()) {
				JAXBContext jaxbContext = JAXBContext.newInstance(GeogigFeatureRevert.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				geogigFeatureRevert = (GeogigFeatureRevert) unmarshaller
						.unmarshal(new StringReader(e.getResponseBodyAsString()));
			} else {
				geogigFeatureRevert = new GeogigFeatureRevert();
				geogigFeatureRevert.setError(e.getMessage());
				geogigFeatureRevert.setSuccess("false");
			}
		}
		return geogigFeatureRevert;
	}

}