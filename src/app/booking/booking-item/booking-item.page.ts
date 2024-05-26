import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import dayjs from 'dayjs';
import { first } from 'rxjs';

import { BoardGame } from '../../board-game/classes/board-game.class';
import { DateUtilsService } from '../../common/services/date-utils.service';
import { UtilsService } from '../../common/services/utils.service';
import { BreadcrumbDataDto } from '../../shared-modules/components/breadcrumb/dtos/breadcrumb-data.dto';
import { User } from '../../user/classes/user.class';
import { BookingService } from '../booking.service';
import { BookableSpace } from '../classes/bookable-space.class';
import { Booking } from '../classes/booking.class';

@Component({
  selector: 'app-booking-item',
  templateUrl: 'booking-item.page.html',
  styleUrls: ['booking-item.page.scss'],
})
export class BookingItemPage implements OnInit {
  id: string;
  bookingStatusList = ['Pendiente', 'Activa', 'Finalizada', 'Cancelada'];
  bookingForm = this.fromBuilder.group({
    date: [this.dateUtilsService.daysJsUtc().toDate(), [Validators.required]],
    startOf: [
      this.dateUtilsService.daysJsUtc().toDate(),
      [Validators.required],
    ],
    endOf: [this.dateUtilsService.daysJsUtc().toDate(), [Validators.required]],
    participants: [
      1,
      [Validators.required, Validators.min(1), Validators.max(8)],
    ],
    bookableSpace: [null || new BookableSpace(), [Validators.required]],
    boardGame: [null || new BoardGame(), [Validators.required]],
    user: [null || new User(), [Validators.required]],
    status: ['Pendiente', [Validators.required]],
  });
  disableHoursTimePicker = () => [0, 1, 2, 3, 4, 5, 6, 7, 22, 23];
  availableBookableSpaces: BookableSpace[];
  availableBoardGames: BoardGame[];
  breadCrumbDataList: BreadcrumbDataDto[] = [
    { title: 'Reservas', routes: ['bookings'] },
  ];

  constructor(
    private route: ActivatedRoute,
    private fromBuilder: FormBuilder,
    private bookingService: BookingService,
    protected utilsService: UtilsService,
    private dateUtilsService: DateUtilsService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.id = idParam;
    if (this.id !== 'new') {
      this.bookingService
        .getById(this.id)
        .pipe(first())
        .subscribe((booking: Booking) => {
          this.breadCrumbDataList = this.breadCrumbDataList.concat({
            title: `Editar: Reserva de ${
              booking.user?.email
            } - ${this.dateUtilsService.toFullDateFormat(
              booking.startOf
            )} De ${this.dateUtilsService.toHHmmFormat(
              booking.startOf
            )} a ${this.dateUtilsService.toHHmmFormat(booking.endOf)}`,
          });

          const startOfWithTzOffset =
            this.dateUtilsService.dateWithTimezoneOffset(booking.startOf);
          const endOfWithTzOffset =
            this.dateUtilsService.dateWithTimezoneOffset(booking.endOf);

          this.bookingForm.patchValue({
            ...booking,
            date: startOfWithTzOffset,
            startOf: startOfWithTzOffset,
            endOf: endOfWithTzOffset,
          });

          this.getBookingSelectablesData();
        });
      return;
    }

    this.breadCrumbDataList = this.breadCrumbDataList.concat({
      title: 'Nueva',
    });
    this.bookingForm.patchValue(new Booking());
    this.getBookingSelectablesData();
  }

  datePickerCheckOnClose(isOpen: boolean) {
    if (isOpen) {
      return;
    }

    const bookingFormValue = this.bookingForm.value;
    if (
      !bookingFormValue.startOf ||
      !bookingFormValue.endOf ||
      !bookingFormValue.date
    ) {
      return;
    }

    const dateNumb = dayjs(bookingFormValue.date).get('date');
    this.bookingForm.controls.startOf.patchValue(
      this.dateUtilsService.dayjsSetDate(bookingFormValue.startOf, dateNumb)
    );

    this.bookingForm.controls.endOf.patchValue(
      this.dateUtilsService.dayjsSetDate(bookingFormValue.endOf, dateNumb)
    );

    this.getBookingSelectablesData();
  }

