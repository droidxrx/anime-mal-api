export default class utils_anime {
    private months = ["winter", "spring", "summer", "fall"];

    getSeasonForNumberMonth(month: number) {
        if (month < 3) return "winter";
        if (month > 2 && month < 6) return "spring";
        if (month > 5 && month < 9) return "summer";
        return "fall";
    }
    checkIfMonthIsValid(month: string) {
        if (this.months.indexOf(month) != -1) {
            return true;
        } else {
            return false;
        }
    }
}
