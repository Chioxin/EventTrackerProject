package com.skilldistillery.baddriver.entities.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.skilldistillery.baddriver.entities.Driver;

public class DriverTest {
	
	static private EntityManagerFactory emf;
	private EntityManager em;
	Driver driver;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("BadDriver");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		driver = em.find(Driver.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		driver = null;
	}
	
	@Test
	void test_entity_accesses_DB_and_assigns_fields () {
		assertEquals("ABC-111", driver.getPlate());
	}


}