  startOfTimePickerCheckOnClose(isOpen: boolean) {
    if (isOpen) {
      return;
    }

    let startOfDayjs = dayjs(this.bookingForm.controls.startOf.value);
    this.checkMinutesTimePicker(startOfDayjs, 'startOf');

    const startDayHours = startOfDayjs.get('h');
    if (startDayHours < 8) {
      this.bookingForm.controls.startOf.patchValue(
        startOfDayjs.set('h', 8).toDate()
      );
    }

    if (
      startDayHours > 21 ||
      (startDayHours === 21 && startOfDayjs.get('m') > 0)
    ) {
      this.bookingForm.controls.startOf.patchValue(
        startOfDayjs.set('h', 21).set('m', 0).toDate()
      );
    }

    startOfDayjs = dayjs(this.bookingForm.controls.startOf.value);
    const endOfDayjs = dayjs(this.bookingForm.controls.endOf.value);
    if (endOfDayjs.diff(startDayHours, 'minutes') < 30) {
      return;
    }

    this.bookingForm.controls.endOf.patchValue(
      startOfDayjs.add(30, 'minutes').toDate()
    );
  }

  endOfTimePickerCheckOnClose(isOpen: boolean) {
    if (isOpen) {
      return;
    }

    let endOfDayjs = dayjs(this.bookingForm.controls.endOf.value);
    this.checkMinutesTimePicker(endOfDayjs, 'endOf');

    const endOfDayjsHours = endOfDayjs.get('h');
    const endOfDayjsMinutes = endOfDayjs.get('m');

    if (
      endOfDayjsHours < 8 ||
      (endOfDayjsHours === 8 && endOfDayjsMinutes < 30)
    ) {
      this.bookingForm.controls.endOf.patchValue(
        endOfDayjs.set('h', 8).set('m', 30).toDate()
      );
    }

    if (
      endOfDayjsHours > 21 ||
      (endOfDayjsHours === 21 && endOfDayjsMinutes > 30)
    ) {
      this.bookingForm.controls.endOf.patchValue(
        endOfDayjs.set('h', 21).set('m', 30).toDate()
      );
    }

    endOfDayjs = dayjs(this.bookingForm.controls.endOf.value);
    const startOfDayjs = dayjs(this.bookingForm.controls.startOf.value);
    if (endOfDayjs.diff(startOfDayjs, 'minutes') >= 30) {
      return;
    }

    this.bookingForm.controls.startOf.patchValue(
      endOfDayjs.subtract(30, 'minutes').toDate()
    );

    this.getBookingSelectablesData();
  }

  checkMinutesTimePicker(
    dayjsValue: dayjs.Dayjs,
    controlName: 'startOf' | 'endOf'
  ) {
    const minutes = dayjsValue.get('m');
    if (minutes === 0 || minutes % 5 === 0) {
      return;
    }

    this.bookingForm.controls[controlName].patchValue(
      dayjsValue.set('m', 0).toDate()
    );
  }

  getBookingFormUser() {
    if (!this.bookingForm || !this.bookingForm.value.user) {
      return [];
    }

    return [this.bookingForm.value.user];
  }

  updatedUserList(users: User[]) {
    this.bookingForm.patchValue({ user: users[0] });
  }

  getBookingSelectablesData() {
    this.getAvailableBookingSpaceBetweenDates();
    this.getAvailableBoardGamesBetweenDates();
  }

