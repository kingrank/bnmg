package com.all.bnmg.config;

import com.all.bnmg.entity.SysParam;
import com.all.bnmg.service.SysService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author asus
 * ApplicationRunner CommandLineRunner @PostConstruct
 */
@Component
@Order(value = 1)
public class StartService implements ApplicationRunner,ServletContextListener,ApplicationContextAware {
    private static Logger logger = LoggerFactory.getLogger(StartService.class);
	private static  ApplicationContext applicationContext;
	private static  ServletContext servletContext;
	private static Map<String,String> params = new HashMap<String,String>();
	@Autowired
	private SysService sysService;
	/**
	 * 获取容器bean
	 * */
	public static Object  getBean(String name){
		return StartService.applicationContext.getBean(name);
	}
	/**
	 * 获取系统参数
	 * */
	public static String  getParam(String key){
		return params.get(key);
	}
	@Override
	public void run(ApplicationArguments args) throws Exception {
		logger.info("=========== 加载系统参数 begin =============");
		Map param = new HashMap();
		param.put("index","0");
		param.put("limit","1000");
		List<SysParam> list = sysService.getSysParam(param);
		for(SysParam s:list){
			params.put(s.getKey(),s.getVal());
		}
		servletContext.setAttribute("webConfig",sysService.getWebConfig());
		logger.info("=========== 加载系统参数 end =============");
	}

	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		servletContext = servletContextEvent.getServletContext();
	}

	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {

	}
	@Override
	public void setApplicationContext(ApplicationContext apc) throws BeansException {
		applicationContext = apc;
	}
}