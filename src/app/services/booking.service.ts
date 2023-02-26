import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBooking } from '../interfaces/ibooking';
import { Booking } from '../models/booking';
import {map} from 'rxjs/operators'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  addBooking(booking: Booking){
    let headers = new HttpHeaders()
    headers.set('Content-type', 'application/json')

    const url = 'https://booking-app-77112.firebaseio.com/bookings.json'
    const body = JSON.stringify(booking.getData())

    return this.http.post(url, body, {headers})
  }

  getBookings(): Observable<IBooking[]>{

    let headers = new HttpHeaders()
    headers.set('Content-type', 'application/json')

    const url = 'https://booking-app-77112.firebaseio.com/bookings.json'

    return this.http.get<IBooking[]>(url, {headers}).pipe(
      map(data => {
        let bookings = []

        const today = new Date()
        if(data){
          console.log(data)
          _.forEach(_.keys(data), key => {
            const booking = new Booking(data[key])
            const bookingDate = new Date(booking.date)

            bookingDate >= today && bookings.push(booking)
          })
        }

        // bookings = _.orderBy(bookings, b => b.date)
        bookings.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        return bookings
      })
    )
  }
}
