package com.skilldistillery.baddriver.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.baddriver.entities.Driver;
import com.skilldistillery.baddriver.repositories.DriverRepository;

@Service
public class DriverServiceImpl implements DriverService {
	
	@Autowired
	private DriverRepository repo;

	@Override
	public List<Driver> findAll() {
		return repo.findAll();
	}

	@Override
	public Driver findById(int id) {
		Driver driver = null;
		
		Optional<Driver> opt = repo.findById(id);
		if (opt.isPresent()) {
			driver = opt.get();
		}
		
		return driver;
	}

	@Override
	public List<Driver> searchByRoad(String keyword) {
		keyword = "%" + keyword + "%";
		return repo.findByRoadLike(keyword);
	}

	@Override
	public List<Driver> searchByCar(String keyword) {
		keyword = "%" + keyword + "%";
		return repo.findByCarLike(keyword);
	}
	
	@Override
	public List<Driver> searchByCity(String keyword) {
		return repo.findByCity(keyword);
	}

	@Override
	public Driver findByPlate(String keyword) {
		return repo.FindByPlate(keyword);
	}

	@Override
	public Driver updateDriver(Driver updated, int id) {
		Driver driver = null;
		Optional<Driver> opt = repo.findById(id);
		if (opt.isPresent()) {
			driver = opt.get();
			driver.setCity(updated.getCity());
			driver.setRoad(updated.getRoad());
			driver.setPlate(updated.getPlate());
			driver.setCar(updated.getCar());
			driver.setDescription(updated.getDescription());
			driver.setReportDate(updated.getReportDate());
		}
		return driver;
	}

	@Override
	public Boolean deleteDriver(int id) {
		Boolean deleted = false;
		Optional<Driver> opt = repo.findById(id);
		
		if (opt.isPresent()) {
			repo.delete(opt.get());
			deleted = true;
		}
		return null;
	}

	@Override
	public Driver createDriver(Driver newDriver) {
		return repo.saveAndFlush(newDriver);
	}

	
}
