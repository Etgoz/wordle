import React from "react";
import "./wordle.scss";

function App(): JSX.Element {
	return (
		<>
			<h1>וורדל!</h1>
			<section className="input-zone">
				<div className="grid-container">
					<div className="input line1" tabIndex={0}></div>
					<div className="input line1" tabIndex={0}></div>
					<div className="input line1" tabIndex={0}></div>
					<div className="input line1" tabIndex={0}></div>
					<div className="input line1 last" tabIndex={0}></div>
					<div className="input line2" tabIndex={0}></div>
					<div className="input line2" tabIndex={0}></div>
					<div className="input line2" tabIndex={0}></div>
					<div className="input line2" tabIndex={0}></div>
					<div className="input line2 last" tabIndex={0}></div>
					<div className="input line3" tabIndex={0}></div>
					<div className="input line3" tabIndex={0}></div>
					<div className="input line3" tabIndex={0}></div>
					<div className="input line3" tabIndex={0}></div>
					<div className="input line3 last" tabIndex={0}></div>
					<div className="input line4" tabIndex={0}></div>
					<div className="input line4" tabIndex={0}></div>
					<div className="input line4" tabIndex={0}></div>
					<div className="input line4" tabIndex={0}></div>
					<div className="input line4 last" tabIndex={0}></div>
					<div className="input line5" tabIndex={0}></div>
					<div className="input line5" tabIndex={0}></div>
					<div className="input line5" tabIndex={0}></div>
					<div className="input line5" tabIndex={0}></div>
					<div className="input line5 last" tabIndex={0}></div>
					<div className="input line6" tabIndex={0}></div>
					<div className="input line6" tabIndex={0}></div>
					<div className="input line6" tabIndex={0}></div>
					<div className="input line6" tabIndex={0}></div>
					<div className="input line6 last" tabIndex={0}></div>
				</div>
			</section>
			<section className="keyboard-zone">
				<div className="keyboard" id="top-line">
					<button type="button" id="submit">
						שלח
					</button>
					<button type="button">פ</button>
					<button type="button">ו</button>
					<button type="button">ט</button>
					<button type="button">א</button>
					<button type="button">ר</button>
					<button type="button">ק</button>
					<button type="button" id="del">
						del
					</button>
				</div>
				<div className="keyboard" id="mid-line">
					<button type="button">ל</button>
					<button type="button">ח</button>
					<button type="button">י</button>
					<button type="button">ע</button>
					<button type="button">כ</button>
					<button type="button">ג</button>
					<button type="button">ד</button>
					<button type="button">ש</button>
				</div>
				<div className="keyboard" id="bottom-line">
					<button type="button">ת</button>
					<button type="button">צ</button>
					<button type="button">מ</button>
					<button type="button">נ</button>
					<button type="button">ה</button>
					<button type="button">ב</button>
					<button type="button">ס</button>
					<button type="button">ז</button>
				</div>
			</section>
		</>
	);
}

export default App;
