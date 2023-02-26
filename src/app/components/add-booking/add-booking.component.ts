import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddBookingComponent implements OnInit {

  @ViewChild("modal_success", {static: false}) modal_success
  @ViewChild("modal_exists", {static: false}) modal_exists

  public options: string[]
  public locale: any
  public today: Date
  public formBooking: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private modalService: NgbModal
  ) { 
    this.options = ['haircut', 'hair-coloring', 'hair-washing', 'hair-straightening']
    if(navigator.language === 'es-ES'){
      this.locale = {
        firstDayOfWeek: 1,
        dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        dayNamesMin: [ "D","L","M","X","J","V","S" ],
        monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
        today: 'Hoy',
        clear: 'Borrar'
      }
    }else{
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
        monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      };
    }

    this.today = new Date()

    if(this.today.getMinutes() < 30){
      this.today.setMinutes(30)
    }else{
      this.today.setHours(this.today.getHours() + 1)
      this.today.setMinutes(0)
    }

    this.today.setSeconds(0)
    this.today.setMilliseconds(0)

    this.formBooking = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      date: new FormControl(this.today),
      service: new FormControl(this.options[0])
    })
  }

  ngOnInit(): void {
  }

  addBooking(){
    const booking = new Booking(this.formBooking.value)

    this.bookingService.getBookings().subscribe(bookings => {
      console.log(bookings)

      const bookingFound = _.find(bookings, b => {
        const date = new Date(b.date)
        const dateNewBooking = new Date(booking.date)
        return date.getTime() === dateNewBooking.getTime()
      })

      if(bookingFound){
        this.modalService.open(this.modal_exists)  
      }else{
        this.bookingService.addBooking(booking).subscribe(id => {
          console.log('se ha insertado con el siguiente id', id)
    
          this.modalService.open(this.modal_success)
        },error => {
          console.log('Se ha producido un error' + error)
        })
      }
    })
  }

  get name(){
    return this.formBooking.get('name')
  }

}
