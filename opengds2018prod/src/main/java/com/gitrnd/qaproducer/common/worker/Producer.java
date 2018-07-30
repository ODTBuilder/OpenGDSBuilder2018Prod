package com.gitrnd.qaproducer.common.worker;

import org.json.simple.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Producer {

	@Autowired
	private RabbitTemplate template;
	@Value("${gitrnd.rabbitmq.exchange}")
	private String exchange;
	@Value("${gitrnd.rabbitmq.routingKey}")
	private String routingKey;

	public void produceMsg(String msg) {
		System.out.println("Send msg = " + msg);
		template.convertSendAndReceive(exchange, routingKey, msg);
	}

	public JSONObject produceMobileMsg(String msg) {

		System.out.println("Send msg = " + msg);
		template.setReplyTimeout(Long.MAX_VALUE);
		JSONObject response = (JSONObject) template.convertSendAndReceive(exchange, routingKey, msg);
		System.out.println(response);

		return response;
	}

}
