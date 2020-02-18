/**
 * 
 */
package com.gitrnd.qaproducer.generalization.service;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gitrnd.qaproducer.common.worker.GeneralizationProducer;
import com.gitrnd.qaproducer.filestatus.domain.FileStatus;
import com.gitrnd.qaproducer.filestatus.service.FileStatusService;
import com.gitrnd.qaproducer.qa.domain.QACategory;
import com.gitrnd.qaproducer.qa.domain.QAProgress;
import com.gitrnd.qaproducer.qa.service.QACategoryService;
import com.gitrnd.qaproducer.qa.service.QAProgressService;

@Service("generalizationService")
public class GeneralizationService {

	// qa progress
	protected static int FILEUPLOAD = 1;
	protected static String TYPE = "GEOSERVER";

	@Autowired
	private GeneralizationProducer producer;

	@Autowired
	private FileStatusService fileStatusService;

	@Autowired
	private QAProgressService qapgService;

	@Autowired
	private QACategoryService qaCatService;

	public void excute(String serverURL, JSONObject layers, int cid, String crs, JSONObject preset, int uid) {

		FileStatus fileStatus = new FileStatus();
		fileStatus.setStatus(1);
		fileStatus.setUidx(uid);
		fileStatusService.createFileStatus(fileStatus);

		QACategory qaCat = qaCatService.retrieveQACategoryByIdx(cid);
		String qaTitle = qaCat.getTitle();

		QAProgress progress = new QAProgress();
		progress.setUIdx(uid);
		progress.setQaType(qaTitle);
		progress.setQaState(FILEUPLOAD);
		progress.setOriginName(fileStatus.getFname());
		progress.setFIdx(fileStatus.getFid());
		progress.setUIdx(uid);
		progress.setQaType(qaTitle);
		progress.setFileType(TYPE);
		int pid = qapgService.insertQARequest(progress);

		JSONObject json = new JSONObject();
		json.put("serverURL", serverURL);
		json.put("fid", fileStatus.getFid()); // file
		json.put("pid", pid); // progress
		json.put("crs", crs);
		json.put("layers", layers);
		json.put("preset", preset);

		producer.produceGeneralMsg(json.toString());
	}
}
