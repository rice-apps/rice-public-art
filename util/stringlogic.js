export function truncate(string,max_length=35){
    if (string.length > max_length) {
        return string.substring(0,max_length-3) + "..."
    } else {
        return string
    }
}