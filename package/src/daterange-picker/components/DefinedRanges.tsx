import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { isSameDay } from 'date-fns';
import { DateRange } from '../types';
import { useAppContext } from './DateRangePickerWrapper';

type DefinedRangesProps = {
    setRange: (range: DateRange) => void;
    selectedRange: DateRange;
};

const isSameRange = (first: DateRange, second: DateRange) => {
    const { startDate: fStart, endDate: fEnd } = first;
    const { startDate: sStart, endDate: sEnd } = second;
    if (fStart && sStart && fEnd && sEnd) {
        return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
    }
    return false;
};

const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = ({
    setRange,
    selectedRange,
}: DefinedRangesProps) => {
    const { definedRanges } = useAppContext();
    return (
        <List className='drp-defined-ranges'>
            {definedRanges.map((range, idx) => (
                <ListItem
                    className='drp-defined-ranges-item'
                    key={idx}
                    onClick={() => setRange(range)}
                    sx={[
                        isSameRange(range, selectedRange) && {
                            backgroundColor: (theme) => theme.palette.primary.dark,
                            color: 'primary.contrastText',
                            '&:hover': {
                                color: 'inherit',
                            },
                        },
                    ]}
                >
                    <ListItemText
                        primaryTypographyProps={{
                            variant: 'body2',
                            sx: {
                                fontWeight: isSameRange(range, selectedRange) ? 'bold' : 'normal',
                            },
                        }}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    >
                        <span>{range.label}</span>
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    );
};

export default DefinedRanges;
