/**
 * 
 */
package com.gitrnd.qaproducer.qa.service;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gitrnd.qaproducer.common.worker.Producer;
import com.gitrnd.qaproducer.qa.domain.QACategory;
import com.gitrnd.qaproducer.qa.domain.QAProgress;

/**
 * @author GIT
 *
 */
@Service("webService")
public class QAWebService {

	@Autowired
	private Producer producer;

	@Autowired
	private QAProgressService qapgService;

	@Autowired
	private QACategoryService qaCatService;

	/**
	 * @param serverURL
	 * @param layers
	 * @param param
	 * @return
	 */
	public boolean validate(String serverURL, JSONObject layers, int cid, String crs, String qaVer, String qaType,
			int prid, int uIdx) {

		try {
			Long catetoryIdx = (long) cid;
			int cIdx = catetoryIdx.intValue();
			QACategory qaCat = qaCatService.retrieveQACategoryByIdx(cIdx);
			String qaTitle = qaCat.getTitle();

			QAProgress progress = new QAProgress();
			progress.setUIdx(uIdx);
			progress.setQaType(qaTitle);
			progress.setPrid(prid);
			qapgService.insertQARequest(progress);

			int pid = progress.getPIdx();
			JSONObject json = new JSONObject();
			json.put("serverURL", serverURL);
			json.put("layersMap", layers);
			json.put("category", cid);
			json.put("qaVer", qaVer);
			json.put("qaType", qaType);
			json.put("pid", pid);
			json.put("prid", prid);
			json.put("crs", "EPSG:" + crs);
			json.put("uid", uIdx);
			json.put("type", "web");
			producer.produceWebMsg(json.toString());
		} catch (Exception e) {
			return false;
		}
		return true;
	}
}
