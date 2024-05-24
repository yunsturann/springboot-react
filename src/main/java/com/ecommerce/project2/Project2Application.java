package com.ecommerce.project2;

import com.ecommerce.project2.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Project2Application implements CommandLineRunner {

	private final UserService userService;

	public Project2Application(UserService userService) {
		this.userService = userService;
	}


	public static void main(String[] args) {
		SpringApplication.run(Project2Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		//createDummyData();
	}
/*
	private void createDummyData() {

	}
*/

}
