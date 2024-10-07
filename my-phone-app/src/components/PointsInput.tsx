import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PointsSummary from './PointsSummary'; // Import the PointsSummary component

interface PointsInputProps {
  onSubmitPoints: (points: number) => void;
  totalPoints: number;
  phoneNumber: string;
  onDone: () => void; // Add this prop to handle the Done action
  onBack: () => void; // Add a prop for the Back action
}

const PointsInput: React.FC<PointsInputProps> = ({ onSubmitPoints, totalPoints, phoneNumber, onDone, onBack }) => {
  const [points, setPoints] = useState('');
  const [showSummary, setShowSummary] = useState(false); // State to manage the summary display

  const appendPoints = (num: string) => {
    setPoints((prev) => prev + num);
  };

  const clearPoints = () => {
    setPoints('');
  };

  const handleSubmitPoints = () => {
    if (points) {
      onSubmitPoints(parseInt(points));
      clearPoints();
      setShowSummary(true); // Show the summary after submitting points
    }
  };

  return (
    <div className="container my-5 p-4 bg-light rounded shadow-sm position-relative">
      {!showSummary ? (
        <>
          <div className="mb-3">
            <h4>Phone Number: {phoneNumber}</h4>
            <h5>Total Points: {totalPoints}</h5>
            <h6>Points Entered: {points}</h6>
          </div>
          <div className="row g-2 mb-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div key={num} className="col-4">
                <button
                  className="btn btn-primary w-100 "
                  onClick={() => appendPoints(String(num))}
                >
                  {num}
                </button>
              </div>
            ))}
            <div className="col-4">
              <button className="btn btn-danger w-100" onClick={clearPoints}>
                Clear Points
              </button>
            </div>
            <div className="col-4">
              <button className="btn btn-secondary w-100" onClick={() => appendPoints('0')}>
                0
              </button>
            </div>
            <div className="col-4">
              <button className="btn btn-success w-100" onClick={handleSubmitPoints}>
                Submit Points
              </button>
            </div>
          </div>
        </>
      ) : (
        <PointsSummary
          totalPoints={totalPoints}
          phoneNumber={phoneNumber}
          onDone={onDone}
          onRedeem={onSubmitPoints}
          // onBack={onBack}
        />
      )}
    </div>
  );
};

export default PointsInput;
