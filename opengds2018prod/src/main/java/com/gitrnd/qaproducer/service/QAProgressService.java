package com.gitrnd.qaproducer.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.gitrnd.qaproducer.domain.QAProgress;
import com.gitrnd.qaproducer.repository.QAProgressRepository;


@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
public class QAProgressService {

	@Autowired
	private QAProgressRepository progressRep;

	public Integer insertQARequest(QAProgress progress) {
		return progressRep.insertQARequest(progress);
	}
}
