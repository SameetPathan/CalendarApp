import { Component } from '@angular/core';
import { Appointment } from '../appointment.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  appointments: Appointment[] = [];

  newAppointmentTitle: string = '';
  newAppointmentDate: Date | null = null;

  addAppointment() {
    const id = this.appointments.length + 1;
    const appointment: Appointment = {
      id,
      title: this.newAppointmentTitle,
      date: this.newAppointmentDate !== null ? new Date(this.newAppointmentDate) : new Date()
    };
    this.appointments.push(appointment);

    // Reset the input fields
    this.newAppointmentTitle = '';
    this.newAppointmentDate = null;
  }

  deleteAppointment(appointment: Appointment) {
    this.appointments = this.appointments.filter(a => a.id !== appointment.id);
  }

  moveAppointment(event: CdkDragDrop<Appointment[], Appointment[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

   // Function to generate an array of dates for the calendar view
   generateCalendarDates(): Date[] {
    const dates: Date[] = [];
    const today = new Date();
    const numDays = 120; // Number of days to display in the calendar

    for (let i = 0; i < numDays; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      dates.push(date);
    }

    return dates;
  }
  
  getAppointmentsForDate(date: Date): Appointment[] {
    if (!date) {
      return [];
    }
    
    return this.appointments.filter(appointment => {
      if (appointment.date instanceof Date) {
        return this.isSameDate(appointment.date, date);
      }
      return false;
    });
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

}
