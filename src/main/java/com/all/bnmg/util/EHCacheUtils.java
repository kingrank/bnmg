package com.all.bnmg.util;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

/**
 * @author asus
 */
public class EHCacheUtils {
 private static CacheManager cacheManager = CacheManager.getInstance();
 /**
  * 设置缓存对象
  * @param key
  * @param object
  */
 public static void setCache(String cacheName, String key, Object object){
  Cache cache = cacheManager.getCache(cacheName);
  Element element = new Element(key,object);
  cache.put(element);
 }
 /**
  * 删除缓存对象
  * @param key
  */
 public static void delCache(String cacheName, String key){
  Cache cache = cacheManager.getCache(cacheName);
  cache.remove(key);
 }
 /**
  * 从缓存中取出对象
  * @param key
  * @return
  */
 public static Object getCache(String cacheName,String key){
  Object object = null;
  Cache cache = cacheManager.getCache(cacheName);
  if(cache.get(key)!=null && !cache.get(key).equals("")){
   object = cache.get(key).getObjectValue();
  }
  return object;
 }
}
