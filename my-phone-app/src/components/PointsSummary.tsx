import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface PointsSummaryProps {
  totalPoints: number;
  phoneNumber: string;
  onDone: () => void;
  onRedeem: (points: number) => void;
  onBack: () => void;
}

const PointsSummary: React.FC<PointsSummaryProps> = ({ totalPoints, phoneNumber, onDone, onRedeem, onBack }) => {
  const [showRedeemOptions, setShowRedeemOptions] = useState(false);
  const [redeemed, setRedeemed] = useState(false);

  const handleRedeemClick = () => {
    setShowRedeemOptions(true);
  };

  const handleRedeemPoints = (points: number) => {
    onRedeem(points);
    setRedeemed(true);
    setShowRedeemOptions(false); // Hide redeem options after redemption
  };

  return (
    <div className="container my-4 p-3 bg-light rounded shadow-sm position-relative">
      {/* Back Button */}
      <button
        className="btn btn-link position-absolute top-0 start-0"
        onClick={onBack}
      >
        <i className="bi bi-arrow-left" style={{ fontSize: '1.5rem' }}></i>
      </button>

      <h4 className="mt-4" style={{fontSize: 30}}>Phone Number: {phoneNumber}</h4>
      <h5 style={{fontSize: 30}}>Total Points: {totalPoints}</h5>

      {!showRedeemOptions && !redeemed && (
        <>
          <button className="btn btn-primary mt-3 me-2" onClick={handleRedeemClick}>
            Redeem
          </button>
          <button className="btn btn-secondary mt-3" onClick={onDone}>
            Done
          </button>
        </>
      )}

      {showRedeemOptions && (
        <div className="mt-3">
          <h6>Select an option to redeem:</h6>
          {totalPoints >= 500 && (
            <button
              className="btn btn-success mt-2 me-2"
              onClick={() => handleRedeemPoints(500)}
            >
              Redeem 500 Points for 10 Ringgit
            </button>
          )}
          {totalPoints >= 1000 && (
            <button
              className="btn btn-success mt-2"
              onClick={() => handleRedeemPoints(1000)}
            >
              Redeem 1000 Points for 25 Ringgit
            </button>
          )}
          {totalPoints < 500 && (
            <p className="mt-2 text-danger">Not enough points to redeem.</p>
          )}
          <th>
          <button className="btn btn-secondary mt-3 " onClick={onDone}>
            Done
          </button>
          </th>
        </div>
      )}

      {redeemed && (
        <div className="mt-3">
          <p className="text-success">Redemption successful!</p>
          <button className="btn btn-secondary mt-3" onClick={onDone}>
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default PointsSummary;
