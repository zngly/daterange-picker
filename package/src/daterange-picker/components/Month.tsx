import React, { useMemo } from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { getDate, isSameMonth, isToday, format, isWithinInterval } from 'date-fns';
import { chunks, getDaysInMonth, isStartOfRange, isEndOfRange, inDateRange, isRangeSameDay } from '../utils';
import Header from './Header';
import Day from './Day';

import { NavigationAction, DateRange } from '../types';
import { useAppContext } from './DateRangePickerWrapper';

interface MonthProps {
    value: Date;
    marker: symbol;
    dateRange: DateRange;
    minDate: Date;
    maxDate: Date;
    navState: [boolean, boolean];
    // eslint-disable-next-line no-unused-vars
    setValue: (date: Date) => void;
    helpers: {
        // eslint-disable-next-line no-unused-vars
        inHoverRange: (day: Date) => boolean;
    };
    handlers: {
        // eslint-disable-next-line no-unused-vars
        onDayClick: (day: Date) => void;
        // eslint-disable-next-line no-unused-vars
        onDayHover: (day: Date) => void;
        // eslint-disable-next-line no-unused-vars
        onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
    };
}

const Month: React.FunctionComponent<MonthProps> = (props: MonthProps) => {
    const { locale } = useAppContext();
    const { helpers, handlers, value: date, dateRange, marker, setValue: setDate, minDate, maxDate } = props;

    const weekStartsOn = locale?.options?.weekStartsOn || 0;
    const WEEK_DAYS = useMemo(
        () =>
            typeof locale !== 'undefined'
                ? [...Array(7).keys()].map((d) =>
                      locale.localize?.day((d + weekStartsOn) % 7, { width: 'short', context: 'standalone' })
                  )
                : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        [locale, weekStartsOn]
    );
    const [back, forward] = props.navState;

    return (
        <Paper className='drp-month' square elevation={0} sx={{ width: 290 }}>
            <Grid container>
                <Header
                    date={date}
                    setDate={setDate}
                    nextDisabled={!forward}
                    prevDisabled={!back}
                    onClickPrevious={() => handlers.onMonthNavigate(marker, NavigationAction.Previous)}
                    onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
                    minDate={minDate}
                    maxDate={maxDate}
                />

                <Grid
                    item
                    container
                    direction='row'
                    justifyContent='space-between'
                    className='drp-month_weekdays'
                    sx={{
                        marginTop: '10px',
                        paddingLeft: '30px',
                        paddingRight: '30px',
                    }}
                >
                    {WEEK_DAYS.map((day, index) => (
                        <Typography color='textSecondary' key={index} variant='caption'>
                            {day}
                        </Typography>
                    ))}
                </Grid>

                <Grid
                    item
                    container
                    direction='column'
                    justifyContent='space-between'
                    className='drp-month_chunks'
                    sx={{
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        marginTop: '15px',
                        marginBottom: '20px',
                    }}
                >
                    {chunks(getDaysInMonth(date, locale), 7).map((week, idx) => (
                        <Grid key={idx} container direction='row' justifyContent='center'>
                            {week.map((day) => {
                                const isStart = isStartOfRange(dateRange, day);
                                const isEnd = isEndOfRange(dateRange, day);
                                const isRangeOneDay = isRangeSameDay(dateRange);
                                const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);

                                return (
                                    <Day
                                        key={format(day, 'dd-MM-yyyy')}
                                        filled={isStart || isEnd}
                                        outlined={isToday(day)}
                                        highlighted={highlighted && !isRangeOneDay}
                                        disabled={
                                            !isSameMonth(date, day) ||
                                            !isWithinInterval(day, { start: minDate, end: maxDate })
                                        }
                                        startOfRange={isStart && !isRangeOneDay}
                                        endOfRange={isEnd && !isRangeOneDay}
                                        onClick={() => handlers.onDayClick(day)}
                                        onHover={() => handlers.onDayHover(day)}
                                        value={getDate(day)}
                                    />
                                );
                            })}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Month;
