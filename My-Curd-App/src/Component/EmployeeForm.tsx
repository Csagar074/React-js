import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
  salary: number;
  address: string;
  city: string;
  state: string;
  joiningDate: string;
};

type Errors = {
  [key: string]: string;
};

function EmployeeForm() {
  const [employee, setEmployee] = useState<Employee>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    salary: 0,
    address: "",
    city: "",
    state: "",
    joiningDate: ""
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'gender', 'department', 'salary', 'address', 'city', 'state', 'joiningDate'];
    const filledFields = requiredFields.filter(field => {
      const value = employee[field as keyof Employee];
      return value && value.toString().trim() !== '' && (field !== 'salary' || Number(value) > 0);
    });
    setFormProgress((filledFields.length / requiredFields.length) * 100);
  }, [employee]);

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        if (value.trim().length < 2) return `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
        return '';
      
      case 'gender':
        if (!value) return 'Please select a gender';
        return '';
      
      case 'department':
        if (!value) return 'Please select a department';
        return '';
      
      case 'salary':
        if (!value || value <= 0) return 'Please enter a valid salary amount';
        return '';
      
      case 'address':
        if (!value.trim()) return 'Address is required';
        if (value.trim().length < 10) return 'Please enter a complete address';
        return '';
      
      case 'city':
      case 'state':
        if (!value.trim()) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        return '';
      
      case 'joiningDate':
        if (!value) return 'Joining date is required';
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate < today) return 'Joining date cannot be in the past';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const processedValue = name === "salary" ? Number(value) : value;

    setEmployee(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Real-time validation
    const error = validateField(name, processedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setActiveField(null);
    
    const error = validateField(name, employee[name as keyof Employee]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Errors = {};
    let hasErrors = false;
    
    Object.keys(employee).forEach(key => {
      const error = validateField(key, employee[key as keyof Employee]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(employee).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!hasErrors) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(employee);
      setSubmitSuccess(true);
      
      // Show success message
      setTimeout(() => {
        alert("🎉 Employee Registered Successfully!");
        setSubmitSuccess(false);
        
        // Reset form
        setEmployee({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          gender: "",
          department: "",
          salary: 0,
          address: "",
          city: "",
          state: "",
          joiningDate: ""
        });
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
      }, 500);
    }
  };

  const getFieldStatus = (fieldName: string) => {
    if (activeField === fieldName) return 'active';
    if (touched[fieldName] && !errors[fieldName] && employee[fieldName as keyof Employee]) return 'valid';
    if (touched[fieldName] && errors[fieldName]) return 'invalid';
    return 'normal';
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.background}>
        <div style={styles.gradientBall1}></div>
        <div style={styles.gradientBall2}></div>
      </div>

      <div style={styles.formWrapper}>
        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${formProgress}%`
              }}
            />
          </div>
          <span style={styles.progressText}>{Math.round(formProgress)}% Complete</span>
        </div>

        {/* Header with Animation */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            <span style={styles.titleIcon}>👥</span>
            Employee Registration
          </h2>
          <p style={styles.subtitle}>Enter the details below to register a new employee</p>
        </div>

        {/* Success Animation */}
        {submitSuccess && (
          <div style={styles.successOverlay}>
            <div style={styles.successAnimation}>
              <svg style={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle style={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                <path style={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Row 1: First Name & Last Name */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                First Name <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus('firstName')}
                  style={{
                    ...styles.input,
                    ...styles.inputStates[getFieldStatus('firstName')]
                  }}
                  placeholder="John"
                />
                {getFieldStatus('firstName') === 'valid' && (
                  <span style={styles.validIcon}>✓</span>
                )}
              </div>
              {touched.firstName && errors.firstName && (
                <span style={styles.errorText}>{errors.firstName}</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Last Name <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus('lastName')}
                  style={{
                    ...styles.input,
                    ...styles.inputStates[getFieldStatus('lastName')]
                  }}
                  placeholder="Doe"
                />
                {getFieldStatus('lastName') === 'valid' && (
                  <span style={styles.validIcon}>✓</span>
                )}
              </div>
              {touched.lastName && errors.lastName && (
                <span style={styles.errorText}>{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Email <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus('email')}
                  style={{
                    ...styles.input,
                    ...styles.inputStates[getFieldStatus('email')]
                  }}
                  placeholder="john.doe@company.com"
                />
                {getFieldStatus('email') === 'valid' && (
                  <span style={styles.validIcon}>✓</span>
                )}
              </div>
              {touched.email && errors.email && (
                <span style={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Phone <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="tel"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus('phone')}
                  style={{
                    ...styles.input,
                    ...styles.inputStates[getFieldStatus('phone')]
                  }}
                  placeholder="+1 (555) 123-4567"
                />
                {getFieldStatus('phone') === 'valid' && (
                  <span style={styles.validIcon}>✓</span>
                )}
              </div>
              {touched.phone && errors.phone && (
                <span style={styles.errorText}>{errors.phone}</span>
              )}
            </div>
          </div>

          {/* Row 3: Gender & Department */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Gender <span style={styles.required}>*</span>
              </label>
              <div style={styles.radioGroup}>
                {['Male', 'Female', 'Other'].map((option) => (
                  <label 
                    key={option} 
                    style={{
                      ...styles.radioLabel,
                      ...(employee.gender === option ? styles.radioSelected : {})
                    }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={employee.gender === option}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={styles.radio}
                    />
                    <span style={styles.radioText}>{option}</span>
                  </label>
                ))}
              </div>
              {touched.gender && errors.gender && (
                <span style={styles.errorText}>{errors.gender}</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Department <span style={styles.required}>*</span>
              </label>
              <select
                name="department"
                value={employee.department}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => handleFocus('department')}
                style={{
                  ...styles.select,
                  ...styles.inputStates[getFieldStatus('department')]
                }}
              >
                <option value="">Select Department</option>
                <option value="IT">💻 IT</option>
                <option value="HR">👥 HR</option>
                <option value="Sales">📊 Sales</option>
                <option value="Marketing">📢 Marketing</option>
                <option value="Finance">💰 Finance</option>
              </select>
              {touched.department && errors.department && (
                <span style={styles.errorText}>{errors.department}</span>
              )}
            </div>
          </div>

          {/* Row 4: Salary & Joining Date */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Salary ($) <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="number"
                  name="salary"
                  value={employee.salary || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus('salary')}
                  style={{
                    ...styles.input,
                    ...styles.inputStates[getFieldStatus('salary')]
                  }}
                  placeholder="50000"
                  min="0"
                />
                {getFieldStatus('salary') === 'valid' && (
                  <span style={styles.validIcon}>✓</span>
                )}
              </div>
              {touched.salary && errors.salary && (
                <span style={styles.errorText}>{errors.salary}</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Joining Date <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="date"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus('joiningDate')}
                  style={{
                    ...styles.input,
                    ...styles.inputStates[getFieldStatus('joiningDate')]
                  }}
                />
                {getFieldStatus('joiningDate') === 'valid' && (
                  <span style={styles.validIcon}>✓</span>
                )}
              </div>
              {touched.joiningDate && errors.joiningDate && (
                <span style={styles.errorText}>{errors.joiningDate}</span>
              )}
            </div>
          </div>

          {/* Address */}
          <div style={styles.fullWidth}>
            <label style={styles.label}>
              Address <span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <textarea
                name="address"
                value={employee.address}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => handleFocus('address')}
                style={{
                  ...styles.textarea,
                  ...styles.inputStates[getFieldStatus('address')]
                }}
                placeholder="Enter full address"
                rows={3}
              />
              {getFieldStatus('address') === 'valid' && (
                <span style={{...styles.validIcon, ...styles.textareaValidIcon}}>✓</span>
              )}
            </div>
            {touched.address && errors.address && (
              <span style={styles.errorText}>{errors.address}</span>
            )}
          </div>

          {/* Row 5: City & State */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                City <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="city"
                  value={employee.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus('city')}
                  style={{
                    ...styles.input,
                    ...styles.inputStates[getFieldStatus('city')]
                  }}
                  placeholder="New York"
                />
                {getFieldStatus('city') === 'valid' && (
                  <span style={styles.validIcon}>✓</span>
                )}
              </div>
              {touched.city && errors.city && (
                <span style={styles.errorText}>{errors.city}</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                State <span style={styles.required}>*</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="state"
                  value={employee.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => handleFocus('state')}
                  style={{
                    ...styles.input,
                    ...styles.inputStates[getFieldStatus('state')]
                  }}
                  placeholder="NY"
                />
                {getFieldStatus('state') === 'valid' && (
                  <span style={styles.validIcon}>✓</span>
                )}
              </div>
              {touched.state && errors.state && (
                <span style={styles.errorText}>{errors.state}</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.buttonContainer}>
            <button 
              type="submit" 
              style={{
                ...styles.submitButton,
                ...(isSubmitting ? styles.submittingButton : {})
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span style={styles.loader}>
                  <span style={styles.loaderDot}>.</span>
                  <span style={styles.loaderDot}>.</span>
                  <span style={styles.loaderDot}>.</span>
                </span>
              ) : (
                '🎯 Register Employee'
              )}
            </button>
            
            <button 
              type="button" 
              style={styles.resetButton}
              onClick={() => {
                setEmployee({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  gender: "",
                  department: "",
                  salary: 0,
                  address: "",
                  city: "",
                  state: "",
                  joiningDate: ""
                });
                setErrors({});
                setTouched({});
              }}
            >
              🔄 Reset
            </button>
          </div>
        </form>

        {/* Interactive Tips */}
        <div style={styles.tipsContainer}>
          <div style={styles.tip}>
            <span style={styles.tipIcon}>💡</span>
            <span style={styles.tipText}>All fields marked with * are required</span>
          </div>
          <div style={styles.tip}>
            <span style={styles.tipIcon}>✓</span>
            <span style={styles.tipText}>Green checkmark indicates valid field</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    position: "relative" as const,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflow: "hidden"
  },
  background: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    zIndex: 0
  },
  gradientBall1: {
    position: "absolute" as const,
    top: "-20%",
    right: "-10%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    animation: "float 20s infinite ease-in-out"
  },
  gradientBall2: {
    position: "absolute" as const,
    bottom: "-10%",
    left: "-5%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    animation: "float 25s infinite ease-in-out reverse"
  },
  formWrapper: {
    position: "relative" as const,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    width: "100%",
    maxWidth: "900px",
    padding: "40px",
    zIndex: 1,
    animation: "slideUp 0.5s ease-out"
  },
  progressContainer: {
    marginBottom: "20px"
  },
  progressBar: {
    width: "100%",
    height: "6px",
    backgroundColor: "#e0e0e0",
    borderRadius: "3px",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #4CAF50, #8BC34A)",
    transition: "width 0.3s ease",
    borderRadius: "3px"
  },
  progressText: {
    display: "block",
    textAlign: "right" as const,
    fontSize: "12px",
    color: "#666",
    marginTop: "4px"
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "30px"
  },
  title: {
    color: "#1a1a1a",
    fontSize: "32px",
    margin: "0 0 8px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  titleIcon: {
    fontSize: "36px",
    animation: "wave 2s infinite"
  },
  subtitle: {
    color: "#666",
    fontSize: "16px",
    margin: "0"
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px"
  },
  fullWidth: {
    gridColumn: "1 / -1"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "4px"
  },
  required: {
    color: "#ff4444",
    fontSize: "16px"
  },
  inputWrapper: {
    position: "relative" as const,
    width: "100%"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    outline: "none",
    backgroundColor: "white"
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.3s ease"
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "14px",
    resize: "vertical" as const,
    minHeight: "80px",
    fontFamily: "inherit",
    outline: "none",
    transition: "all 0.3s ease"
  },
  inputStates: {
    active: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 4px rgba(102,126,234,0.1)"
    },
    valid: {
      borderColor: "#4CAF50",
      backgroundColor: "#F0F9F0"
    },
    invalid: {
      borderColor: "#ff4444",
      backgroundColor: "#FFF5F5"
    },
    normal: {}
  },
  validIcon: {
    position: "absolute" as const,
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#4CAF50",
    fontSize: "18px",
    fontWeight: "bold"
  },
  textareaValidIcon: {
    top: "16px"
  },
  errorText: {
    color: "#ff4444",
    fontSize: "12px",
    marginTop: "4px",
    animation: "shake 0.3s ease"
  },
  radioGroup: {
    display: "flex",
    gap: "20px",
    padding: "8px 0"
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "white"
  },
  radioSelected: {
    borderColor: "#667eea",
    backgroundColor: "#F0F4FF"
  },
  radio: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
    accentColor: "#667eea"
  },
  radioText: {
    fontSize: "14px"
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "20px"
  },
  submitButton: {
    flex: "2",
    padding: "14px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative" as const,
    overflow: "hidden"
  },
  submittingButton: {
    opacity: 0.8,
    cursor: "not-allowed"
  },
  resetButton: {
    flex: "1",
    padding: "14px 24px",
    backgroundColor: "white",
    color: "#667eea",
    border: "2px solid #667eea",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  loader: {
    display: "inline-flex",
    gap: "4px"
  },
  loaderDot: {
    animation: "bounce 1.4s infinite ease-in-out",
    fontSize: "20px",
    lineHeight: "1"
  },
  tipsContainer: {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "#F8F9FA",
    borderRadius: "12px",
    display: "flex",
    gap: "20px",
    justifyContent: "center"
  },
  tip: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  tipIcon: {
    fontSize: "18px"
  },
  tipText: {
    fontSize: "13px",
    color: "#666"
  },
  successOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    animation: "fadeIn 0.3s ease"
  },
  successAnimation: {
    width: "100px",
    height: "100px"
  },
  checkmark: {
    width: "100px",
    height: "100px"
  },
  checkmarkCircle: {
    stroke: "#4CAF50",
    strokeWidth: "2",
    strokeDasharray: "166",
    strokeDashoffset: "166",
    animation: "stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards"
  },
  checkmarkCheck: {
    stroke: "#4CAF50",
    strokeWidth: "4",
    strokeDasharray: "48",
    strokeDashoffset: "48",
    animation: "stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards"
  }
};

// Add these keyframes to your global CSS or in a style tag
const globalStyles = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    75% { transform: rotate(-10deg); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  
  @keyframes stroke {
    100% { stroke-dashoffset: 0; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = globalStyles;
  document.head.appendChild(style);
}

export default EmployeeForm;