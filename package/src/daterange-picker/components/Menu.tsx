/* eslint-disable object-curly-newline */
import React, { useMemo } from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import { differenceInCalendarMonths, format } from 'date-fns';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import { DateRange, Setter, NavigationAction } from '../types';
import { MARKERS } from './Markers';
import { useAppContext } from './DateRangePickerWrapper';

interface MenuProps {
    dateRange: DateRange;
    firstMonth: Date;
    secondMonth: Date;
    setFirstMonth: Setter<Date>;
    setSecondMonth: Setter<Date>;
    setDateRange: Setter<DateRange>;
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

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
    const { locale, minDate, maxDate } = useAppContext();

    const { dateRange, firstMonth, setFirstMonth, secondMonth, setSecondMonth, setDateRange, helpers, handlers } =
        props;

    const { startDate, endDate } = dateRange;

    const canNavigateCloser = useMemo(
        () => differenceInCalendarMonths(secondMonth, firstMonth) > 2,
        [secondMonth, firstMonth]
    );

    const canNavigateBackwards = useMemo(
        () => differenceInCalendarMonths(firstMonth, minDate) > 0,
        [firstMonth, minDate]
    );

    const canNavigateForwards = useMemo(
        () => differenceInCalendarMonths(maxDate, secondMonth) > 0,
        [maxDate, secondMonth]
    );

    const commonProps = {
        dateRange,
        helpers,
        handlers,
    };

    return (
        <Paper elevation={5} square className='drp-menu'>
            <Grid container direction='row' wrap='nowrap'>
                <Grid>
                    <DefinedRanges selectedRange={dateRange} setRange={setDateRange} />
                </Grid>
                <Divider orientation='vertical' flexItem />
                <Grid>
                    <Grid container sx={{ padding: '20px 70px' }} alignItems='center'>
                        <Grid item sx={{ flex: 1, textAlign: 'center' }}>
                            <Typography variant='subtitle1'>
                                {startDate ? format(startDate, 'dd MMMM yyyy', { locale }) : 'Start Date'}
                            </Typography>
                        </Grid>
                        <Grid item sx={{ flex: 1, textAlign: 'center' }}>
                            <ArrowRightAlt color='action' />
                        </Grid>
                        <Grid item sx={{ flex: 1, textAlign: 'center' }}>
                            <Typography variant='subtitle1'>
                                {endDate ? format(endDate, 'dd MMMM yyyy', { locale }) : 'End Date'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container direction='row' justifyContent='center' wrap='nowrap'>
                        <Month
                            {...commonProps}
                            value={firstMonth}
                            setValue={setFirstMonth}
                            navState={[canNavigateBackwards, canNavigateCloser]}
                            marker={MARKERS.FIRST_MONTH}
                        />
                        <Divider orientation='vertical' flexItem />
                        <Month
                            {...commonProps}
                            value={secondMonth}
                            setValue={setSecondMonth}
                            navState={[canNavigateCloser, canNavigateForwards]}
                            marker={MARKERS.SECOND_MONTH}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Menu;
