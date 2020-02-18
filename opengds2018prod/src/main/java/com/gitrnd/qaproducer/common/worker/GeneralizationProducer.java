package com.gitrnd.qaproducer.common.worker;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GeneralizationProducer {

	@Autowired
	private RabbitTemplate template;

	@Value("${spring.rabbitmq.template.exchange}")
	private String exchange;
	@Value("${spring.rabbitmq.template.routing-key-generalization}")
	private String routingKey;

	public void produceGeneralMsg(String msg) {

		System.out.println("Send msg = " + msg);
		template.setExchange(exchange);
		template.setRoutingKey(routingKey);
		template.setReplyTimeout(Long.MAX_VALUE);
		template.convertAndSend(msg);
	}
}
