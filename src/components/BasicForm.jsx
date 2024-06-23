import React, { useState } from 'react';

const BasicForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    withGuest: false,
    guestName: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required.";
    tempErrors.email = (/\S+@\S+\.\S+/).test(formData.email) ? "" : "Email is not valid.";
    tempErrors.age = formData.age > 0 ? "" : "Age must be greater than 0.";
    if (formData.withGuest) {
      tempErrors.guestName = formData.guestName ? "" : "Guest name is required.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).every(key => tempErrors[key] === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="form-container">
      <h2>Event Registration Form</h2>
      <div className='container'>
        <form onSubmit={handleSubmit} className='form'>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>
          <div className="form-group">
            <label>
              Are you attending with a guest?
            </label>
            <input
                id='checkbox'
                type="checkbox"
                name="withGuest"
                checked={formData.withGuest}
                onChange={handleChange}
              />
          </div>
          {formData.withGuest && (
            <div className="form-group">
              <label>Guest Name:</label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
              />
              {errors.guestName && <span className="error">{errors.guestName}</span>}
            </div>
          )}
          
          <button type="submit">Submit</button>
        </form>
        {submitted && (
          <div className="summary">
            <h3>Summary of Entered Data:</h3>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Age: {formData.age}</p>
            {formData.withGuest && <p>Guest Name: {formData.guestName}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicForm;
