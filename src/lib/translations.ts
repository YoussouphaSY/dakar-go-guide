import type { LangId } from "@/data/appMock";


const ORDER: LangId[] = ["FR", "EN", "ES", "AR", "WO"];

type Entry = [string, string, string, string, string];

const D = {
  /* — Navigation basse — */
  "nav.home": ["Accueil", "Home", "Inicio", "الرئيسية", "Dalal"],
  "nav.programme": ["Programme", "Schedule", "Programa", "البرنامج", "Prograam"],
  "nav.agenda": ["Agenda", "Agenda", "Agenda", "الأجندة", "Ajanda"],
  "nav.mobilite": ["Mobilité", "Mobility", "Movilidad", "التنقل", "Tukki"],
  "nav.profil": ["Profil", "Profile", "Perfil", "الملف", "Profil"],

  /* — Accueil — */
  "home.greeting": ["Bonjour ", "Hello ", "Hola ", "مرحباً ", "Nanga def "],
  "home.liveUpcoming": ["En direct & à venir", "Live & upcoming", "En directo y próximos", "مباشر وقادم", "Ci saa si ak li ñëw"],
  "home.seeAll": ["Tout voir", "See all", "Ver todo", "عرض الكل", "Gis lépp"],
  "home.discover": ["Découvrir Dakar", "Discover Dakar", "Descubre Dakar", "اكتشف داكار", "Xam Ndakaaru"],
  "home.explore": ["Explorer", "Explore", "Explorar", "استكشف", "Wër"],
  "home.upcoming": ["À VENIR", "UPCOMING", "PRÓXIMO", "قادم", "DI ÑËW"],
  "home.addAgendaAria": ["Ajouter à l'agenda", "Add to agenda", "Añadir a la agenda", "أضف إلى الأجندة", "Yokk ci ajanda"],
  "home.notifOnAria": ["Activer les notifications", "Turn notifications on", "Activar notificaciones", "تفعيل الإشعارات", "Taal yëgle yi"],
  "home.notifOffAria": ["Désactiver les notifications", "Turn notifications off", "Desactivar notificaciones", "إيقاف الإشعارات", "Fey yëgle yi"],

  /* Filtres de la carte — */
  "filter.competition": ["Compétitions", "Competitions", "Competición", "المنافسات", "Jonganté yi"],
  "filter.activite": ["Activités", "Things to do", "Qué hacer", "أنشطة", "Yëngu-yëngu"],
  "filter.festivite": ["Festivités", "Festivities", "Fiestas", "احتفالات", "Xew yi"],
  "filter.tourisme": ["Tourisme", "Food & sights", "Turismo", "سياحة", "Tukki ak lekk"],

  /* Types de lieu / carte — */
  "poiType.venue": ["Site JOJ", "YOG venue", "Sede JOJ", "موقع الألعاب", "Bérab JOJ"],
  "poiType.transport": ["Transport", "Transit", "Transporte", "نقل", "Transport"],
  "poiType.food": ["Restauration", "Food", "Comida", "مطاعم", "Lekk"],
  "poiType.poi": ["À découvrir", "To discover", "Por descubrir", "للاكتشاف", "Li war a gis"],
  "map.go": ["S'y rendre", "Directions", "Cómo llegar", "الاتجاهات", "Yoon wi"],
  "map.agenda": ["Agenda", "Agenda", "Agenda", "الأجندة", "Ajanda"],
  "map.close": ["Fermer", "Close", "Cerrar", "إغلاق", "Tëj"],
  "map.myPos": ["Vous êtes ici", "You are here", "Estás aquí", "أنت هنا", "Fii nga nekk"],

  /* — Toasts — */
  "toast.added": ["Ajouté à mon agenda", "Added to my agenda", "Añadido a mi agenda", "أُضيف إلى أجندتي", "Yokk nañu ko ci sama ajanda"],
  "toast.removed": ["Retiré de mon agenda", "Removed from my agenda", "Quitado de mi agenda", "أُزيل من أجندتي", "Dindi nañu ko ci sama ajanda"],
  "toast.notifOn": ["Notifications activées", "Notifications on", "Notificaciones activadas", "الإشعارات مفعّلة", "Yëgle yi taal nañu"],
  "toast.notifOff": ["Notifications désactivées", "Notifications off", "Notificaciones desactivadas", "الإشعارات موقفة", "Yëgle yi fey nañu"],
  "toast.tickets": ["Billetterie bientôt disponible", "Ticketing coming soon", "Venta de entradas próximamente", "التذاكر متاحة قريباً", "Tiket yi di ñëw leegi"],

  /* — Programme — */
  "prog.title": ["Programme", "Schedule", "Programa", "البرنامج", "Prograam"],
  "prog.hint": ["Touchez une épreuve pour voir les détails.", "Tap an event to see details.", "Toca una prueba para ver los detalles.", "اضغط على منافسة لعرض التفاصيل.", "Bësal benn jonganté ngir gis li ci biir."],
  "prog.search": ["Rechercher…", "Search…", "Buscar…", "بحث…", "Seet…"],
  "prog.chooseDate": ["Choisir une date", "Pick a date", "Elegir fecha", "اختر تاريخاً", "Tann bés"],
  "prog.place": ["Lieu", "Venue", "Lugar", "المكان", "Bérab"],
  "prog.allPlaces": ["Tous les lieux", "All venues", "Todos los lugares", "كل الأماكن", "Bérab yépp"],
  "prog.allEvents": ["Toutes les épreuves", "All events", "Todas las pruebas", "كل المنافسات", "Jonganté yépp"],
  "prog.empty": ["Aucune séance pour ce filtre.", "No sessions for this filter.", "No hay sesiones para este filtro.", "لا توجد جلسات لهذا الفلتر.", "Amul dara ci filter bii."],
  "prog.weekdays": ["L,M,M,J,V,S,D", "M,T,W,T,F,S,S", "L,M,X,J,V,S,D", "ن,ث,ر,خ,ج,س,ح", "A,T,À,A,À,G,D"],
  "prog.filterDateAria": ["Filtrer par date", "Filter by date", "Filtrar por fecha", "تصفية حسب التاريخ", "Tann ci bés"],
  "prog.filterPlaceAria": ["Filtrer par lieu", "Filter by venue", "Filtrar por lugar", "تصفية حسب المكان", "Tann ci bérab"],

  /* — Jours / mois courts — */
  "day.Ven": ["Ven", "Fri", "Vie", "جمعة", "Àjj"],
  "day.Sam": ["Sam", "Sat", "Sáb", "سبت", "Gaa"],
  "day.Dim": ["Dim", "Sun", "Dom", "أحد", "Dib"],
  "day.Lun": ["Lun", "Mon", "Lun", "اثنين", "Alt"],
  "day.Mar": ["Mar", "Tue", "Mar", "ثلاثاء", "Tal"],
  "month.nov": ["nov", "Nov", "nov", "نوفمبر", "now"],

  /* — Agenda — */
  "ag.title": ["Mon agenda", "My agenda", "Mi agenda", "أجندتي", "Sama ajanda"],
  "ag.none": ["Aucune épreuve pour l'instant.", "No events yet.", "Aún no hay pruebas.", "لا توجد منافسات بعد.", "Amagul dara."],
  "ag.count": ["{n} épreuve(s) enregistrée(s).", "{n} event(s) saved.", "{n} prueba(s) guardada(s).", "{n} منافسة محفوظة.", "{n} jonganté yu ñu denc."],
  "ag.conflictTitle": ["Des épreuves se chevauchent", "Some events overlap", "Algunas pruebas se solapan", "بعض المنافسات متداخلة", "Ay jonganté dañoo dajaloo"],
  "ag.conflictBody": ["Certaines démarrent à moins de 45 min d'écart.", "Some start less than 45 min apart.", "Algunas empiezan con menos de 45 min de diferencia.", "بعضها يبدأ بفارق أقل من 45 دقيقة.", "Ñenn ñi dañuy tambali ci lu néew 45 simili."],
  "ag.conflict": ["Conflit", "Overlap", "Conflicto", "تعارض", "Dajaloo"],
  "ag.emptyTitle": ["Votre agenda est vide", "Your agenda is empty", "Tu agenda está vacía", "أجندتك فارغة", "Sa ajanda dafa neen"],
  "ag.emptyBody": ["Ajoutez des épreuves depuis le programme pour les retrouver ici.", "Add events from the schedule to find them here.", "Añade pruebas desde el programa para verlas aquí.", "أضف منافسات من البرنامج لتجدها هنا.", "Yokkal ay jonganté ci prograam bi ngir gis leen fii."],
  "ag.seeProg": ["Voir le programme", "View schedule", "Ver el programa", "عرض البرنامج", "Gis prograam bi"],
  "ag.depart": ["Départ conseillé {t}", "Suggested departure {t}", "Salida recomendada {t}", "المغادرة المقترحة {t}", "Jóg ci {t}"],
  "ag.before": ["~40 min avant", "~40 min ahead", "~40 min antes", "قبل ~40 دقيقة", "~40 simili balaa"],
  "ag.removeAria": ["Supprimer de l'agenda", "Remove from agenda", "Quitar de la agenda", "إزالة من الأجندة", "Dindi ko ci ajanda"],
  "ag.download": ["Télécharger l'agenda (PDF)", "Download agenda (PDF)", "Descargar agenda (PDF)", "تنزيل الأجندة (PDF)", "Yebbi ajanda (PDF)"],
  "ag.downloaded": ["Agenda téléchargé", "Agenda downloaded", "Agenda descargada", "تم تنزيل الأجندة", "Yebbi nañu ajanda bi"],

  /* — Mobilité — */
  "mo.title": ["Mobilité", "Mobility", "Movilidad", "التنقل", "Tukki"],
  "mo.subtitle": ["Le meilleur trajet vers votre prochaine épreuve.", "The best route to your next event.", "La mejor ruta hacia tu próxima prueba.", "أفضل طريق إلى منافستك القادمة.", "Yoon wi gën ngir dem ci sa jonganté."],
  "mo.from": ["Départ", "From", "Salida", "من", "Fu ngay jóge"],
  "mo.to": ["Arrivée", "To", "Llegada", "إلى", "Fu ngay dem"],
  "mo.myPos": ["Ma position · Plateau", "My location · Plateau", "Mi ubicación · Plateau", "موقعي · بلاتو", "Sama bérab · Plateau"],
  "mo.chooseDest": ["Choisir la destination", "Choose destination", "Elegir destino", "اختر الوجهة", "Tann fu ngay dem"],
  "mo.leave": ["Partez à {t} pour arriver 15 min avant le début.", "Leave at {t} to arrive 15 min before the start.", "Sal a las {t} para llegar 15 min antes del inicio.", "غادر في {t} لتصل قبل البداية بـ15 دقيقة.", "Jógal ci {t} ngir agsi 15 simili balaa tambali bi."],
  "mo.onSite": ["Sur place", "On site", "En el lugar", "في الموقع", "Ci bérab bi"],
  "mo.network": ["Se déplacer à Dakar", "Getting around Dakar", "Moverse por Dakar", "التنقل في داكار", "Tukki ci Ndakaaru"],
  "mo.tips": ["Bon à savoir", "Good to know", "Conviene saber", "معلومات مفيدة", "Li nga war a xam"],
  "mo.infos": ["Infos utiles", "Useful info", "Info útil", "معلومات مفيدة", "Xibaar yu am solo"],
  "mo.infosSub": ["Réseaux de transport & conseils visiteurs", "Transit networks & visitor tips", "Redes de transporte y consejos", "شبكات النقل ونصائح للزوار", "Réseau transport ak conseil yi"],
  "mo.next": ["Prochains passages", "Next departures", "Próximas salidas", "المغادرات القادمة", "Yi ciy topp"],
  "mo.free": ["Gratuit", "Free", "Gratis", "مجاني", "Amul fay"],
  "mode.walk": ["À pied", "Walking", "A pie", "سيراً", "Ci tànk"],
  "mode.walk.d": ["Itinéraire piéton", "Walking route", "Ruta peatonal", "مسار المشاة", "Yoonu doxantu"],
  "mode.walk.na": ["Trop loin à pied", "Too far to walk", "Demasiado lejos a pie", "بعيد جداً سيراً", "Sori na lool ci tànk"],
  "mode.bus": ["BRT + marche", "BRT + walk", "BRT + caminata", "حافلة BRT + مشي", "BRT ak dox"],
  "mode.bus.d": ["Bus Rapid Transit, ligne 1", "Bus Rapid Transit, line 1", "Bus Rapid Transit, línea 1", "الحافلة السريعة، الخط 1", "Bus Rapid Transit, liñ 1"],
  "mode.shuttle": ["Navette JOJ", "YOG shuttle", "Lanzadera JOJ", "حافلة الألعاب", "Navet JOJ"],
  "mode.shuttle.d": ["Navette officielle depuis Dakar", "Official shuttle from Dakar", "Lanzadera oficial desde Dakar", "حافلة رسمية من داكار", "Navet ofisel bu jóge Dakar"],
  "mode.taxi": ["Taxi · VTC", "Taxi · ride-hailing", "Taxi · VTC", "تاكسي · VTC", "Taksi · VTC"],
  "mode.taxi.d": ["Yango, Heetch, Wassa", "Yango, Heetch, Wassa", "Yango, Heetch, Wassa", "Yango · Heetch · Wassa", "Yango, Heetch, Wassa"],

  /* — Réseaux de transport (fiches) — */
  "transit.brt.n": ["BRT — ligne 1", "BRT — line 1", "BRT — línea 1", "BRT — الخط 1", "BRT — liñ 1"],
  "transit.brt.d": ["14 stations, Guédiawaye ↔ Petersen. Rapide et climatisé.", "14 stations, Guédiawaye ↔ Petersen. Fast and air-conditioned.", "14 estaciones, Guédiawaye ↔ Petersen. Rápido y climatizado.", "14 محطة، غيدياواي ↔ بيترسن. سريع ومكيّف.", "14 estasioŋ, Guédiawaye ↔ Petersen. Gaaw te sedd."],
  "transit.brt.f": ["Toutes les 10 min · 500 FCFA", "Every 10 min · 500 FCFA", "Cada 10 min · 500 FCFA", "كل 10 دقائق · 500 فرنك", "Ci 10 simili bu nekk · 500 FCFA"],
  "transit.ter.n": ["TER", "TER train", "Tren TER", "قطار TER", "Saxaar TER"],
  "transit.ter.d": ["Dakar ↔ Diamniadio ↔ AIBD. L'accès direct au pôle olympique.", "Dakar ↔ Diamniadio ↔ AIBD airport. Direct access to the Olympic hub.", "Dakar ↔ Diamniadio ↔ AIBD. Acceso directo al polo olímpico.", "داكار ↔ ديامنياديو ↔ المطار. وصول مباشر إلى القطب الأولمبي.", "Dakar ↔ Diamniadio ↔ AIBD. Yoon wu jëkk ci bérab olympique yi."],
  "transit.ter.f": ["Toutes les 20 min · dès 500 FCFA", "Every 20 min · from 500 FCFA", "Cada 20 min · desde 500 FCFA", "كل 20 دقيقة · من 500 فرنك", "Ci 20 simili bu nekk · dale 500 FCFA"],
  "transit.ddd.n": ["Navettes JOJ", "YOG shuttles", "Lanzaderas JOJ", "حافلات الألعاب", "Navet JOJ yi"],
  "transit.ddd.d": ["Gratuites vers tous les sites sur présentation d'un billet d'épreuve.", "Free to every venue on presentation of an event ticket.", "Gratis a todas las sedes presentando una entrada.", "مجانية إلى كل المواقع عند إبراز تذكرة منافسة.", "Amul fay ngir dem ci bérab yépp, soo amee tiket."],
  "transit.ddd.f": ["Jours de compétition · 7:00–00:00", "Competition days · 7:00–00:00", "Días de competición · 7:00–00:00", "أيام المنافسات · 7:00–00:00", "Bés yu jonganté · 7:00–00:00"],
  "transit.taxi.n": ["Taxis & VTC", "Taxis & ride-hailing", "Taxis y VTC", "تاكسي و VTC", "Taksi ak VTC"],
  "transit.taxi.d": ["Yango et Heetch fonctionnent partout ; course en ville ≈ 2 000–3 500 FCFA.", "Yango and Heetch work everywhere; city ride ≈ 2,000–3,500 FCFA.", "Yango y Heetch funcionan en todas partes; viaje urbano ≈ 2 000–3 500 FCFA.", "يعمل يانغو وهيتش في كل مكان؛ المشوار داخل المدينة ≈ 2000–3500 فرنك.", "Yango ak Heetch dañuy dox fu nekk ; ci biir dëkk ≈ 2 000–3 500 FCFA."],
  "transit.taxi.f": ["24h/24 · paiement cash ou app", "24/7 · cash or in-app payment", "24 h · pago en efectivo o app", "على مدار الساعة · نقداً أو عبر التطبيق", "Guddi ak bëccëg · fay ak xaalis walla app"],
  "transit.ferry.n": ["Chaloupe de Gorée", "Gorée ferry", "Ferry de Gorea", "عبّارة غوري", "Gaalu Gore"],
  "transit.ferry.d": ["Liaison Dakar ↔ île de Gorée en 20 min, départ du port.", "Dakar ↔ Gorée island in 20 min, from the harbour.", "Dakar ↔ isla de Gorea en 20 min, desde el puerto.", "داكار ↔ جزيرة غوري في 20 دقيقة انطلاقاً من الميناء.", "Dakar ↔ dunu Gore ci 20 simili, jóge ci waaf bi."],
  "transit.ferry.f": ["Dès 7:00 · ~5 200 FCFA A/R", "From 7:00 · ~5,200 FCFA return", "Desde 7:00 · ~5 200 FCFA i/v", "من 7:00 · نحو 5200 فرنك ذهاباً وإياباً", "Dale 7:00 · ~5 200 FCFA dem-dellu"],

  /* — Services sur site — */
  "svc.parking.t": ["Parkings", "Parking", "Aparcamiento", "مواقف السيارات", "Parking"],
  "svc.parking.d": ["P1 · P2 · dépose taxi-VTC", "P1 · P2 · taxi drop-off", "P1 · P2 · parada de taxi", "P1 · P2 · نقطة إنزال التاكسي", "P1 · P2 · fu taksi yi di teggi"],
  "svc.secours.t": ["Premiers secours", "First aid", "Primeros auxilios", "الإسعافات الأولية", "Ndimbal bu jëkk"],
  "svc.secours.d": ["Poste central · tribune Est", "Main post · East stand", "Puesto central · tribuna Este", "المركز الرئيسي · المدرج الشرقي", "Bérab bu mag · tribin Est"],
  "svc.pmr.t": ["Accès PMR", "Accessibility", "Accesibilidad", "دخول ذوي الإعاقة", "Yoon ngir ñi am solo"],
  "svc.pmr.d": ["Entrée A · ascenseurs tribunes", "Gate A · stand lifts", "Puerta A · ascensores", "البوابة A · مصاعد المدرجات", "Buntu A · asaŋseer yi"],

  /* — Conseils visiteurs — */
  "tip.pay.t": ["Payer en mobile money", "Mobile money payments", "Pago con dinero móvil", "الدفع عبر الهاتف", "Fay ak mobile money"],
  "tip.pay.b": ["Wave et Orange Money sont acceptés presque partout, même par les taxis.", "Wave and Orange Money are accepted almost everywhere, even by taxis.", "Wave y Orange Money se aceptan casi en todas partes, incluso en taxis.", "يُقبل Wave وOrange Money في كل مكان تقريباً، حتى في التاكسي.", "Wave ak Orange Money, fu nekk lañu koy nangu, sax ci taksi yi."],
  "tip.taxi.t": ["Taxis jaune-noir", "Yellow-black taxis", "Taxis amarillo-negro", "التاكسي الأصفر والأسود", "Taksi yu mboq ak ñuul"],
  "tip.taxi.b": ["Négociez le prix avant de monter — ou passez par une app VTC.", "Agree on the fare before getting in — or use a ride-hailing app.", "Negocia el precio antes de subir — o usa una app de VTC.", "اتفق على السعر قبل الركوب — أو استخدم تطبيق نقل.", "Waxtaanal njëg gi balaa nga dugg — walla nga jëfandikoo app VTC."],
  "tip.shuttle.t": ["Navettes gratuites", "Free shuttles", "Lanzaderas gratis", "حافلات مجانية", "Navet yu amul fay"],
  "tip.shuttle.b": ["Votre billet d'épreuve donne accès aux navettes officielles JOJ.", "Your event ticket gives access to the official YOG shuttles.", "Tu entrada da acceso a las lanzaderas oficiales JOJ.", "تذكرتك تتيح لك ركوب حافلات الألعاب الرسمية.", "Sa tiket day may nga dugg ci navet ofisel JOJ yi."],

  /* — Profil — */
  "pr.title": ["Profil", "Profile", "Perfil", "الملف الشخصي", "Profil"],
  "pr.lang": ["Langue", "Language", "Idioma", "اللغة", "Làkk"],
  "pr.tickets": ["Mes billets", "My tickets", "Mis entradas", "تذاكري", "Sama tiket yi"],
  "pr.notifs": ["Notifications", "Notifications", "Notificaciones", "الإشعارات", "Yëgle yi"],
  "pr.interests": ["Centres d'intérêt", "Interests", "Intereses", "الاهتمامات", "Li nga bëgg"],
  "pr.visitor": ["Visiteuse ·  Sénégal", "Visitor ·  Senegal", "Visitante ·  Senegal", "زائرة ·  السنغال", "Gan ·  Senegaal"],
  "pr.logout": ["Se déconnecter", "Log out", "Cerrar sesión", "تسجيل الخروج", "Génn"],
  "pr.offline": ["Mode hors-ligne", "Offline mode", "Modo sin conexión", "وضع عدم الاتصال", "Bu amul internet"],
  "pr.help": ["Aide & assistance", "Help & support", "Ayuda y asistencia", "المساعدة والدعم", "Ndimbal"],
  "notif.h1.t": ["1 heure avant", "1 hour before", "1 hora antes", "قبل ساعة", "1 waxtu balaa"],
  "notif.h1.s": ["Le temps de se préparer", "Time to get ready", "Tiempo para prepararse", "وقت للاستعداد", "Ngir waajal sa bopp"],
  "notif.m30.t": ["30 minutes avant", "30 minutes before", "30 minutos antes", "قبل 30 دقيقة", "30 simili balaa"],
  "notif.m30.s": ["Dernier rappel + départ conseillé", "Last reminder + suggested departure", "Último aviso + salida recomendada", "تذكير أخير + موعد المغادرة", "Fàttali bu mujj + waxtu jóg"],
  "notif.recap.t": ["Récap quotidien", "Daily recap", "Resumen diario", "ملخص يومي", "Xibaar bés bu nekk"],
  "notif.recap.s": ["Chaque matin à 7:30", "Every morning at 7:30", "Cada mañana a las 7:30", "كل صباح في 7:30", "Suba bu nekk ci 7:30"],

  /* — Sports (centres d'intérêt) — */
  "sport.nat": ["Natation", "Swimming", "Natación", "سباحة", "Féey"],
  "sport.ath": ["Athlétisme", "Athletics", "Atletismo", "ألعاب القوى", "Daw"],
  "sport.basket": ["Basket 3×3", "3×3 Basketball", "Baloncesto 3×3", "كرة السلة 3×3", "Basket 3×3"],
  "sport.judo": ["Judo", "Judo", "Judo", "جودو", "Judo"],
  "sport.lutte": ["Lutte", "Wrestling", "Lucha", "مصارعة", "Làmb"],

  /* — Découvrir (catégories) — */
  "cat.patrimoine": ["Patrimoine", "Heritage", "Patrimonio", "تراث", "Cosaan"],
  "cat.nature": ["Nature", "Nature", "Naturaleza", "طبيعة", "Àdduna"],
  "cat.culture": ["Culture", "Culture", "Cultura", "ثقافة", "Aada"],
  "cat.panorama": ["Panorama", "Panorama", "Panorama", "إطلالة", "Gis-gis"],

  /* — AYO — */
  "ayo.online": ["En ligne", "Online", "En línea", "متصل", "Ci liñ bi"],
  "ayo.write": ["Écrivez à AYO…", "Write to AYO…", "Escribe a AYO…", "اكتب إلى أيو…", "Bindal AYO…"],
  "ayo.backAria": ["Retour", "Back", "Volver", "رجوع", "Dellu"],
  "ayo.sendAria": ["Envoyer", "Send", "Enviar", "إرسال", "Yónnee"],

  /* — Détail épreuve — */
  "ev.inAgenda": ["Dans mon agenda", "In my agenda", "En mi agenda", "في أجندتي", "Ci sama ajanda"],
  "ev.add": ["Ajouter à mon agenda", "Add to my agenda", "Añadir a mi agenda", "أضف إلى أجندتي", "Yokk ci sama ajanda"],
  "ev.tickets": ["Billets", "Tickets", "Entradas", "تذاكر", "Tiket"],
  "ev.startlist": ["Liste de départ", "Start list", "Lista de salida", "قائمة الانطلاق", "Limu tambali"],
  "ev.live": ["EN DIRECT", "LIVE", "EN DIRECTO", "مباشر", "CI SAA SI"],

  /* — Langue — */
  "lang.choose": ["Choisir la langue", "Choose language", "Elegir idioma", "اختر اللغة", "Tann làkk"],
} satisfies Record<string, Entry>;

export type TrKey = keyof typeof D;

export function tr(lang: LangId, key: TrKey, vars?: Record<string, string | number>): string {
  const entry = D[key];
  let s = entry ? entry[ORDER.indexOf(lang)] || entry[0] : (key as string);
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}

export const isRTLLang = (lang: LangId) => lang === "AR";
