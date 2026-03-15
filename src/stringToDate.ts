export default function stringToDate(texto: string): Date {
    const [dia, mes, ano] = texto.split("/").map(Number);
    const [data, tempo] = texto.split(" ");
    const [hora, minuto] = tempo.split(":").map(Number);
    return new Date(ano, mes - 1, dia, hora, minuto);



}