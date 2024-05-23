package com.ecommerce.project2.security;

import com.ecommerce.project2.model.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity security, HandlerMappingIntrospector introspector) throws Exception{


        MvcRequestMatcher.Builder mvcRequestBuilder = new MvcRequestMatcher.Builder(introspector);


        security

                .headers(x -> x.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(x ->
                        x
                                .requestMatchers(mvcRequestBuilder.pattern("/about")).authenticated()
                                .requestMatchers(mvcRequestBuilder.pattern("/api/auth/**")).permitAll()
                                .requestMatchers("/api/user/**").authenticated()
                                .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults())
                .formLogin(form -> form
                        .loginPage("/auth/login")
                        .loginProcessingUrl("/login"))


                .sessionManagement(x -> x.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));

        return security.build();

    }
}
