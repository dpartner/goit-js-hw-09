import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let choicedDates = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    choicedDates = selectedDates[0].getTime();
    if (choicedDates > currentDate) {
      ref.button.removeAttribute('disabled');
    } else {
      if (!ref.button.hasAttribute('disabled')) {
        ref.button.setAttribute('disabled', '');
      }
      Notify.failure('Please choose a date in the future');
    }
  },
};

const calendar = flatpickr(ref.input, options);

class Timer {
  constructor({ time }) {
    this.time = time;
    // this.isActive = false;
    this.intervalId = null;
  }
  onStartTimer() {
    // if (this.isActive) {
    //   return;
    // }
    Notify.success('Timer started');
    ref.input.setAttribute('disabled', '');
    ref.button.setAttribute('disabled', '');
    this.intervalId = setInterval(() => {
      const deltaTime = choicedDates - Date.now();
      if (deltaTime >= 0) {
        const timer = this.convertMs(deltaTime);
        this.time(timer);
        this.isActive = true;
      } else {
        clearInterval(this.intervalId);
        // this.isActive = false;
        ref.input.removeAttribute('disabled');
        ref.button.removeAttribute('disabled');
        return;
      }
    }, 1000);
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
}

const deskTimer = new Timer({ time: updateTimerInterface });

function updateTimerInterface({ days, hours, minutes, seconds }) {
  ref.days.textContent = days;
  ref.hours.textContent = hours;
  ref.minutes.textContent = minutes;
  ref.seconds.textContent = seconds;
}

ref.button.addEventListener('click', deskTimer.onStartTimer.bind(deskTimer));
