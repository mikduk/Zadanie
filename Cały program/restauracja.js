var haslo = "AKTUALNE ZAMÓWIENIE: ";
var haslo_pelne = haslo;
var zupa = "";
var drugie = "";
var dodatki = new Array();
var dodatki_wyswietl = "";
var dodatki_wybrane = [false, false, false];
var waga_drugie = 0;
var waga_dodatki = 0;
var cena_zupa = 0;
var cena_drugie = 0;
var cena_dodatki = 0;
const potrawy = [["POMIDOROWA", 8, 0], ["PIECZARKOWA", 10, 0], ["KRUPNIK", 12, 0],
 							["SCHABOWY", 15, 200], ["MIELONY", 12, 180], ["GULASZ", 20, 300],
							["KARKÓWKA", 22, 300], ["PSTRĄG", 18, 230], ["ŁOSOŚ", 16, 200],
							["ZIEMNIAKI", 5, 100], ["FRYTKI", 5, 100], ["SURÓWKA", 3, 50]];
const lista_zamowien = new Array();

function wypisz_haslo()
{
	document.getElementById("tytul").innerHTML = haslo_pelne;
	var akt_cena = cena_zupa + cena_drugie + cena_dodatki;
	var akt_waga = waga_drugie + waga_dodatki;
	document.getElementById("aktualny_stan").innerHTML = "Aktualny stan: cena - "+akt_cena+" zł, waga - "+akt_waga+" g<br>Liczba zamówień: "+lista_zamowien.length;
}

window.onload = start;

function start()
{
	var tresc_diva ="";

	for (i=0; i<12; i++)
	{
		var element = "pot" + i;
		tresc_diva = tresc_diva + '<div class="potrawa" onclick="sprawdz('+i+')" id="'+element+'">'+potrawy[i][0]+'</div>';
		if ((i+1) % 3 ==0) tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
	}

	document.getElementById("menu").innerHTML = tresc_diva;


	wypisz_haslo();
}

function zamow()
{
	name = document.getElementById("pole0").value;
	document.getElementById("komunikat").innerHTML = name+", Twoje zamówienie zostało złożone<br>";
	lista_zamowien[lista_zamowien.length]=[name, zupa, drugie.substr(2,(drugie.length-2)), dodatki];

	//powrót
	haslo_pelne = haslo;
	zupa = "";
	drugie = "";
	dodatki = [];
	dodatki_wyswietl = "";
	dodatki_wybrane = [false, false, false];
	waga_drugie = 0;
	waga_dodatki = 0;
	cena_zupa = 0;
	cena_drugie = 0;
	cena_dodatki = 0;

	for (i=0; i<12; i++){
		var element = "pot" + i;
		document.getElementById(element).style.background = "#222222";
		document.getElementById(element).style.color = "white";
		document.getElementById(element).style.border = "3px solid gray";
	}
	wypisz_haslo();
}

function inne_zupy1(nr)
{
	if (nr == 0) return 1;
	else return 0;
}

function inne_zupy2(nr)
{
	if (nr == 2) return 1;
	else return 2;
}

function sprawdz(nr)
{
	if(nr < 3)
	{
		var element = "pot" + nr;
		var element1 = "pot" + inne_zupy1(nr);
		var element2 = "pot" + inne_zupy2(nr);

		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";

		document.getElementById(element1).style.background = "#330000";
		document.getElementById(element1).style.color = "#C00000";
		document.getElementById(element1).style.border = "3px solid #C00000";

		document.getElementById(element2).style.background = "#330000";
		document.getElementById(element2).style.color = "#C00000";
		document.getElementById(element2).style.border = "3px solid #C00000";

		zupa = potrawy[nr][0];
		cena_zupa = potrawy[nr][1];
		haslo_pelne = haslo + zupa + drugie + dodatki_wyswietl;
		wypisz_haslo();
	}

	else if (nr > 2 && nr < 9)
	{
		var element = "pot"+nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";

		for (i=3; i<9; i++){
			if (i!=nr){
				element = "pot" + i;
				document.getElementById(element).style.background = "#330000";
				document.getElementById(element).style.color = "#C00000";
				document.getElementById(element).style.border = "3px solid #C00000";
			}
		}
		waga_drugie = potrawy[nr][2];
		cena_drugie = potrawy[nr][1];
		drugie = ", " + potrawy[nr][0];
		haslo_pelne = haslo + zupa + drugie + dodatki_wyswietl;
		wypisz_haslo();
	}

	else
	{
		var element = "pot" + nr;

		if (!dodatki_wybrane[nr%3]){
			document.getElementById(element).style.background = "#003300";
			document.getElementById(element).style.color = "#00C000";
			document.getElementById(element).style.border = "3px solid #00C000";

			dodatki.push(potrawy[nr][0]);
			dodatki_wyswietl += ", " + potrawy[nr][0];
			waga_dodatki += potrawy[nr][2];
			cena_dodatki += potrawy[nr][1];
			dodatki_wybrane[nr%3] = true;
		}
		else{
			dodatki_wybrane[nr%3] = false;
			document.getElementById(element).style.background = "#222222";
			document.getElementById(element).style.color = "white";
			document.getElementById(element).style.border = "3px solid gray";

			dodatki = [];
			dodatki_wyswietl = "";
			waga_dodatki = 0;
			cena_dodatki = 0;
			for (i=9; i<12; i++){
				if (dodatki_wybrane[i%3]){
						dodatki.push(potrawy[i][0]);
						dodatki_wyswietl += ", " + potrawy[i][0];
						waga_dodatki += potrawy[i][2];
						cena_dodatki += potrawy[i][1];
				}
			}
		}

		haslo_pelne = haslo + zupa + drugie + dodatki_wyswietl;
		wypisz_haslo();

	}

}

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

function zad_1()
{
	const rozw = zad1(lista_zamowien, potrawy);
	var text = "";
	for (i=0; i<rozw.length; i++){
		text += "["+rozw[i][0]+","+rozw[i][1]+","+rozw[i][2]+","+rozw[i][3]+","+rozw[i][4]+"]<br>";
	}
	document.getElementById("zadanie1").innerHTML = "zadanie 1:<br>"+text;
}

function zad_2()
{
	const rozw = zad2(lista_zamowien, potrawy);
	var text = "";
	for (i=0; i<rozw.length; i++){
		text += rozw[i][0]+" - "+rozw[i][1]+"<br>";
	}
	document.getElementById("zadanie2").innerHTML = "zadanie 2:<br>"+text;
}

function zad_3()
{
	const rozw = zad3(lista_zamowien, potrawy);
	var text = "";
	if (rozw.length>0)
		text += rozw[0];
	for (i=1; i<rozw.length; i++){
		text += ", "+rozw[i];
	}
	document.getElementById("zadanie3").innerHTML = "zadanie 3:<br>"+text;
}
