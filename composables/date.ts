export function getDate(date_string: string) {
    const date_split = date_string.split("/");
  
    const date = new Date(+date_split[2], +date_split[1] - 1, +date_split[0]);
  
    return date;
  }