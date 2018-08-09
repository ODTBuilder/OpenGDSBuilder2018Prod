package com.gitrnd.qaproducer.common.worker;

import org.json.simple.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {

	@Autowired
	private RabbitTemplate template;

	public void produceMsg(String msg) {
		System.out.println("Send msg = " + msg);
		template.convertSendAndReceive(msg);
	}

	public JSONObject produceMobileMsg(String msg) {

		System.out.println("Send msg = " + msg);
		template.setReplyTimeout(Long.MAX_VALUE);
		JSONObject response = (JSONObject) template.convertSendAndReceive(msg);
		System.out.println(response);

		return response;
	}

}
