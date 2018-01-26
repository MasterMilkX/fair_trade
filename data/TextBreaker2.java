import java.util.Scanner;


// this breaks up a line of text into a format 
// for dialogue boxes or choice boxes
public class TextBreaker2{

	public static void main(String[] args){

		//get the max character per line
		int max = Integer.parseInt(args[0]) + 1;

		Scanner in = new Scanner(System.in);
		int lineSet = in.nextInt();

		//while input is not empty
		while(lineSet > 0){

			//get the lines
			String[] texts = new String[lineSet];
			for(int a = 0; a<lineSet;a++){
				texts[a] = in.nextLine();
			}
			//parse them
			for(int a=0;a<lineSet;a++){
				String input = texts[a];
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
			}
			//next input
			lineSet = in.nextInt();
		}
	}
}