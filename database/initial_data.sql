INSERT INTO public.uloge(
	id_uloge, naziv_uloge)
	VALUES (1, 'Admin');
	
INSERT INTO public.korisnici(
	id_korisnika, email, sifra, korisnicko_ime, id_uloge)
	VALUES 
	(1, 'root@email.com', '$2a$12$4VHqKKIIBaaSimx0VK35PO7j9lQIC5F8kZdCeTkYODrLq/uHYT27W', 'root', 1);