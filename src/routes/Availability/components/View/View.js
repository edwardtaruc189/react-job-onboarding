/* eslint-disable no-console */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import BackgroundPaper from 'components/BackgroundPaper';
import breadcrumbsCreator from 'components/BreadCrumbs';

function Home({ classes, availability, updateAvailability, history, firebase, showError }) {
	const bcArr = [
		{
			label: 'Home',
			link: '/home'
		},
		{
			label: 'Interview Availability'
		}
	];
	const breadCrumbs = breadcrumbsCreator(bcArr, history);

	// mark down the time outside of handleCreate so it syncs with the
	// current time line on the calendar component
	const currentTime = new Date().getTime();

	let date = new Date();
	date.setDate(date.getDate() + 30);

	const handleCreate = ({ start, end }) => {
		if (end < currentTime || start < currentTime) {
			showError('Cannot update availability in the past.');
			return;
		}

		const events = [
			...availability,

			{
				// This ID is required immediately, don't have time to wait for the server to generate it
				id: firebase.database.ServerValue.TIMESTAMP,
				start: start.getTime(),
				end: end.getTime(),
				title: 'Free for Interviews'
			}
		];
		updateAvailability(events);
	};

	const handleDelete = event => {
		const del = window.confirm('Delete this availability slot?');
		if (del) {
			const events = [...availability];
			events.splice(events.findIndex(({ id }) => id === event.id), 1);
			updateAvailability(events);
		}
	};

	const calendarEvents = availability.map(({ start, end, ...others }) => ({
		start: new Date(start),
		end: new Date(end),
		...others
	}));

	return (
		<BackgroundPaper square={false}>
			{breadCrumbs}
			<Box component="div" className={classes.captionArea}>
				<Typography variant="h4">Interview Availability</Typography>
				<Typography variant="body1" className={classes.captionText}>
					Please indicate your availability for your interviews below.
				</Typography>
			</Box>

			<div className={classes.calendarRoot}>
				<Calendar
					selectable
					localizer={momentLocalizer(moment)}
					events={calendarEvents}
					views={[Views.WORK_WEEK, Views.AGENDA]}
					defaultView={Views.WORK_WEEK}
					defaultDate={new Date()}
					onSelectSlot={handleCreate}
					onSelectEvent={handleDelete}
				/>
			</div>
		</BackgroundPaper>
	);
}

Home.propTypes = {
	classes: PropTypes.object.isRequired // from enhancer (withStyles)
};

Home.defaultProps = {
	availability: []
};

export default Home;
