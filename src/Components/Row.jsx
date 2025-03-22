import "./../Styles/Row.css";
export const Row = ({ word, solution }) => {
	console.log(solution);
	const tiles = [];
	for (let i = 0; i < 5; i++) {
		let classname = "tile ";
		console.log(solution[i]);
		if (solution && word[i] === solution[i]) {
			classname += "true";
		} else if (solution && solution.includes(word[i])) {
			classname += "partial";
		} else if (solution && word[i] != " ") {
			classname += "false";
		}
		tiles.push(
			<div key={i} className={classname}>
				{word[i].toUpperCase()}
			</div>
		);
	}
	return <div className="row">{tiles}</div>;
};