  getAvailableBookingSpaceBetweenDates() {
    const bookingFormValue = this.bookingForm.value;
    if (
      !bookingFormValue.startOf ||
      !bookingFormValue.endOf ||
      !bookingFormValue.participants
    ) {
      return;
    }

    (this.id === 'new'
      ? this.bookingService.getAvailableBookingSpaceBetweenDates(
          this.utcLocalToDate(bookingFormValue.startOf),
          this.utcLocalToDate(bookingFormValue.endOf),
          bookingFormValue.participants
        )
      : this.bookingService.getAvailableBookingSpaceBetweenDatesOnModifyById(
          this.utcLocalToDate(bookingFormValue.startOf),
          this.utcLocalToDate(bookingFormValue.endOf),
          bookingFormValue.participants,
          this.id
        )
    )
      .pipe(first())
      .subscribe((res) => {
        this.availableBookableSpaces = res;
        this.checkIfBookingPropertyValueExitsInList(res, 'bookableSpace');
      });
  }

  getBookingFormBookableSpace() {
    if (!this.bookingForm || !this.bookingForm.value.bookableSpace) {
      return [];
    }

    return [this.bookingForm.value.bookableSpace];
  }

  updatedBookableSpacesList(bookableSpaces: BookableSpace[]) {
    this.bookingForm.patchValue({ bookableSpace: bookableSpaces[0] });
  }

  getAvailableBoardGamesBetweenDates() {
    const bookingFormValue = this.bookingForm.value;
    if (!bookingFormValue.startOf || !bookingFormValue.endOf) {
      return;
    }

    (this.id === 'new'
      ? this.bookingService.getAvailableBoardGamesBetweenDates(
          this.utcLocalToDate(bookingFormValue.startOf),
          this.utcLocalToDate(bookingFormValue.endOf)
        )
      : this.bookingService.getAvailableGamesBetweenDatesOnModifyById(
          this.utcLocalToDate(bookingFormValue.startOf),
          this.utcLocalToDate(bookingFormValue.endOf),
          this.id
        )
    )
      .pipe(first())
      .subscribe((res) => {
        this.availableBoardGames = res;
        this.checkIfBookingPropertyValueExitsInList(res, 'boardGame');
      });
  }

  checkIfBookingPropertyValueExitsInList(
    itemArray: any,
    propertyTitle: 'boardGame' | 'bookableSpace'
  ) {
    const bookingFromValue = this.bookingForm.value;
    if (!bookingFromValue[propertyTitle]) {
      return;
    }

    const exits = itemArray.some(
      (item: any) => item.id === bookingFromValue[propertyTitle]?.id
    );

    if (exits) {
      return;
    }

    this.bookingForm.patchValue({ [propertyTitle]: undefined });
  }

  getBookingFormBoardGame() {
    if (!this.bookingForm || !this.bookingForm.value.boardGame) {
      return [];
    }

    return [this.bookingForm.value.boardGame];
  }

  updatedBoardGamesList(boardGames: BoardGame[]) {
    this.bookingForm.patchValue({ boardGame: boardGames[0] });
  }

  upsertBooking() {
    const booking = { ...this.bookingForm.value } as Booking;
    booking.startOf = this.utcLocalToDate(booking.startOf);
    booking.endOf = this.utcLocalToDate(booking.endOf);

    if (this.id !== 'new') {
      this.bookingService
        .updateById(this.id, booking)
        .pipe(first())
        .subscribe(() => {
          this.utilsService.displayToast(
            'La reserva se ha modificado correctamente',
            'success'
          );
          this.utilsService.navigateTo(['bookings']);
        });
      return;
    }

    this.bookingService
      .create(booking)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'La reserva se ha generado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['bookings']);
      });
  }

  deleteBooking() {
    this.bookingService
      .deleteById(this.id)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'La reserva se ha eliminado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['bookings'], true);
      });
  }

  utcLocalToDate(date: Date) {
    return this.dateUtilsService.daysJsUtcLocal(date).toDate();
  }
}
