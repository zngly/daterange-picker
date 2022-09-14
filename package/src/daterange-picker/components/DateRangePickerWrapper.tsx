import React, { useCallback, useEffect } from 'react';

import { Box, ClickAwayListener } from '@mui/material';

import DateRangePicker from './DateRangePicker';
import { DateRange, DefinedRange } from '../types';

export interface DateRangePickerWrapperProps {
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

    useEffect(() => {
        if (!open) return;

        // add event listener for keypress
        document.addEventListener('keydown', handleKeyPress);

        // remove event listener on cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [open, handleKeyPress]);

    if (!open) return <></>;

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ position: 'relative', zIndex: 1 }} className={'drp-wrapper ' + className}>
                <DateRangePicker {...props} />
            </Box>
        </ClickAwayListener>
    );
};

export default DateRangePickerWrapper;
