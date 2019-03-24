package com.skilldistillery.baddriver.services;

import java.util.List;

import com.skilldistillery.baddriver.entities.Driver;

public interface DriverService {
	
	public List<Driver> findAll ();
	public Driver findById (int id);
	public List<Driver> searchByRoad (String keyword);
	public List<Driver> searchByCar (String keyword);
	public List<Driver> searchByCity (String keyword);
	public List<Driver> searchByDescription (String keyword);
	public Driver findByPlate (String keyword);
	public Driver updateDriver (Driver updated, int id);
	public Boolean deleteDriver (int id);
	public Driver createDriver (Driver newDriver);

}
