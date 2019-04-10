
export class QuarterService {
  static getQuarter(date: Date) {
    const year = date.getFullYear();
    // Jan-Mar
    if (date >= new Date(year, 0, 1) && date <= new Date(year, 2, 31)) {
      return 'I';
    }
    // Apr-Jun
    if (date >= new Date(year, 3, 1) && date <= new Date(year, 5, 30)) {
      return 'II';
    }
    // Jul-Sep
    if (date >= new Date(year, 6, 1) && date <= new Date(year, 8, 30)) {
      return 'III';
    }
    return 'IV';
  }
}
