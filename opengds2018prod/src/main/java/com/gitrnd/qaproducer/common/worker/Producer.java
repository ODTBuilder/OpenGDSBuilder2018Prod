package com.gitrnd.qaproducer.common.worker;

import org.json.simple.JSONObject;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Producer {

	@Autowired
	private AmqpTemplate amqpTemplate;
	@Value("${gitrnd.rabbitmq.exchange}")
	private String exchange;
	@Value("${gitrnd.rabbitmq.routingKey}")
	private String routingKey;

	public void produceMsg(String msg) {
		System.out.println("Send msg = " + msg);
		amqpTemplate.convertAndSend(exchange, routingKey, msg);
	}

//	public Object produceMobileMsg(String msg) {
//		System.out.println("Send msg = " + msg);
//		JSONObject response = (JSONObject) amqpTemplate.convertSendAndReceive(exchange, routingKey, msg);
//		System.out.println("Reply msg = " + response.toJSONString());
//		return response;
//	}

}
