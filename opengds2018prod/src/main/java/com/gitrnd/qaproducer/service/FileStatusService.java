package com.gitrnd.qaproducer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gitrnd.qaproducer.domain.FileStatus;
import com.gitrnd.qaproducer.repository.FileStatusRepository;

@Service
@Transactional
public class FileStatusService {

	@Autowired
	private FileStatusRepository fileStatusRepository;

	@Transactional(readOnly = true)
	public FileStatus retrieveFileStatusById(int fid) {
		return fileStatusRepository.retrieveFileStatusById(fid);
	}

	@Transactional
	public void createFileStatus(FileStatus fileStatus) {
		fileStatusRepository.createFileStatus(fileStatus);
	}

	@Transactional
	public void updateFileStatus(FileStatus fileStatus) {
		fileStatusRepository.updateFileStatus(fileStatus);
	}
	
	@Transactional
	public boolean deleteFileStatus(FileStatus fs) {
		boolean flag = false;
		
		try {
			flag = fileStatusRepository.deleteFileStatus(fs);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}
		
		return flag;
	}
}
