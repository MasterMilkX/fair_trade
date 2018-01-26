import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.regex.Pattern;


// this breaks up a line of text into a format 
// for dialogue boxes or choice boxes
public class TextBreaker3{

	public static void main(String[] args){

		//import the file
		File file = new File(args[0]);
		try{
			Scanner in = new Scanner(file);
			while(in.hasNextLine()){
				String input = in.nextLine();

				//Pattern p = Pattern.compile("\t\t\t(\t)*");
				Pattern p = Pattern.compile("");
				//is dialog text
				if(p.matcher(input).matches()){
					
					//fill in tab
					int max = 15;
					if(input.contains("\t\t\t")){
						input = input.replace("\t\t\t", "");
						System.out.print("			");
					}
					if(input.contains("\t")){
						input = input.replace("\t", "");
						System.out.print("	");
					}

					//choice option
					if(input.contains("> [")){
						max = 9;
						input = input.replace("> [", "");
						input = input.replace("]", "");
						System.out.print("> ");
					}


					String[] words = input.split(" ");
					String newText = "";
					String subText = "";
					int i = 0;

					//until all words added
					while(i < words.length){

						//if max not reached with additional word
						if((subText + words[i]).length() < max){
							subText += words[i] + " ";
							i++;
							continue;
						}
						//break off the line
						else if((subText + words[i]).length() >= max){
							newText += (subText + "| ");
							subText = "";
						}
					
					}
					//output the result
					newText += subText;
					newText = newText.trim();
					//System.out.println("\"" + newText + "\"");
					System.out.println(":)");
					System.out.println(input);
				}else{
					//System.out.println(input);
				}

				/*
				//choice 
				int max = 15;
				if(input.contains("\t")){
					input = input.replace("\t", "");
					System.out.print("	");
				}
				if(input.contains("> [")){
					max = 9;
					input = input.replace("> [", "");
					input = input.replace("]", "");
					System.out.print("> ");
				}


				String[] words = input.split(" ");
				String newText = "";
				String subText = "";
				int i = 0;

				//until all words added
				while(i < words.length){

					//if max not reached with additional word
					if((subText + words[i]).length() < max){
						subText += words[i] + " ";
						i++;
						continue;
					}
					//break off the line
					else if((subText + words[i]).length() >= max){
						newText += (subText + "| ");
						subText = "";
					}
				
				}
				//output the result
				newText += subText;
				newText = newText.trim();
				System.out.println("\"" + newText + "\"");

				*/
			}
			System.out.println("END");
			in.close();
		}catch(FileNotFoundException e){
			e.printStackTrace();
		}
	}
}