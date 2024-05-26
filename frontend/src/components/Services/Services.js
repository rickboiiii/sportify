import "./Services.css"
const Services = () => {
    return(
        <>
            <section className={"services"}>
                <div className={"services-title"}>
                    <h1>USLUGE</h1>
                </div>
                <div className={"services-text"}>
                    <div className="hover-container">
                        <h2 className="title">1. Personalizirane preporuke termina i terena</h2>
                        <p className="hidden-paragraph">Pronađite savršen termin i teren za vašu igru s lakoćom! Naša aplikacija analizira vaše vještine i preferencije kako bi vam preporučila najbolje opcije u vašoj blizini. Više ne morate gubiti vrijeme tražeći – mi to radimo za vas.</p>
                    </div>
                    <div className="hover-container">
                        <h2 className="title">2. Ocjenjivanje i recenzije korisnika i terena</h2>
                        <p className="hidden-paragraph">Povećajte svoje povjerenje u kvalitetu naših usluga. Naša funkcionalnost ocjenjivanja omogućava vam da pregledate recenzije drugih korisnika o terenima i igračima. Saznajte ko su najbolji suigrači i gdje su najbolji tereni, kako bi svaki vaš termin bio savršen.</p>
                    </div>
                    <div className="hover-container">
                        <h2 className="title">3. Organizacija i praćenje turnira</h2>
                        <p className="hidden-paragraph">Želite li se natjecati i dokazati svoje vještine? Naša aplikacija vam omogućava jednostavno kreiranje i praćenje turnira. Pratite rezultate u stvarnom vremenu i gledajte kako vaš tim napreduje kroz natjecanje. Postanite dio lokalne sportske zajednice i uživajte u uzbuđenju turnira.</p>
                    </div>
                    <div className="hover-container">
                        <h2 className="title">4. Komunikacija sa prijateljima</h2>
                        <p className="hidden-paragraph">Ostanite povezani sa svojom sportskom ekipom i prijateljima. Naša aplikacija nudi integrirani chat, grupne razgovore i feed za objavljivanje postova, slika i videa. Dijelite svoja sportska postignuća, organizirajte termine i budite u toku s najnovijim događanjima – sve na jednom mjestu.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;