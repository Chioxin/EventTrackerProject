# Project With REST API
In this project, we were instructed to create and entire REST project from scratch with only the documents we were given and from what we learned in class. There was no hand holding to accomplish this. We were to construct a single table database to perform full CRUD operations on. From there, we constructed a JPA that handled our entities. We then constructed a REST project that would handle the controllers, services, and repositories that were required. The objective, was to create REST api's that could be tested and checked with a program called Postman, to make sure they worked.

Once all was complete and ready, we were to upload it to our AWS EC2 Server.

## Technologies
* Java 8
* Spring Tool Suite 4
* MySQL
* MySQL Workbench
* Tomcat
* AWS EC2 Server

## REST Paths
* GET - api/drivers - List of all drivers.
* GET - api/drivers/{id} - A driver by ID.
* GET - api/drivers/search/road/{keyword} - List of drivers by road.
* GET - api/drivers/search/car/{keyword} - List of drivers by car.
* GET - api/drivers/search/city/{keyword} - List of drivers by city.
* GET - api/drivers/search/description/{keyword} - List of drivers by description.
* GET - api/drivers/search/plate/{plate} - A driver by Plate Number.
* PUT - api/drivers/{id} - Update a driver's information by ID. Send a JSON body.
* POST - api/drivers - Create a new driver. Send a JSON body. Will return Driver with ID.
* DEL - api/drivers/{id} - Delete a driver by ID.

Site: http://3.17.192.154:8080/BadDriverREST/
