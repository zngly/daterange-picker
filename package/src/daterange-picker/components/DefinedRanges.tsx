import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { isSameDay } from 'date-fns';
import { DateRange, DefinedRange } from '../types';

type DefinedRangesProps = {
    // eslint-disable-next-line no-unused-vars
    setRange: (range: DateRange) => void;
    selectedRange: DateRange;
    ranges: DefinedRange[];
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
    ranges,
    setRange,
    selectedRange,
}: DefinedRangesProps) => (
    <List className='drp-defined-ranges'>
        {ranges.map((range, idx) => (
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
                >
                    <span>{range.label}</span>
                </ListItemText>
            </ListItem>
        ))}
    </List>
);

export default DefinedRanges;
