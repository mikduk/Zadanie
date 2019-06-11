//przykładowe dane:
const potrawy = [["POMIDOROWA", 8, 0], ["PIECZARKOWA", 10, 0], ["KRUPNIK", 12, 0],
 							["SCHABOWY", 15, 200], ["MIELONY", 12, 180], ["GULASZ", 20, 300],
							["KARKÓWKA", 22, 300], ["PSTRĄG", 18, 230], ["ŁOSOŚ", 16, 200],
							["ZIEMNIAKI", 5, 100], ["FRYTKI", 5, 100], ["SURÓWKA", 3, 50]];

const lista_zamowien = [["ADAM", "POMIDOROWA", "MIELONY", ["FRYTKI", "SURÓWKA"]],
                        ["ANNA", "KRUPNIK", "ŁOSOŚ", ["FRYTKI", "SURÓWKA"]],
                        ["MIKOŁAJ", "KRUPNIK", "SCHABOWY", ["ZIEMNIAKI", "FRYTKI"]]];

//funkcje:
function zad1(lista_zam, lista_menu){

	var liczba_zamowien = lista_zam.length;
	var kopia_listy = lista_zam.slice();

	//dodanie ceny
	for (i=0; i<liczba_zamowien; i++){
		var cena = 0;
		for (j=1; j<4; j++){
			if (j!=3){
				for (k=0; k<lista_menu.length; k++)
					if (lista_zam[i][j]==lista_menu[k][0]){
						cena += lista_menu[k][1];
						break;
					}
			}
			else{ // j==3
				for (k=0; k<lista_zam[i][j].length; k++)
					for (l=0; l<lista_menu.length; l++){
						if (lista_zam[i][j][k]==lista_menu[l][0]){
							cena += lista_menu[l][1];
							break;
						}
					}
			}
		}
		kopia_listy[i][4] = cena;
	}

	//sortowanie
	for (i=0; i<liczba_zamowien; i++){
		var min = kopia_listy[i][4];
		var ind = i;
		for (j=i+1; j<liczba_zamowien; j++)
			if (kopia_listy[j][4] < min){
				min = kopia_listy[j][4];
				ind = j;
			}
		var temp = kopia_listy[i];
		kopia_listy[i] = kopia_listy[ind];
		kopia_listy[ind] = temp;
		}

	console.log("zad1", kopia_listy);
	return kopia_listy;
}

function zad2(lista_zam, lista_menu){

	var liczba_zamowien = lista_zam.length;
	const zamowienia = new Array();
	const zamowienia_liczba = new Array();

	for (i=0; i<liczba_zamowien; i++){
		var nie_wystapilo = true;

		if (zamowienia.indexOf(lista_zam[i][2]) != -1){
				zamowienia_liczba[zamowienia.indexOf(lista_zam[i][2])]++;
				nie_wystapilo = false;
			}
		if (nie_wystapilo){
			zamowienia[zamowienia.length] = lista_zam[i][2];
			zamowienia_liczba[zamowienia_liczba.length] = 1;
		}
	}

	const statystki = Array();
	for (i=0; i<zamowienia.length; i++)
		statystki[i] = [zamowienia[i], zamowienia_liczba[i]];
	console.log("zad2", statystki);
	return statystki;
}

function zad3(lista_zam, lista_menu){

	var liczba_zamowien = lista_zam.length;
	const imiona = Array();

	for (i=0; i<liczba_zamowien; i++){
		var waga = 0;
		for (j=1; j<4; j++){
			if (j!=3){
				for (k=0; k<lista_menu.length; k++)
					if (lista_zam[i][j]==lista_menu[k][0]){
						waga += lista_menu[k][2];
						break;
					}
			}
			else{ // j==3
				for (k=0; k<lista_zam[i][j].length; k++)
					for (l=0; l<lista_menu.length; l++){
						if (lista_zam[i][j][k]==lista_menu[l][0]){
							waga += lista_menu[l][2];
							break;
						}
					}
			}
		}
		if (waga > 400 && imiona.indexOf(lista_zam[i][0]) == -1)
			imiona[imiona.length] = lista_zam[i][0];
	}

	console.log("zad3", imiona);
	return imiona;
}
