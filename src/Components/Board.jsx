import { Row } from "./Row";
import { useState, useEffect } from "react";
import "./../Styles/Board.css";

const API_URL = "https://random-word-api.vercel.app/api?words=1&length=5";
const WORD_LENGTH = 5;

export const Board = () => {
	const [solution, setSolution] = useState("");
	const [guessList, setGuessList] = useState(Array(6).fill("     "));
	const [currWord, setCurrWord] = useState("");
	const [guessNumber, setGuessNumber] = useState(0);

	const handleKeyDown = (event) => {
		if (event.key == "Enter") {
			if (currWord.length == WORD_LENGTH) {
				setGuessNumber((prev) => prev + 1);
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

		console.log(event.key);
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
			{solution}
			{guessList.map((guess, i) => {
				let isCurGuess = i == guessNumber;
				return <Row word={guess} solution={solution} isCurGuess={isCurGuess} />;
			})}
			{currWord}
		</div>
	);
};
