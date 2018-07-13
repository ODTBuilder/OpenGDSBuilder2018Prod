/**
 * 
 */
package com.gitrnd.qaproducer.geogig.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gitrnd.gdsbuilder.geogig.type.GeogigTransaction;
import com.gitrnd.qaproducer.geogig.service.GeogigTransactionService;

/**
 * @author GIT
 *
 */
@Controller
@RequestMapping("/geogig")
public class GeogigTransactionController {

	@Autowired
	GeogigTransactionService transactionService;

	@RequestMapping(value = "/beginTransaction.do", method = RequestMethod.POST)
	public GeogigTransaction beginTransaction(JSONObject param) {
		return transactionService.beginTransaction(param);
	}

	@RequestMapping(value = "/endTransaction.do", method = RequestMethod.POST)
	public GeogigTransaction endTransaction(JSONObject param) {
		return transactionService.endTransaction(param);
	}

	@RequestMapping(value = "/cancelTransaction.do", method = RequestMethod.POST)
	public GeogigTransaction cancelTransaction(JSONObject param) {
		return transactionService.cancelTransaction(param);
	}
}
