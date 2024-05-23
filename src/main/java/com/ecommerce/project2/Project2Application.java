package com.ecommerce.project2;

import com.ecommerce.project2.dto.CreateUserRequest;
import com.ecommerce.project2.model.Role;
import com.ecommerce.project2.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Set;

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
		CreateUserRequest request = CreateUserRequest.builder()
				.name("user1")
				.username("user1")
				.password("pass")
			//	.authorities(Set.of(Role.ROLE_USER))
				.build();
		userService.createUser(request);



		CreateUserRequest request3 = CreateUserRequest.builder()
				.name("admin")
				.username("admin")
				.password("admin")
			//	.authorities(Set.of(Role.ROLE_ADMIN))
				.build();
		userService.createUser(request3);
	}
*/

}
