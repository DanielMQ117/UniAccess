"use client";

export function extractData(input: string) {
	const regex = /^(.{14})S<([^<]+)<([^<]+)<([^<]*)<([^<]+)<(\d{2}\/\d{2}\/\d{4})/;
	const match = RegExp(regex).exec(input);

	console.log(input);

	if (!match) {
		return null;
	}

	const [, first14, lastName, secondLastName, firstNamePart1, city, birthDate] = match;

	// Separar el nombre en dos partes si es necesario
	const firstNameParts = firstNamePart1.split(" ");
	const firstName = firstNameParts.length > 1 ? firstNameParts.slice(0, 2).join(" ") : firstNameParts[0] || "";
	const secondName = firstNameParts.length > 2 ? firstNameParts.slice(1).join(" ") : "";

	return {
		first14, // Primeros 14 caracteres
		firstName, // Primer nombre (o ambos si hay 2)
		secondName, // Segundo nombre (si existe)
		lastName, // Primer apellido
		secondLastName, // Segundo apellido (si existe)
		city, // Ciudad
		birthDate, // Fecha de nacimiento
	};
}

/* la funcion de extraer datos está mala, mejorala sabiendo que el string tiene la siguiente forma:

16343406<1234567891234P<MAYORGA<QUINTANA<DANIEL<LEON<05/05/2004 00:00<MASCULINO<25/02/2019 10:07<25/02/2029

la primera seccion no me interesa: 16343406
inicia desde: 1234567891234P
termina en 05/05/2004 */
