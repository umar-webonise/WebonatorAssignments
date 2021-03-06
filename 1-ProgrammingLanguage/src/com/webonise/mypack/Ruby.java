package com.webonise.mypack;

import java.io.IOException;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Ruby extends LanguageDetector{
	String file_content;
	
	public Ruby(String file_content) {
		this.file_content = file_content;
	}
	
	public void parse() throws IOException {
		
		Scanner br = new Scanner(file_content);
		String text ;
		boolean flag = false;
		
		outer:
		while(br.hasNext()){
			text = br.nextLine();
			
			Pattern patterMultiStart = Pattern.compile("[=]begin");
			Pattern patterMultiEnd = Pattern.compile("[=]end");
			Pattern patterSingleLine = Pattern.compile("[#]");
			
			Matcher matcherMultiStart = patterMultiStart.matcher(text);
			Matcher matcherMultiEnd = patterMultiEnd.matcher(text);
			Matcher matcherSingleLine = patterSingleLine.matcher(text);
		
			if(matcherSingleLine.find())continue;
		
			if(matcherMultiStart.find())flag = true;
				
			if(flag){
				if(matcherMultiEnd.find())
					flag = false;
				continue outer;
			}		

			Pattern patternClass = Pattern.compile("class ([A-z$_][A-z0-9]*)");
			Pattern patternMethod = Pattern.compile("def ([A-z][A-z0-9]*)");
		    Pattern patternInstance = Pattern.compile("([@][A-z][A-z0-9]*|[@][@][A-z][A-z0-9]*)");
			
			Matcher matcherClass = patternClass.matcher(text);
			Matcher matcherMethod = patternMethod.matcher(text);
			Matcher matcherInstance = patternInstance.matcher(text);
			
			if(matcherClass.find())System.out.println("found Class: " + matcherClass.group(1));
			if(matcherMethod.find())System.out.println("found Method: " + matcherMethod.group(1));
			if(matcherInstance.find())System.out.println("found class Variables: " + matcherInstance.group(1));
		}		
	}
	
	public void indentation() {
		
		int bcount = 0;
		
		Scanner s = new Scanner(file_content);
		String line = "" ;
		String indented_file = "";
		
		Pattern patternStartDefClass = Pattern.compile("(class |def )");
		Pattern patternEnd = Pattern.compile("[ ]*(end)[ ]*");
		
		// UNINDENTED FILE \n\n");
		
		while(s.hasNext()){
			line = s.nextLine().trim(); 
			//System.out.println(line); //--Display Unindented File
						
			Matcher matchStartDefClass = patternStartDefClass.matcher(line);
			Matcher matchEnd = patternEnd.matcher(line);
							
			if (matchEnd.find())bcount--;
				
			indented_file = indented_file + generateTabs(bcount) + line + '\n';
						
			if(matchStartDefClass.find())bcount++;			
			
		}
		

		System.out.println("\n\n INDENTED FILE \n\n");
		
		System.out.println(indented_file);

	}


}
