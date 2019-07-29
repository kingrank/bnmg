package com.all.bnmg;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.lang.reflect.Method;

@SpringBootApplication
@MapperScan("com.all.bnmg.dao")
@EnableTransactionManagement
@EnableCaching
public class BnmgApplication {
	/*@Bean
	public KeyGenerator keyGenerator(){
		return new KeyGenerator() {
			@Override
			public Object generate(Object target, Method method, Object... params) {
				StringBuilder sb = new StringBuilder();
				sb.append(target.getClass().getName());
				sb.append(method.getName());
				for (Object obj : params) {
					if (obj!=null){
						sb.append(obj.toString());
					}
				}
				return sb.toString();
			}
		};
	}*/
	@Bean
	public EhCacheManagerFactoryBean ehCacheManagerFactoryBean() {
		EhCacheManagerFactoryBean cacheManagerFactoryBean = new EhCacheManagerFactoryBean();
		cacheManagerFactoryBean.setShared(true);
		return cacheManagerFactoryBean;
	}
	public static void main(String[] args) {
		SpringApplication.run(BnmgApplication.class, args);
	}

}
