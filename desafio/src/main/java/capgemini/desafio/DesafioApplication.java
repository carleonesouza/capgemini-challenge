package capgemini.desafio;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
public class DesafioApplication {

	@Bean
	public ModelMapper modelMapper() {
	    return new ModelMapper();
	}
	

	public static void main(String[] args) {
		SpringApplication.run(DesafioApplication.class, args);
	}

}
