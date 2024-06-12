package com.qrcode.qrcode.config;

import com.qrcode.qrcode.model.MachinePart;
import com.qrcode.qrcode.model.MaintenanceRecord;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
public class WebConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigins = "http://localhost:3000";

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        // Expose IDs for MachinePart entity
        config.exposeIdsFor(MachinePart.class);
        // Expose IDs for MaintenanceRecord entity
        config.exposeIdsFor(MaintenanceRecord.class);

        // Configure CORS
        cors.addMapping("/**").allowedOrigins(theAllowedOrigins);
    }
}
