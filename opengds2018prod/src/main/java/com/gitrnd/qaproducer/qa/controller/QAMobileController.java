/**
 * 
 */
package com.gitrnd.qaproducer.qa.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gitrnd.qaproducer.qa.service.QAMobileService;

/**
 * @author GIT
 *
 */
@Controller("/mobile")
public class QAMobileController {

	@Autowired
	@Qualifier("mobileService")
	QAMobileService mobileService;

	@RequestMapping(value = "/validate.ajax", method = RequestMethod.POST)
	public JSONObject validate(JSONObject param) {
		return mobileService.validate(param);
	}
}
