import moment from 'moment';

export const isDateBlocked = (date, { minDate, maxDate }) =>
    !!minDate && date.isBefore(minDate) // isBefore
    || !!maxDate && date.isAfter(maxDate); // isAfter

export const isDateSelectionStart = (date, { startDate }) =>
    !!startDate && date.isSame(startDate, 'day');

export const isDateSelectionEnd = (date, { endDate }) =>
    !!endDate && date.isSame(endDate, 'day');

export const isDateInSelection = (date, props) => 
    !!props.startDate && date.isBetween(props.startDate, props.endDate, 'day')
    || isDateSelectionStart(date, props) || isDateSelectionEnd(date, props);

const createModifiers = ({ modifiers, ...props }) => ({
    blocked: (date) => isDateBlocked(date, props),
    'selected-start': (date) => isDateSelectionStart(date, props),
    selected: (date) => isDateInSelection(date, props),
    'selected-end': (date) => isDateSelectionEnd(date, props),
    ...modifiers,
});

export default createModifiers;
