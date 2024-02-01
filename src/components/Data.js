const range = (num) => (
    Array.from({ length: num }, (x, i) => i)
);

const darkColors = [
    'rgb(234, 90, 71)',
    'rgb(236, 140, 25)',
    'rgb(223, 194, 50)',
    'rgb(109, 207, 117)',
    'rgb(79, 209, 220)',
    'rgb(103, 139, 255)',
    'rgb(167, 99, 219)',
    'rgb(153, 153, 153)',
];

const lightColors = [
    'rgb(250, 154, 141)',
    'rgb(242, 183, 113)',
    'rgb(241, 218, 100)',
    'rgb(172, 233, 178)',
    'rgb(146, 236, 243)',
    'rgb(167, 188, 255)',
    'rgb(205, 169, 234)',
    'rgb(179, 179, 179)',
];

const tagList = [
    'Tag 1',
    'Tag 2',
    'Tag 3',
    'Tag 4',
    // 'Tag 5',
    // 'Tag 6',
    // 'Tag 7',
    // 'Tag 8',
];

const dayList = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday',
];

const dayAbbrevList = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',
];

export {
    range, darkColors, lightColors, 
    tagList, dayList, dayAbbrevList
}