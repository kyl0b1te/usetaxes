
export interface FormattedDate {
  year: string,
  month: string,
  day: string
}

export class DateService {
  getFormattedDate(date: Date): FormattedDate {
    return {
      year: date.getFullYear().toString(),
      month: this.format(date.getMonth() + 1),
      day: this.format(date.getDate())
    };
  }

  private format(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }
}
