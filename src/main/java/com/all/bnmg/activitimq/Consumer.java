package com.all.bnmg.activitimq;
      
    import org.springframework.jms.annotation.JmsListener;  
    import org.springframework.stereotype.Component;  
    /**
     * @author asus
     */ //@Component //需要使用消息队列时 将yml配置文件中注释部分打开  并去掉@Component前注释 开启监听
    public class Consumer {  
            // 使用JmsListener配置消费者监听的队列，其中text是接收到的消息  
        @JmsListener(destination = "activi.queue")
        public void receiveQueue(String text) {  
            System.out.println("Consumer收到的报文为:"+text);  
        }  
    }