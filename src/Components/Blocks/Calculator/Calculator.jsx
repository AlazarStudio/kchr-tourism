import React, { useState } from 'react';
import styles from './Calculator.module.css';

// Данные для калькулятора
const serviceData = {
  consultation: { name: 'Консультация', price: 5000 },
  basic: { name: 'Базовая самооценка', price: 12000 },
  full: { name: 'Полный пакет', price: 20000 }
};

const Calculator = () => {
  const [facility, setFacility] = useState('');
  const [rooms, setRooms] = useState('');
  const [pkg, setPkg] = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState({
    total: 0,
    surchargeText: '',
    showSurcharge: false
  });

  const clearResult = () => {
    setResult({ total: 0, surchargeText: '', showSurcharge: false });
    setErrors({});
  };

  const handleCalculate = e => {
    e.preventDefault();
    const newErrors = {};

    // Валидация
    if (!facility) newErrors.facility = 'Выберите тип размещения';
    if (!rooms) {
      newErrors.rooms = 'Укажите количество номеров';
    } else if (isNaN(+rooms) || +rooms < 1) {
      newErrors.rooms = 'Количество номеров должно быть больше 0';
    }
    if (!pkg) newErrors.pkg = 'Выберите тип услуги';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setResult({ total: 0, surchargeText: '', showSurcharge: false });
      return;
    }

    // Расчет
    const basePrice = serviceData[pkg].price;
    let finalPrice = basePrice;
    const roomsCount = +rooms;
    const isSanatorium = facility === 'санаторий';
    const isLarge = roomsCount > 50;
    const needSurcharge = isSanatorium || isLarge;

    if (needSurcharge) finalPrice = Math.round(basePrice * 1.2);

    // Форматирование надбавки
    let surchargeText = '';
    if (needSurcharge) {
      surchargeText = '+20% надбавка';
      if (isSanatorium && isLarge) surchargeText += ' (санаторий + >50 номеров)';
      else if (isSanatorium) surchargeText += ' (санаторий)';
      else if (isLarge) surchargeText += ' (>50 номеров)';
    }

    setResult({ total: finalPrice, surchargeText, showSurcharge: needSurcharge });
    setErrors({});
  };

  const handleReset = e => {
    e.preventDefault();
    setFacility('');
    setRooms('');
    setPkg('');
    clearResult();
  };

  const formatPrice = price => price.toLocaleString('ru-RU') + ' ₽';

  return (
    <form className={styles.calculator} onSubmit={handleCalculate} noValidate>
      <div className={styles['form-group']}>
        <label htmlFor="facilityType">Тип средства размещения</label>
        <select
          id="facilityType"
          className={styles['form-control']}
          value={facility}
          onChange={e => { setFacility(e.target.value); clearResult(); }}
        >
          <option value="">Выберите тип</option>
          <option value="гостиница">Гостиница</option>
          <option value="санаторий">Санаторий</option>
          <option value="общежитие">Общежитие</option>
          <option value="кемпинг">Кемпинг</option>
        </select>
        {errors.facility && <div className={styles['validation-error']}>{errors.facility}</div>}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="rooms">Количество номеров</label>
        <input
          id="rooms"
          type="number"
          className={styles['form-control']}
          value={rooms}
          onChange={e => { setRooms(e.target.value); clearResult(); }}
          min="1"
        />
        {errors.rooms && <div className={styles['validation-error']}>{errors.rooms}</div>}
      </div>

      <div className={`${styles['form-group']} ${styles['service-options']}`}>
        <span>Тип услуги</span>
        {Object.entries(serviceData).map(([key, { name, price }]) => (
          <label key={key} className={styles['radio-label']}>
            <input
              type="radio"
              name="package"
              value={key}
              checked={pkg === key}
              onChange={e => { setPkg(e.target.value); clearResult(); }}
            />
            <span className={styles['radio-text']}>{name}</span>
            <span className={styles['price']}>{formatPrice(price)}</span>
          </label>
        ))}
        {errors.pkg && <div className={styles['validation-error']}>{errors.pkg}</div>}
      </div>

      <div className={styles.result}>
        <div className={styles['result-title']}>Итоговая стоимость</div>
        <div className={styles['result-price']}>{formatPrice(result.total)}</div>
        {result.showSurcharge && (
          <div className={styles['surcharge-info']}>{result.surchargeText}</div>
        )}
      </div>

      <div className={styles['button-group']}>
        <button type="submit" className={styles.calculateBtn}>Рассчитать</button>
        <button onClick={handleReset} className={styles.resetBtn}>Сбросить</button>
      </div>
    </form>
  );
};

export default Calculator;
