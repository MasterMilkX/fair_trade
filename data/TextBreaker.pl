#!/bin/perl
use strict;
use warnings;

sub main{

	my $filename = $ARGV[0];
	open(my $FILE, "<", $filename) || die "Could not open $filename $!\n";
	my $r = 0;
	while(my $line = <$FILE>){
		chomp $line;
		my $input = $line;

		if($input =~/\t\t(\t)+/){
			my $max = 18;
			#remove tabs
			if($input =~/\t\t\t/){
				$input =~s/\t\t\t//;
				print("\t\t\t");
			}
			while($input =~/\t/){
				$input =~s/\t//;
				print("\t");
			}

			#choice option
			if($input =~/> \[/){
				$max = 9;
				$input =~s/>\s\[//;
				$input =~s/\]//;
				print("> ");
			}

			print(dialoger($input, $max));
			print("\n");
			next;
		}else{
			print("$input\n");
		}
	}
	close $FILE;
}

sub dialoger{
	(my $input, my $max) = @_;
	my @words = split(/\s/, $input);
	my $newText = "";
	my $subText = "";
	my $i = 0;

	#until all words added
	my $wordsLen = @words;
	while($i < $wordsLen){

		#if max not reached with additional word
		my $theory = $subText . $words[$i];
		if(length($theory) < $max){
			$subText .= $words[$i] . " ";
			$i++;
			next;
		}
		#break off the line
		elsif(length($theory) >= $max){
			$newText .= ($subText . "| ");
			$subText = "";
		}
	}				

	my $comma = ($max == 9 ? "" : ",");
	#output the result
	$newText .= $subText;
	$newText =~ s/\s+$//;
	return ("\"$newText\"" . $comma);
}

main()