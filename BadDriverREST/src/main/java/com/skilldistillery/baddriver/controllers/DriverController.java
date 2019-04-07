package com.skilldistillery.baddriver.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.baddriver.entities.Driver;
import com.skilldistillery.baddriver.services.DriverService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class DriverController {
	
	@Autowired
	private DriverService svc;
	
	@GetMapping("drivers")
	public List<Driver> getAllDrivers () {
		return svc.findAll();
	}
	
	@GetMapping("drivers/{did}")
	public Driver getDriver (@PathVariable("did") Integer id) {
		Driver driver = svc.findById(id);
		return driver;
	}
	
	@GetMapping("drivers/search/road/{keyword}")
	public List<Driver> getDriverByRoad (@PathVariable("keyword") String keyword) {
		return svc.searchByRoad(keyword);
	}
	
	@GetMapping("drivers/search/car/{keyword}")
	public List<Driver> getDriverByCar (@PathVariable("keyword") String keyword) {
		return svc.searchByCar(keyword);
	}

	@GetMapping("drivers/search/city/{keyword}")
	public List<Driver> getDriverByCity (@PathVariable("keyword") String keyword) {
		return svc.searchByCity(keyword);
	}
	
	@GetMapping("drivers/search/description/{keyword}")
	public List<Driver> getDriverByDescription (@PathVariable("keyword") String keyword) {
		return svc.searchByDescription(keyword);
	}
	
	@GetMapping("drivers/search/plate/{keyword}")
	public Driver getDriverByPlate (@PathVariable("keyword") String keyword) {
		return svc.findByPlate(keyword);
	}
	
	@PutMapping("drivers/{did}")
	public Driver updateDriver (@RequestBody Driver driver, @PathVariable("did") Integer id) {
		return svc.updateDriver(driver, id);
	}
	
	@DeleteMapping("drivers/{did}")
	public void deleteDriver (@PathVariable("did") Integer id,
			HttpServletResponse resp) {
		if (svc.deleteDriver(id)) {
			resp.setStatus(204);
		} else {
			resp.setStatus(400);
		}
		
	}
	
	@PostMapping("drivers")
	public Driver createDriver (@RequestBody Driver newDriver,
			HttpServletResponse resp, HttpServletRequest req) {
		Driver driver = svc.createDriver(newDriver);
		
		if (driver != null) {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/");
			url.append(driver.getId());
			resp.setHeader("Location", url.toString());
		} else {
			resp.setStatus(400);
		}
		
		return driver;
	}

}
