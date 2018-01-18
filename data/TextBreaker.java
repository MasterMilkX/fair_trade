import java.util.Scanner;


// this breaks up a line of text into a format 
// for dialogue boxes or choice boxes
public class TextBreaker{

	public static void main(String[] args){

		//get the max character per line
		int max = Integer.parseInt(args[0]) + 1;

		Scanner in = new Scanner(System.in);
		String input = in.nextLine();

		//while input is not empty
		while(!input.equals("")){
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

			//next input
			input = in.nextLine();
		}
	}
}