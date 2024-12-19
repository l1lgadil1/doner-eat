import { useState } from 'react';

interface ValidationState {
  customerName: string;
  phoneNumber: string;
}

export const useCheckoutValidation = () => {
  const [errors, setErrors] = useState<ValidationState>({
    customerName: '',
    phoneNumber: ''
  });

  const validateName = (name: string): boolean => {
    if (!name.trim()) {
      setErrors(prev => ({ ...prev, customerName: 'Пожалуйста, введите ваше имя' }));
      return false;
    }
    if (name.length < 2) {
      setErrors(prev => ({ ...prev, customerName: 'Имя должно содержать минимум 2 символа' }));
      return false;
    }
    setErrors(prev => ({ ...prev, customerName: '' }));
    return true;
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?7\d{10}$/;
    if (!phone.trim()) {
      setErrors(prev => ({ ...prev, phoneNumber: 'Пожалуйста, введите номер телефона' }));
      return false;
    }
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      setErrors(prev => ({ 
        ...prev, 
        phoneNumber: 'Введите корректный номер телефона в формате +7XXXXXXXXXX' 
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, phoneNumber: '' }));
    return true;
  };

  const validateForm = (name: string, phone: string): boolean => {
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    return isNameValid && isPhoneValid;
  };

  const clearErrors = () => {
    setErrors({ customerName: '', phoneNumber: '' });
  };

  return {
    errors,
    validateForm,
    clearErrors
  };
}; 