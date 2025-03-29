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

	useEffect(() => {
		const handleKeyDown = (event) => {
			setCurrWord((prev) => {
				console.log(prev + event.key);
				var newWord = prev + event.key;
				setGuessList((prev) => {
					let newGuess = [...prev]; // Copy the outer array
					newGuess[guessNumber] = newWord.padEnd(5, " "); // Replace the entire string
					return newGuess;
				});
				return newWord;
			});
		};
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
			{guessList.map((guess) => {
				return <Row word={guess} solution={solution} />;
			})}
			{currWord}
		</div>
	);
};
