import React, { useCallback, useEffect, useMemo } from 'react';

import { Box, ClickAwayListener } from '@mui/material';

import DateRangePicker from './DateRangePicker';
import { DateRange, DefinedRange } from '../types';
import { addYears, subYears } from 'date-fns';
import { parseOptionalDate } from '../utils';
import { getDefaultRanges } from '../defaults';

export type DateRangePickerWrapperProps = {
    open: boolean;
    onClose?: () => void;
    onChange?: (dateRange: DateRange) => void;
    initialDateRange?: DateRange;
    definedRanges?: DefinedRange[];
    minDate?: Date | string;
    maxDate?: Date | string;
    closeOnClickOutside?: boolean;
    className?: string;
    locale?: Locale;
};

export type AppContextType = {
    onChange?: (dateRange: DateRange) => void;
    initialDateRange?: DateRange;
    definedRanges: DefinedRange[];
    minDate: Date;
    maxDate: Date;
    locale?: Locale;
};

const AppContext = React.createContext<AppContextType>({
    minDate: subYears(new Date(), 10),
    maxDate: addYears(new Date(), 10),
    definedRanges: [],
});

export function useAppContext() {
    return React.useContext<AppContextType>(AppContext);
}

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
    props: DateRangePickerWrapperProps
) => {
    const { closeOnClickOutside, className, onClose, open } = props;

    const handleClose = useCallback(() => {
        if (closeOnClickOutside === false) {
            return;
        }

        onClose && onClose();
    }, [closeOnClickOutside, onClose]);

    const handleKeyPress = useCallback(
        (event: any) => {
            event?.key === 'Escape' && handleClose();
        },
        [handleClose]
    );

    // add keypress listener for when the picker is open
    useEffect(() => {
        if (!open) return;

        // add event listener for keypress
        document.addEventListener('keydown', handleKeyPress);

        // remove event listener on cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [open, handleKeyPress]);

    const clickAwayHandler = useCallback(
        (e: MouseEvent | TouchEvent) => {
            const target = e?.target as HTMLElement;

            // address issue with popper closing when a select portal is active
            const classNames = ['drp-header-month_select-portal', 'drp-header-month_select'];

            // these are all events within the date range picker. ignore them
            if (classNames.some((className) => target?.classList?.contains(className))) return;
            if (target?.className.includes('drp-header-month')) return;
            if (target?.localName === 'body') return;

            handleClose();
        },
        [handleClose]
    );

    // compute context
    const ctx: AppContextType = useMemo(() => {
        const { open, ...ctxProps } = props;

        const today = new Date();

        // compute the min & max dates
        const minDateValid = parseOptionalDate(ctxProps.minDate, addYears(today, -10));
        const maxDateValid = parseOptionalDate(ctxProps.maxDate, addYears(today, 10));

        return {
            ...ctxProps,
            minDate: minDateValid,
            maxDate: maxDateValid,
            definedRanges: !ctxProps.definedRanges
                ? getDefaultRanges(new Date(), props.locale)
                : ctxProps.definedRanges,
        };
    }, [props]);

    if (!open) return <></>;

    return (
        <ClickAwayListener onClickAway={clickAwayHandler}>
            <Box sx={{ position: 'relative', zIndex: 1 }} className={'drp-wrapper ' + className}>
                <AppContext.Provider value={ctx}>
                    <DateRangePicker />
                </AppContext.Provider>
            </Box>
        </ClickAwayListener>
    );
};

export default DateRangePickerWrapper;
