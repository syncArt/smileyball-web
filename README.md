![Title](https://eo3rd-7qaaa-aaaan-qmn6q-cai.icp0.io/ptt/ptt-title.png "Title")

MVP - stworzenie aplikacji umożliwiającej dodanie konkursu na najlepszy utwór pasujący do opisu składającej się z 5 etapów. 

Etap tworzenia konkursu
Etap dodawania piosenek do lobby
Etap wybierania finałowej 15 do konkursu właściwego przez Jury 
Etap głosowania właściwego
Etap wyników


1. Etap tworzenia konkursu
Twórcą konkursu może być jedynie administrator. Do stworzenia konkursu wymagane są: tytuł i opis. Administrator wypełnia odpowiednie pola w formularzu a następnie po wciśnięciu przycisku Stwórz dodawany jest wpis do Bazy danych dla tabeli Contest z pobranymi danymi. Dodatkowo dopisana jest informacja o dacie stworzenia konkursu oraz o principal_id twórcy konkursu. Każdy konkurs ma swój unikalny identyfikator. Stworzenie konkursu nie jest jednoznaczne z początkiem trwania konkursu. Do rozpoczęcia konkursu administrator musi zmienić status konkursu z WAITING na LOBBY. W LOBBY znajdować się może jedynie jeden konkurs w jednym momencie. 


2. Etap dodawania piosenek do lobby
Etap ten jest pierwszym etapem konkursu dla użytkownika docelowego. W trakcie jego trwania dodawane są piosenki biorące udział w konkursie. Na tym etapie użytkownik końcowy może również sprawdzić ile piosenek zostało dodanych do lobby. Dodawanie piosenek odbywa się poprzez skopiowanie i wklejenie linku z piosenką do wyznaczonego pola (Input) a następnie wciśnięcie przycisku z napisem Dodaj. Po wklejeniu linku automatycznie wczytywane są dane ze Spotify Api tak że użytkownik widzi okładkę (cover_image) oraz dodatkowe informacje o utworze takie jak: band_name, song_name, popularity dla danego utworu. Po kliknięciu Dodaj następuje procedura identyfikacji piosenki w Bazie danych dla tabeli Songs. Jeśli utwór już istnieje w bazie zostanie pobrany identyfikator utworu, jeśli nie istnieje zostanie dodany wpis z danymi utworu i po dodaniu zostanie pobrany identyfikator. Po pobraniu identyfikatora następuje wpis do Bazy danych dla tabeli Contest z identyfikatorem utworu, principal_id będącym identyfikatorem użytkownika dodającego utwór oraz datą dodania utworu do konkursu. Nie można powtarzać utworów dla tego samego konkursu. Administrator może zakończyć etap w każdym momencie zmieniając status konkursu z LOBBY na JURY

3. Etap wybierania finałowej 15 do konkursu właściwego przez Jury
Na tym etapie użytkownicy którzy dodali piosenki muszą uzbroić się w cierpliwość ponieważ jedynie Jury ma możliwość korzystania z serwisu. Dla użytkowników końcowych widnieje jedynie napis że trwa aktualnie wybór najlepszej 15 utworów. Użytkownicy z ustawioną rolą “Jury” mają możliwość dokonania subiektywnego wyboru najlepszej 15 utworów w odniesieniu do tytułu i opisu konkursu. Poprzez zaznaczenie utworu i wpisanie cyfry od 1-10 dokonują oceny. Oceny nie mogą się powtarzać a Jury musi przyznać wszystkie możliwie dostępne oceny, a więc każdy z Jury musi wybrać dokładnie 10 piosenek i ułożyć je wedle swojej hierarchii oceny. Po wydaniu oceny odblokowuje się przycisk z napisem Wyślij i Jury ma możliwość w ten sposób wysłać swoje wyniki. Każdy konkurs wymaga oceny przez 3 Jury. To znaczy że w momencie kiedy trzecia osoba z Jury dokonała oceny następuje automatycznie przerzucenie konkursu do etapu następnego. Każde wysłanie oceny przez Jury skutkuje wpisem informacji o principal_id Jury oraz wartości VOTE do Bazy danych dla tabeli Contest. Wpis ten dotyczy struktury gdzie przechowywane są utwory z lobby - każda ocena zostaje dopisana do odpowiedniej piosenki z lobby. Kiedy ostatnia możliwa osoba z Jury odda swój głos zliczane są wszystkie VOTE dla piosenek z Lobby i następuje przekopiowanie piosenek z odpowiednią ilością VOTE do struktury danych dla konkursu właściwego (etap 4). W konkursie głównym znajdzie się więc 15 piosenek z największą ilością głosów. Jeśli piosenki mają taką samą ilość głosów to procesem losowania zostaną wylosowane brakujące piosenki. Poza tym każda osoba z Jury która dokonała oceny dodawana jest do bazy danych dla tabeli Contest pola Jury z informacją principal_id Jury. Na tej podstawie można będzie później sprawdzić aktywność Jury i następnie podejmować odpowiednie działania co do aktywności. 

4. Etap głosowania właściwego
Etap ten załączany jest automatycznie po tym jak 3 osoby z Jury dokonały swoich ocen na najlepsze 10 piosenek. Sama logika głosowania przeniesiona jest z głosowania przez Jury tak więc użytkownicy wybierając piosenkę i wpisując wartość od 0-10 dokonują wyboru najlepszej 10 utworów. Etap ten trwa do momentu aż administrator zmieni status konkursu z LIVE na FINISHED. Wówczas głosowanie jest zamknięte i następuje wyłonienie zwycięzców (etap 5).

5. Etap wyników
Po zakończeniu etapu 4 następuje automatyczne podliczenie głosów i wpisanie odpowiednio 10 najlepszych piosenek do Bazy danych dla tabeli Contest w polu results. Wpisywane są dane o pozycji utworu w konkursie, ilości oddanych głosów na dany utwór, średniej ocenie utworu, użytkownikach (principal_id) którzy oddali najwyższą ocenę na dany utwór a także osobie (principal_id) która zakończyła konkurs i dacie zakończenia. 


