package com.webonise.mypack;

/**
 * MAIN CLASS TO BE RUN
 * 
 * Author : Umar Siddiqui
 * Job Title : Trainee
 * Company : Webonise Lab
 * 
 */


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LanguageDetector {
	

	
	static public String getFileContent(String filename) throws IOException {
		
		File file = new File(filename);
		BufferedReader br = new BufferedReader(new FileReader(file));
		String file_content = "";
		String line;
		
		while((line = br.readLine())!=null)
		{
			file_content = file_content + line + "\n";
		}
		return file_content;		

	}
	
	
	static public LanguageDetector langDetect(String filename) throws IOException {
		
		File file = new File(filename);
		String file_content = getFileContent(file.getName());
		
		
		Pattern for_PHP = Pattern.compile("(.*[\n])*<\\?php(.*[\n])*");
		Pattern for_java = Pattern.compile("class .*[{](.*[\n])*[}]");
		Pattern for_ruby = Pattern.compile("class(.*[\n])*end");
		
		Matcher m_java = for_java.matcher(file_content);
		Matcher m_PHP = for_PHP.matcher(file_content);
		Matcher m_ruby = for_ruby.matcher(file_content);
		
		if(m_PHP.find()) {
			System.out.println("PHP File");
			return new Php(file_content);
		}else if (m_java.find()) {
			System.out.println("Java File");
			return new Java(file_content);
		}else if (m_ruby.find()) {
			System.out.println("Ruby File");
			return new Ruby(file_content);
		}else {
			System.out.println("Invalid File");
			return null;
		}
		

	}
	
	
	
	public void parse() throws IOException { System.out.println("No parser available");}
	public void indentation() { System.out.println("No indentation available");}
	
	
	public String generateTabs(int bcount) {
		String tabs="";
		
		for(int i = 0 ; i < bcount ; i++)
			tabs = tabs + '\t';
		
		return tabs;
	}
	
	
	
	public static void main(String[] args) throws IOException {
		
		System.out.println("Enter File Name:");
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String input_file = br.readLine();
		
		LanguageDetector ld = LanguageDetector.langDetect(input_file.trim());
		ld.parse();
		ld.indentation();
				
	}
	

}


