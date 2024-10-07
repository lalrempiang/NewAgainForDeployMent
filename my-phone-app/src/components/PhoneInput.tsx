import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PhoneInputProps {
  onCollectPhoneNumber: (phone: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onCollectPhoneNumber }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const appendNumber = (num: string) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber((prev) => prev + num);
    }
  };

  const deleteLast = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const clearAll = () => {
    setPhoneNumber('');
  };

  const handleCollectPhoneNumber = () => {
    if (phoneNumber.length === 10) {
      onCollectPhoneNumber(phoneNumber);
      clearAll();
    }
  };

  return (
    <div className="container my-5 p-4 bg-light rounded shadow-sm">
      <div className="mb-3">
        <input style={{fontSize: 60}}
          type="tel"
          className="form-control"
          value={phoneNumber}
          placeholder="Enter Phone Number"
          maxLength={10}
        />
      </div>
      <div className="row mb-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className="col-4 mb-3 g-3">
            <button
              className="btn btn-primary w-100 p-5"
              onClick={() => appendNumber(String(num))}
            >
              {num}
            </button>
          </div>
        ))}
        <div className="col-4">
          <button className="btn btn-danger w-100 p-5" onClick={clearAll}>
            Clear
          </button>
        </div>
        <div className="col-4">
          <button
            className="btn btn-primary w-100 p-5"
            onClick={() => appendNumber('0')}
          >
            0
          </button>
        </div>
        <div className="col-4">
          <button className="btn btn-warning w-100 p-5" onClick={deleteLast}>
            Delete
          </button>
        </div>
      </div>
      <button
        className="btn btn-success w-100 p-5"
        onClick={handleCollectPhoneNumber}
        disabled={phoneNumber.length !== 10}
      >
        Collect Phone Number
      </button>
    </div>
  );
};

export default PhoneInput;
