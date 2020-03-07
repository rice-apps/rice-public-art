let currentDate = new Date() 
export const currentMonth = currentDate.getMonth()
export const currentYear = currentDate.getFullYear()
export const months = ["JANUARY", "FEBRUARY", "MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"]; 

export function getYear(index){
    degrade_cutoff = -currentMonth
    upgrade_cutoff = degrade_cutoff + 12
    if (index  < degrade_cutoff) {
        return currentYear - 1
    } else if (index >= upgrade_cutoff){
        return currentYear + 1
    } else {
        return currentYear
    }
}

export function getMonth(index){
    degrade_cutoff = -currentMonth
    upgrade_cutoff = degrade_cutoff + 12
    if (index  < degrade_cutoff) {
        return index - degrade_cutoff + 12
    } else if (index >= upgrade_cutoff){
        return index - degrade_cutoff - 12
    } else {
        return index - degrade_cutoff
    } 
}

export function getMonthString(index){
    return months[getMonth(index)];
}