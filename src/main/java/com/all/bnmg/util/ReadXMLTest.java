package com.all.bnmg.util;

import java.io.IOException;
import java.util.ArrayList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class ReadXMLTest {
    public static void main(String[] args) {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = db.parse("E:\\work\\hu\\project\\testxml.xml");
            NodeList cmdList = document.getElementsByTagName("book");
            //System.out.println(cmdList.getLength());
            //遍历books
            for(int i=0;i<cmdList.getLength();i++){
                //获取第i个book结点
                org.w3c.dom.Node node = cmdList.item(i);
                //获取第i个book的所有属性
                NamedNodeMap namedNodeMap = node.getAttributes();
                //获取已知名为id的属性值
                String id = namedNodeMap.getNamedItem("id").getTextContent();//System.out.println(id);

                //获取book结点的子节点,包含了Test类型的换行
                NodeList cList = node.getChildNodes();//System.out.println(cList.getLength());9

                //将一个book里面的属性加入数组
                ArrayList<String> contents = new ArrayList<>();
                for(int j=1;j<cList.getLength();j+=2){

                    org.w3c.dom.Node cNode = cList.item(j);
                    String content = cNode.getFirstChild().getTextContent();
                    contents.add(content);
                    System.out.println(contents);
                }


            }
        } catch (ParserConfigurationException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SAXException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}