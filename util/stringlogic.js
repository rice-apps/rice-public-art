export function truncate(string){
    if (string.length > 35) {
        return string.substring(0,34) + "..."
    } else {
        return string
    }
}