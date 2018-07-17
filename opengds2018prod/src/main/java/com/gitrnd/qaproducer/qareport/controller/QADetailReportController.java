/**
 * 
 */
package com.gitrnd.qaproducer.qareport.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gitrnd.qaproducer.qareport.details.service.QADetailReportService;

/**
 * @author GIT
 *
 */
@Controller("/qa")
public class QADetailReportController {

	@Autowired
	@Qualifier("detatilReportService")
	QADetailReportService detailService;

	@RequestMapping(value = "/report.ajax", method = RequestMethod.POST)
	public JSONObject retrieveQADetailReportByPId(JSONObject param) {
		return detailService.retrieveQADetailReportByPId(param);
	}
}
