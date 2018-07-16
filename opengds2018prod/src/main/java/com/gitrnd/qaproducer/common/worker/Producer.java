package com.gitrnd.qaproducer.common.worker;

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
		amqpTemplate.convertAndSend(exchange, routingKey, msg);
		System.out.println("Send msg = " + msg);
	}
}
