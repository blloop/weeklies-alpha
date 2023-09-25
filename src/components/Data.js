const range = (num) => (
    Array.from({ length: num }, (x, i) => i)
);

const dayList = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
];

const dayAbbrevList = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
];

export {
    range, dayList, dayAbbrevList
};