import { Row } from "./Row";
import { useState, useEffect } from "react";
import "./../Styles/Board.css";

const API_URL = "https://random-word-api.vercel.app/api?words=1&length=5";

export const Board = () => {
	const [solution, setSolution] = useState("");
	const [guessList, setGuessList] = useState(Array(6).fill("     "));
	const [currWord, setCurrWord] = useState("");

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
	guessList[0] = "hello";
	return (
		<div className="board">
			{solution}
			{guessList.map((guess) => {
				return <Row word={guess} solution={solution} />;
			})}
		</div>
	);
};
