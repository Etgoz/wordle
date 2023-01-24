import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../modal.scss';

export function HelpModal(): JSX.Element {
  const { toggleHelpVisability } = useContext(AppContext);
  return (
    <div className="background">
      <div className="textArea">
        <button className="exitButton" type="button" onClick={toggleHelpVisability}>
          X
        </button>
        הוראות
        <ol>
          <li>עליכם לנחש מה המילה הסודית</li>
          <li>
            בתום כל ניחוש האותיות ייצבעו בצבעים: <br />
            <span className="bull">ירוק:</span> האות נמצאת במילה ובמקום הנכון <br />
            <span className="cow">צהוב:</span> האות נמצאת במילה אך לא במקום הנכון <br />
            <span className="wrong">אפור:</span> האות לא נמצאת במילה
          </li>
          <li>אם תנחשו את המילה הנכונה בתוך 6 ניחושים או פחות, תזכו בנקודות</li>
          <li>אם בתום 6 ניחושים לא תמצאו את המילה הנכונה, תפסידו במשחק</li>
        </ol>
        בהצלחה!
      </div>
    </div>
  );
}
