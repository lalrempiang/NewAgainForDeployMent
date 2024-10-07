import React, { useState } from 'react';
import PhoneInput from './components/PhoneInput';
import PointsInput from './components/PointsInput';
import PointsSummary from './components/PointsSummary';
import { database } from './firebaseConfig';
import { ref, set, get, child } from 'firebase/database';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App: React.FC = () => {
  const [collectedPhone, setCollectedPhone] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<'phoneInput' | 'pointsInput' | 'pointsSummary'>('phoneInput');

  const handleCollectPhoneNumber = async (phone: string) => {
    setCollectedPhone(phone);

    // Retrieve existing points from Firebase
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `phoneNumbers/${phone}`));
    const points = snapshot.exists() ? snapshot.val().points || 0 : 0;
    setTotalPoints(points);

    // Switch to the points input page
    setCurrentPage('pointsInput');
  };

  const handleSubmitPoints = async (points: number) => {
    if (collectedPhone) {
      const newTotal = totalPoints + points;
      setTotalPoints(newTotal);

      const phoneRef = ref(database, `phoneNumbers/${collectedPhone}`);
      await set(phoneRef, { number: collectedPhone, points: newTotal });

      (`Phone number and ${points} points saved successfully!`);
      setCurrentPage('pointsSummary'); // Switch to the PointsSummary view
    }
  };

  const handleRedeem = async (pointsToRedeem: number) => {
    if (collectedPhone) {
      const newTotalPoints = totalPoints - pointsToRedeem;
      setTotalPoints(newTotalPoints);

      const phoneRef = ref(database, `phoneNumbers/${collectedPhone}`);
      await set(phoneRef, { number: collectedPhone, points: newTotalPoints });

      alert(
        `You have redeemed ${pointsToRedeem} points. Your new balance is ${newTotalPoints} points.`
      );
    }
  };

  const handleDone = () => {
    setCollectedPhone(null);
    setCurrentPage('phoneInput');
  };

  const goBack = () => {
    // Go back to the previous page based on the current state
    if (currentPage === 'pointsSummary') {
      setCurrentPage('pointsInput'); // Navigate back to the points input page
    } else if (currentPage === 'pointsInput') {
      setCurrentPage('phoneInput'); // Navigate back to the phone input page
    }
  };

  return (
    <div className="container">
      {currentPage !== 'phoneInput' && (
        <button
          className="btn btn-link position-absolute top-0 start-0 m-3"
          onClick={goBack}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
      )}

      {currentPage === 'phoneInput' && (
        <div>
          <h2>Enter Phone Number</h2>
          <PhoneInput onCollectPhoneNumber={handleCollectPhoneNumber} />
        </div>
      )}

      {currentPage === 'pointsInput' && collectedPhone && (
        <PointsInput
          onSubmitPoints={handleSubmitPoints}
          totalPoints={totalPoints}
          phoneNumber={collectedPhone}
          onDone={handleDone}
        />
      )}

      {currentPage === 'pointsSummary' && collectedPhone && (
        <PointsSummary
          totalPoints={totalPoints}
          phoneNumber={collectedPhone}
          onDone={handleDone}
          onRedeem={handleRedeem}
          onBack={goBack} // Make sure this is passed correctly
        />
      )}
    </div>
  );
};

export default App;
