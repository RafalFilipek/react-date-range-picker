import React from 'react';
import { DayPicker } from 'react-dates';
import moment from 'moment';
import createModifiers from './modifiers';
import SelectTypes from './SelectTypes';

export default class DatePicker extends React.Component {
    static displayName = 'DatePicker';
    static props;

    static defaultProps = {
        range: false,
        startDate: undefined,
        endDate: undefined,
        minDate: undefined,
        maxDate: undefined,
        months: 1,
        initialVisibleMonth: 0,
        modifiers: {}
    };

    getInitialMonth = () => moment().add(this.props.initialVisibleMonth, 'month');

    // eslint-disable-next-line consistent-return
    handleDateChange = (date) => {
        const { blocked } = createModifiers(this.props);
        const { range, startDate, endDate, onDateSelect } = this.props;

        if (blocked && blocked(date)) return false;

        if (!range) {
            onDateSelect({ type: SelectTypes.START, value: date });
            return true;
        }

        if (!startDate) {
            onDateSelect({ type: SelectTypes.START, value: date });
            return true;
        }

        if (date.isBefore(startDate) || endDate) {
            onDateSelect({ type: SelectTypes.START, value: date });
            onDateSelect({ type: SelectTypes.END, value: null });
            return true;
        }

        if (date.isAfter(startDate)) {
            onDateSelect({ type: SelectTypes.END, value: date });
            return true;
        }
    };

    render() {
        return (
            <DayPicker
                {...this.props}
                numberOfMonths={this.props.months}
                onDayClick={this.handleDateChange}
                modifiers={createModifiers(this.props)}
                initialVisibleMonth={this.getInitialMonth}
            />
        );
    }
}