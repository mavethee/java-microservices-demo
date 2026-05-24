package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/api/info")
    public Map<String, Object> getInfo() throws Exception {
        Map<String, Object> response = new HashMap<>();
        String host = InetAddress.getLocalHost().getHostName();
        
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        
        // Obliczanie faktycznie użytej pamięci: (Zaalokowana - Wolna)
        long usedMemory = (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024);
        
        response.put("containerId", host);
        response.put("maxMemory", maxMemory);
        response.put("usedMemory", usedMemory); // Nowy parametr dla Live Trackera
        
        return response;
    }
}
