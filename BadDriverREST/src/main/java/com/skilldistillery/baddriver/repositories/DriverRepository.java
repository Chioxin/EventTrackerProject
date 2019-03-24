package com.skilldistillery.baddriver.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.baddriver.entities.Driver;

public interface DriverRepository extends JpaRepository<Driver, Integer> {
	
	public List<Driver> findByCarLike (String keyword);
	public List<Driver> findByRoadLike (String keyword);
	public Driver findByPlate (String plate);
	public List<Driver> findByCity (String city);
	public List<Driver> findByDescriptionLike (String keyword);

}
