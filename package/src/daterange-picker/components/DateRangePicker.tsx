import * as React from 'react';
import { addMonths, isAfter, isBefore, isSameDay, isSameMonth, isWithinInterval, max, min } from 'date-fns';
import { useAppContext } from './DateRangePickerWrapper';
import { Marker, MARKERS } from './Markers';
import { DateRange, NavigationAction } from '../types';
import { getValidatedMonths } from '../utils';

import Menu from './Menu';

const DateRangePicker = () => {
    const props = useAppContext();

    const { onChange, initialDateRange, minDate, maxDate } = props;

    const today = new Date();

    const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(initialDateRange || {}, minDate, maxDate);

    const [dateRange, setDateRange] = React.useState<DateRange>({ ...initialDateRange });
    const [hoverDay, setHoverDay] = React.useState<Date>();
    const [firstMonth, setFirstMonth] = React.useState<Date>(intialFirstMonth || today);
    const [secondMonth, setSecondMonth] = React.useState<Date>(initialSecondMonth || addMonths(firstMonth, 1));

    const { startDate, endDate } = dateRange;

    // handlers
    const setFirstMonthValidated = (date: Date) => {
        if (isBefore(date, secondMonth)) {
            setFirstMonth(date);
        }
    };

    const setSecondMonthValidated = (date: Date) => {
        if (isAfter(date, firstMonth)) {
            setSecondMonth(date);
        }
    };

    const setDateRangeValidated = (range: DateRange) => {
        let { startDate: newStart, endDate: newEnd } = range;

        if (newStart && newEnd) {
            range.startDate = newStart = max([newStart, minDate]);
            range.endDate = newEnd = min([newEnd, maxDate]);

            setDateRange(range);
            onChange && onChange(range);

            setFirstMonth(newStart);
            setSecondMonth(isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd);
        } else {
            const emptyRange = {};

            setDateRange(emptyRange);
            onChange && onChange(emptyRange);

            setFirstMonth(today);
            setSecondMonth(addMonths(firstMonth, 1));
        }
    };

    const onDayClick = (day: Date) => {
        if (startDate && !endDate && !isBefore(day, startDate)) {
            const newRange = { startDate, endDate: day };
            onChange && onChange(newRange);
            setDateRange(newRange);
        } else {
            setDateRange({ startDate: day, endDate: undefined });
        }
        setHoverDay(day);
    };

    const onMonthNavigate = (marker: Marker, action: NavigationAction) => {
        if (marker === MARKERS.FIRST_MONTH) {
            const firstNew = addMonths(firstMonth, action);
            if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
        } else {
            const secondNew = addMonths(secondMonth, action);
            if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
        }
    };

    const onDayHover = (date: Date) => {
        if (startDate && !endDate) {
            if (!hoverDay || !isSameDay(date, hoverDay)) {
                setHoverDay(date);
            }
        }
    };

    // helpers
    const inHoverRange = (day: Date) =>
        (startDate &&
            !endDate &&
            hoverDay &&
            isAfter(hoverDay, startDate) &&
            isWithinInterval(day, { start: startDate, end: hoverDay })) as boolean;

    const helpers = {
        inHoverRange,
    };

    const handlers = {
        onDayClick,
        onDayHover,
        onMonthNavigate,
    };

    return (
        <Menu
            dateRange={dateRange}
            firstMonth={firstMonth}
            secondMonth={secondMonth}
            setFirstMonth={setFirstMonthValidated}
            setSecondMonth={setSecondMonthValidated}
            setDateRange={setDateRangeValidated}
            helpers={helpers}
            handlers={handlers}
        />
    );
};

export default DateRangePicker;
