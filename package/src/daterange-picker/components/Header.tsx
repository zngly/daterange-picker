import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { getMonth, getYear, setMonth, setYear } from 'date-fns';

import { FormControl, Grid, IconButton, MenuItem, Select, MenuProps, SelectChangeEvent } from '@mui/material';
import { useAppContext } from './DateRangePickerWrapper';

interface HeaderProps {
    date: Date;
    setDate: (date: Date) => void;
    nextDisabled: boolean;
    prevDisabled: boolean;
    onClickNext: () => void;
    onClickPrevious: () => void;
    minDate: Date;
    maxDate: Date;
}

const generateYears = (minDate: Date, maxDate: Date) => {
    const years = [];

    // get the min & max years
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();

    // loop through the years
    for (let i = minYear; i <= maxYear; i++) years.push(i);

    return years;
};

const Header: React.FunctionComponent<HeaderProps> = ({
    date,
    setDate,
    nextDisabled,
    prevDisabled,
    onClickNext,
    onClickPrevious,
    minDate,
    maxDate,
}: HeaderProps) => {
    const { locale } = useAppContext();

    const MONTHS =
        typeof locale !== 'undefined'
            ? [...Array(12).keys()].map((d) =>
                  locale.localize?.month(d, { width: 'abbreviated', context: 'standalone' })
              )
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const handleMonthChange = (event: SelectChangeEvent<number>) => {
        setDate(setMonth(date, parseInt(event.target.value as string, 10)));
    };

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setDate(setYear(date, parseInt(event.target.value as string, 10)));
    };

    const anchorRef = React.useRef<HTMLDivElement>(null);

    const MenuProps = {
        keepMounted: true,
        className: 'drp-header-month_menu-portal',
        BackdropProps: {
            className: 'drp-header-month_menu-backdrop-portal',
            style: {
                backgroundColor: 'unset',
            },
        },
        PaperProps: {
            className: 'drp-header-month_select-paper-portal',
        },
    } as Partial<MenuProps>;

    return (
        <Grid className='drp-month-header' ref={anchorRef} container justifyContent='space-between' alignItems='center'>
            <Grid item sx={{ padding: '5px' }}>
                <IconButton
                    sx={{
                        padding: '10px',
                        '&:hover': {
                            background: 'none',
                        },
                    }}
                    disabled={prevDisabled}
                    onClick={onClickPrevious}
                    className='drp-header_chevron'
                >
                    <ChevronLeft color={prevDisabled ? 'disabled' : 'action'} />
                </IconButton>
            </Grid>
            <Grid item>
                <FormControl variant='standard' className='drp-header_months'>
                    <Select
                        className='drp-header-month_select'
                        value={getMonth(date)}
                        onChange={handleMonthChange}
                        MenuProps={MenuProps}
                    >
                        {MONTHS.map((month, idx) => (
                            <MenuItem key={month} value={idx}>
                                {month}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item>
                <FormControl variant='standard' className='drp-header_year'>
                    <Select value={getYear(date)} onChange={handleYearChange} MenuProps={MenuProps}>
                        {generateYears(minDate, maxDate).map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sx={{ padding: '5px' }}>
                <IconButton
                    sx={{
                        padding: '10px',
                        '&:hover': {
                            background: 'none',
                        },
                    }}
                    disabled={nextDisabled}
                    onClick={onClickNext}
                    className='drp-header_chevron'
                >
                    <ChevronRight color={nextDisabled ? 'disabled' : 'action'} />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default Header;
