import React from 'react';
import Clock from '../Clock';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { shallow } from 'enzyme';

/* test('header renders with correct text', () => {
  const { getByTestId } = render(<Clock />);
  const headerEl = getByTestId('header');

  expect(headerEl.textContent).toBe('My Clock 1');
}); */

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Clock />);
});

describe('Clock Testing', () => {
  test('render the title of the clock', () => {
    expect(wrapper.find('h1').text()).toContain('My Clock 1');
  });
});

test('I can see an element with id="break-label" that contains a string (e.g. “Break Length”).', () => {
  expect(wrapper.find('#break-label').text()).toBe('Break Length');
});

test('I can see an element with id="session-label" that contains a string (e.g. "Session Length”)', () => {
  expect(wrapper.find('#session-label').text()).toBe('Session Length');
});
test('I can see clickable element with ID: id="break-decrement"', () => {
  expect(wrapper.find('#break-decrement')).toHaveLength(1);
});
test('I can see clickable element with ID: id="session-decrement"', () => {
  expect(wrapper.find('#session-decrement')).toHaveLength(1);
});
test('I can see clickable element with ID: id="break-increment"', () => {
  expect(wrapper.find('#break-increment')).toHaveLength(1);
});

test(' I can see an element, with corresponding id="break-length", which by default (on load) displays a value of 5', () => {
  expect(wrapper.find('#break-length').text()).toBe('5');
});

test(' I can see an element, with corresponding id="session-length", which by default displays a value of 25', () => {
  expect(wrapper.find('#session-length').text()).toBe('25');
});
test(' I can see an element, with corresponding id="timer-label", that contains a string indicating a session is initialized (e.g. "Session")', () => {
  expect(wrapper.find('#timer-label').text()).toBe('Session');
});

test('I can see an element with corresponding id="time-left". NOTE: Paused or running, the value in this field should always be displayed in mm:ss format (i.e. 25:00).', () => {
  expect(wrapper.find('#time-left').text()).toBe('25:00');
});

test(' I can see a clickable element with corresponding id="start_stop"', () => {
  expect(wrapper.find('#start_stop')).toHaveLength(1);
});
test('I can see a clickable element with corresponding id="reset"', () => {
  expect(wrapper.find('#reset')).toHaveLength(1);
});
//------------------------Click-functionality-----------------------------

test('When I click the element with the id of "reset", any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to its default state', () => {
  wrapper.find('#reset').simulate('click');
  expect(wrapper.find('#break-length').text()).toBe('5');
  expect(wrapper.find('#session-length').text()).toBe('25');
  expect(wrapper.find('#time-left').text()).toBe('25:00');
});
test(' When I click the element with the id of "break-decrement", the value within id="break-length" decrements by a value of 1, and I can see the updated value', () => {
  wrapper.find('#break-decrement').simulate('click');
  expect(wrapper.find('#break-length').text()).toBe('4');
});
test('When I click the element with the id of "break-increment", the value within id="break-length" increments by a value of 1, and I can see the updated value', () => {
  wrapper.find('#break-increment').simulate('click');
  expect(wrapper.find('#break-length').text()).toBe('6');
});

test('When I click the element with the id of "session-decrement", the value within id="session-length" decrements by a value of 1, and I can see the updated value', () => {
  wrapper.find('#session-decrement').simulate('click');
  expect(wrapper.find('#session-length').text()).toBe('24');
});

test('When I click the element with the id of "session-increment", the value within id="session-length" increments by a value of 1, and I can see the updated value', () => {
  wrapper.find('#session-increment').simulate('click');
  expect(wrapper.find('#session-length').text()).toBe('26');
});

test('I should not be able to set a session or break length to <= 0', () => {
  let clickCount = 26;
  for (let i = 0; i < clickCount; i++) {
    wrapper.find('#break-decrement').props().onClick();
    wrapper.find('#session-decrement').props().onClick();
  }
  expect(wrapper.find('#break-length').text()).toBe('1');
  expect(wrapper.find('#session-length').text()).toBe('1');
});

test(' I should not be able to set a session or break length to > 60', () => {
  let clickCount = 56;
  for (let i = 0; i < clickCount; i++) {
    wrapper.find('#session-increment').props().onClick();
    wrapper.find('#break-increment').props().onClick();
  }
  expect(wrapper.find('#session-length').text()).toBe('60');
  expect(wrapper.find('#break-length').text()).toBe('60');
});

//------------------testing-timer-----------------------

test('If the timer is running, the element with the id of "time-left" should display the remaining time in mm:ss format (decrementing by a value of 1 and updating the display every 1000ms)', () => {
  wrapper.find('#start_stop').props().onClick();
  expect(wrapper.find('#time-left').text()).toBe('24:00');
});
