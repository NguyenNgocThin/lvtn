import React from 'react';
import './BookingModal.css';
const BookingModal = ({ isOpen, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý dữ liệu đặt chỗ và gửi đi
    // ...
    // Sau khi xử lý xong, đóng modal
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2 style={{ textAlign:'center'}}>Đặt chỗ</h2>
        <form onSubmit={handleSubmit} className='form'>
          <input className='input' type="text" name="name" placeholder="Tên" />
          <input className='input' type="email" name="email" placeholder="Email" />
          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;