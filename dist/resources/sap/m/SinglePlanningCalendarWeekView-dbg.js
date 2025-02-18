/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'./library',
	'./SinglePlanningCalendarView',
	'sap/ui/core/LocaleData',
	'sap/ui/unified/calendar/CalendarDate',
	'sap/ui/unified/calendar/CalendarUtils',
	'sap/ui/core/Configuration',
	"sap/ui/core/date/CalendarUtils",
	'sap/ui/core/Locale'
],
function (library, SinglePlanningCalendarView, LocaleData, CalendarDate, CalendarUtils, Configuration, CalendarDateUtils, Locale) {
	"use strict";

	/**
	 * Constructor for a new <code>SinglePlanningCalendarWeekView</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 *
	 * Represents a week view of the {@link sap.m.SinglePlanningCalendar}.
	 * The purpose of the element is to decouple the view logic from parent control <code>SinglePlanningCalendar</code>.
	 *
	 * @extends sap.m.SinglePlanningCalendarView
	 *
	 * @author SAP SE
	 * @version 1.120.0
	 *
	 * @constructor
	 * @public
	 * @since 1.61
	 * @alias sap.m.SinglePlanningCalendarWeekView
	 */
	var SinglePlanningCalendarWeekView = SinglePlanningCalendarView.extend("sap.m.SinglePlanningCalendarWeekView", {
		metadata: {

			library: "sap.m"

		}
	});

	/**
	 * Returns after how much entities is the next/previous startDate of the <code>sap.m.SinglePlanningCalendar</code> after
	 * navigating forward or backwards.
	 *
	 * @return {int} the number of entities to be skipped by scrolling
	 * @override
	 * @public
	 */
	SinglePlanningCalendarWeekView.prototype.getEntityCount = function () {
		return 7;
	};

	/**
	 * Should return a number of entities until the next/previous startDate of the
	 * <code>sap.m.SinglePlanningCalendar</code> after navigating forward or backwards.
	 *
	 * @return {int} the number of entities to be skipped by scrolling
	 */
	SinglePlanningCalendarWeekView.prototype.getScrollEntityCount = function () {
		return 7;
	};

	/**
	 * Calculates the startDate which will be displayed in the <code>sap.m.SinglePlanningCalendar</code> based
	 * on a given date.
	 *
	 * @param {object} oStartDate the given date
	 * @return {object} the startDate of the view
	 * @override
	 * @public
	 */
	SinglePlanningCalendarWeekView.prototype.calculateStartDate = function (oStartDate) {

		var sLocale = Configuration.getFormatSettings().getFormatLocale().toString();

		var oLocaleData = LocaleData.getInstance(Configuration.getFormatSettings().getFormatLocale()),
			iFirstDayOfWeek = this.getFirstDayOfWeek();

			if (iFirstDayOfWeek < 0 || iFirstDayOfWeek > 6) {
				var oWeekConfigurationValues = CalendarDateUtils.getWeekConfigurationValues(this.getCalendarWeekNumbering(), new Locale(sLocale));

				if (oWeekConfigurationValues) {
					iFirstDayOfWeek = oWeekConfigurationValues.firstDayOfWeek;
				} else {
					iFirstDayOfWeek = oLocaleData.getFirstDayOfWeek();
				}
			}

		oStartDate.setDate(oStartDate.getDate() - oStartDate.getDay() + iFirstDayOfWeek);
		return CalendarUtils
			._getFirstDateOfWeek(CalendarDate.fromLocalJSDate(oStartDate), {
				firstDayOfWeek: iFirstDayOfWeek,
				minimalDaysInFirstWeek: oLocaleData.getMinimalDaysInFirstWeek()
			})
			.toLocalJSDate();
	};

	return SinglePlanningCalendarWeekView;

});