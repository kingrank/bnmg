package com.all.bnmg.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
 
/**
 * ehcache缓存
 */
@Configuration
@EnableCaching//标注启动了encache缓存
public class EhCacheConfig
{
    /**
     * EhCacheManagerFactoryBean缓存管理器，默认的为EhCacheCacheManager
     * Spring分别通过CacheManager.create()和new CacheManager方式来创建一个ehcache工厂
     * 一个EhCacheManagerFactoryBean创建完成, 也就代表着一个CacheManager
     */
    @Bean
    public EhCacheManagerFactoryBean ehCacheManagerFactoryBean(){
        EhCacheManagerFactoryBean cacheManagerFactoryBean = new EhCacheManagerFactoryBean();
        cacheManagerFactoryBean.setConfigLocation(new ClassPathResource("ehcache.xml"));
        cacheManagerFactoryBean.setShared(true);
        return cacheManagerFactoryBean;
    }
    /**
     * ehcache 主要的管理器
     */
    @Bean
    public EhCacheCacheManager ehCacheCacheManager(EhCacheManagerFactoryBean bean){
        return new EhCacheCacheManager(bean.getObject());
    }
}