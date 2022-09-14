# DateRange Picker

A react date range picker implementation

## npm

<https://www.npmjs.com/package/@zngly/daterange-picker>

## Usage

```bash
npm install @zngly/daterange-picker --save

# or with yarn
yarn add @zngly/daterange-picker
```

## Basic example

```tsx
import React from 'react';
import { DateRangePicker, DateRange } from 'mui-daterange-picker';

type Props = {};

const App: React.FunctionComponent<Props> = (props) => {
    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState<DateRange>({});

    const toggle = () => setOpen(!open);

    return <DateRangePicker open={open} toggle={toggle} onChange={(range) => setDateRange(range)} />;
};

export default App;
```

## Types

```ts
interface DateRange {
    startDate?: Date;
    endDate?: Date;
}

interface DefinedRange {
    label: string;
    startDate: Date;
    endDate: Date;
}
```

## Props

| Name                  | Type                     | Required   | Default value     | Description                                                           |
| :-------------------- | :----------------------- | :--------- | :---------------- | :-------------------------------------------------------------------- |
| `open`                | `boolean`                | _required_ | -                 | If the datepicker is open or not                                      |
| `onChange`            | `(DateRange) => void`    | _optional_ | -                 | handler function for providing selected date range                    |
| `onClose`             | `() => void`             | _optional_ | -                 | function to hide the DateRangePicker                                  |
| `initialDateRange`    | `DateRange`              | _optional_ | `{}`              | initially selected date range                                         |
| `minDate`             | `Date` or `string`       | _optional_ | 10 years ago      | min date allowed in range                                             |
| `maxDate`             | `Date` or `string`       | _optional_ | 10 years from now | max date allowed in range                                             |
| `definedRanges`       | `DefinedRange[]`         | _optional_ | -                 | custom defined ranges to show in the list                             |
| `closeOnClickOutside` | `boolean`                | _optional_ | `true`            | defines if DateRangePicker will be closed when clicking outside of it |
| `className`           | `object`                 | _optional_ | `undefined`       | defines additional wrapper style classes                              |
| `locale`              | `Locale` (from date-dns) | _optional_ | `undefined`       | defines locale to use (from date-fns package)                         |
