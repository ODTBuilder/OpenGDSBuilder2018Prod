/**
 * 
 */
package com.gitrnd.qaproducer.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.gitrnd.qaproducer.domain.QACategory;
import com.gitrnd.qaproducer.mapper.QACategoryMapper;


/**
 * @className QACategoryRepository.java
 * @description
 * @author DY.Oh
 * @date 2018. 3. 9. 오전 10:48:53
 */

@Repository
public class QACategoryRepository {

	@Autowired
	private QACategoryMapper qaCategoryMapper;

	/**
	 * @author DY.Oh
	 * @Date 2018. 3. 9. 오전 10:50:23
	 * @param idx
	 * @return QACategory
	 * @decription
	 */
	public QACategory retrieveQACategoryByIdx(int idx) {
		return qaCategoryMapper.retrieveQACategoryByIdx(idx);
	}
}
