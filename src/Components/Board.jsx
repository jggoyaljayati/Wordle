import { Row } from "./Row";
import { useState, useEffect } from "react";
import "./../Styles/Board.css";

const API_URL = "https://random-word-api.vercel.app/api?words=1&length=5";
const WORD_LENGTH = 5;
const CHANCES = 6;

export const Board = () => {
	const [isGameOver, setIsGameOver] = useState(false);
	const [solution, setSolution] = useState("");
	const [guessList, setGuessList] = useState(Array(CHANCES).fill("     "));
	const [currWord, setCurrWord] = useState("");
	const [guessNumber, setGuessNumber] = useState(0);

	const handleKeyDown = (event) => {
		if (isGameOver == false) {
			if (event.key == "Enter") {
				if (currWord.length == WORD_LENGTH) {
					setGuessNumber((prev) => {
						let curGuessNumber = prev + 1;
						if (curGuessNumber == CHANCES || currWord == solution) {
							setIsGameOver((prevVal) => !prevVal);
						}
						return curGuessNumber;
					});

					setCurrWord(() => "");
				}
				return;
			} else if (event.key == "Backspace") {
				setCurrWord((prev) => {
					var newWord = prev.slice(0, -1);
					setGuessList((prev) => {
						let newGuess = [...prev]; // Copy the outer array
						newGuess[guessNumber] = newWord.padEnd(5, " "); // Replace the entire string
						return newGuess;
					});
					return newWord;
				});
			} else if (currWord.length < WORD_LENGTH) {
				setCurrWord((prev) => {
					var newWord = prev + event.key;
					setGuessList((prev) => {
						let newGuess = [...prev]; // Copy the outer array
						newGuess[guessNumber] = newWord.padEnd(5, " "); // Replace the entire string
						return newGuess;
					});
					return newWord;
				});
			}
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [currWord, guessList]);

	useEffect(() => {
		console.log("Component mounted!");
		const fetchWord = async () => {
			const response = await fetch(API_URL);
			const word = await response.json();
			console.log("Fetched word:", word);
			setSolution(word[0]);
		};
		fetchWord();
	}, []);

	return (
		<div className="board">
			{guessList.map((guess, i) => {
				let isCurGuess = i == guessNumber;
				return <Row word={guess} solution={solution} isCurGuess={isCurGuess} />;
			})}
		</div>
	);
};
