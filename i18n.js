(function () {
  const supported = ["en", "es", "de", "fr"];
  const messages = { en: {}, es: {}, de: {}, fr: {} };
  const textSources = new WeakMap();
  const attributeSources = new WeakMap();

  const baseMessages = {
    es: {
      "Language": "Idioma",
      "Private Defense Portal": "Portal privado de defensa",
      "ENCRYPTED RESEARCH WORKSPACE": "ESPACIO DE INVESTIGACIÓN CIFRADO",
      "Enter the portal passphrase. Decryption happens only in this browser; the passphrase is never sent to a server.": "Introduzca la contraseña del portal. El descifrado ocurre únicamente en este navegador; la contraseña nunca se envía a un servidor.",
      "Portal passphrase": "Contraseña del portal",
      "Show passphrase": "Mostrar contraseña",
      "Hide passphrase": "Ocultar contraseña",
      "Show or hide passphrase": "Mostrar u ocultar contraseña",
      "Unlock portal": "Desbloquear portal",
      "View public research profile": "Ver perfil público de investigación",
      "Local security": "Seguridad local",
      "The key remains in memory until you lock or close this tab.": "La clave permanece en memoria hasta que bloquee o cierre esta pestaña.",
      "PRIVATE • ENCRYPTED • OFFLINE-CAPABLE": "PRIVADO • CIFRADO • DISPONIBLE SIN CONEXIÓN",
      "PUBLIC RESEARCH PROFILE": "PERFIL PÚBLICO DE INVESTIGACIÓN",
      "Selected information only": "Solo información seleccionada",
      "Private portal": "Portal privado",
      "FSS DEFENSE WORKSPACE": "ESPACIO DE DEFENSA FSS",
      "Defense Portal": "Portal de defensa",
      "Online": "En línea",
      "Offline": "Sin conexión",
      "Save offline": "Guardar sin conexión",
      "Available offline": "Disponible sin conexión",
      "Search all private content": "Buscar en todo el contenido privado",
      "Lock portal": "Bloquear portal",
      "Portal sections": "Secciones del portal",
      "Mobile portal sections": "Secciones móviles del portal",
      "Overview": "Resumen",
      "Presentation": "Presentación",
      "Architecture": "Arquitectura",
      "Methods": "Métodos",
      "Results": "Resultados",
      "Committee Q&A": "Preguntas del comité",
      "Field plan": "Plan de campo",
      "Library": "Biblioteca",
      "References": "Referencias",
      "Code tour": "Recorrido del código",
      "Resources": "Recursos",
      "Publication": "Publicación",
      "Home": "Inicio",
      "Present": "Presentar",
      "Sources": "Fuentes",
      "Code": "Código",
      "Files": "Archivos",
      "ENCRYPTED FULL-TEXT INDEX": "ÍNDICE DE TEXTO COMPLETO CIFRADO",
      "Search the complete research workspace": "Buscar en todo el espacio de investigación",
      "Close search": "Cerrar búsqueda",
      "Search files, code, data, and dissertation text": "Buscar archivos, código, datos y texto de la disertación",
      "Enter a filename, concept, statistic, platform, or phrase...": "Introduzca un archivo, concepto, estadística, plataforma o frase...",
      "Search result types": "Tipos de resultados",
      "Loading encrypted index...": "Cargando índice cifrado...",
      "Toggle speaker notes": "Mostrar u ocultar notas del expositor",
      "Enter fullscreen": "Entrar en pantalla completa",
      "Exit fullscreen": "Salir de pantalla completa",
      "Exit presentation": "Salir de la presentación",
      "Previous slide": "Diapositiva anterior",
      "Next slide": "Diapositiva siguiente",
      "Slide progress": "Progreso de diapositivas",
      "Document": "Documento",
      "Close resource": "Cerrar recurso",
      "Resource view": "Vista del recurso",
      "Formatted": "Formato",
      "Source": "Fuente",
      "Copy": "Copiar",
      "Decrypted document viewer": "Visor de documentos descifrados",
      "Enter the portal passphrase.": "Introduzca la contraseña del portal.",
      "Decrypting…": "Descifrando…",
      "Access could not be completed. Check the passphrase and internet connection, then try again.": "No se pudo completar el acceso. Revise la contraseña y la conexión a Internet e inténtelo de nuevo.",
      "Public Research Profile": "Perfil público de investigación",
      "RESEARCH PROFILE": "PERFIL DE INVESTIGACIÓN",
      "DOCTORAL RESEARCH": "INVESTIGACIÓN DOCTORAL",
      "Cloud-only": "Solo nube",
      "Distributed": "Distribuido"
    },
    de: {
      "Language": "Sprache",
      "Private Defense Portal": "Privates Dissertationsportal",
      "ENCRYPTED RESEARCH WORKSPACE": "VERSCHLÜSSELTER FORSCHUNGSBEREICH",
      "Enter the portal passphrase. Decryption happens only in this browser; the passphrase is never sent to a server.": "Geben Sie die Portal-Passphrase ein. Die Entschlüsselung erfolgt nur in diesem Browser; die Passphrase wird niemals an einen Server gesendet.",
      "Portal passphrase": "Portal-Passphrase",
      "Show passphrase": "Passphrase anzeigen",
      "Hide passphrase": "Passphrase ausblenden",
      "Show or hide passphrase": "Passphrase anzeigen oder ausblenden",
      "Unlock portal": "Portal entsperren",
      "View public research profile": "Öffentliches Forschungsprofil anzeigen",
      "Local security": "Lokale Sicherheit",
      "The key remains in memory until you lock or close this tab.": "Der Schlüssel bleibt im Speicher, bis Sie das Portal sperren oder diese Registerkarte schließen.",
      "PRIVATE • ENCRYPTED • OFFLINE-CAPABLE": "PRIVAT • VERSCHLÜSSELT • OFFLINE VERFÜGBAR",
      "PUBLIC RESEARCH PROFILE": "ÖFFENTLICHES FORSCHUNGSPROFIL",
      "Selected information only": "Nur ausgewählte Informationen",
      "Private portal": "Privates Portal",
      "FSS DEFENSE WORKSPACE": "FSS-VERTEIDIGUNGSBEREICH",
      "Defense Portal": "Verteidigungsportal",
      "Online": "Online",
      "Offline": "Offline",
      "Save offline": "Offline speichern",
      "Available offline": "Offline verfügbar",
      "Search all private content": "Alle privaten Inhalte durchsuchen",
      "Lock portal": "Portal sperren",
      "Portal sections": "Portalbereiche",
      "Mobile portal sections": "Mobile Portalbereiche",
      "Overview": "Übersicht",
      "Presentation": "Präsentation",
      "Architecture": "Architektur",
      "Methods": "Methoden",
      "Results": "Ergebnisse",
      "Committee Q&A": "Fragen des Komitees",
      "Field plan": "Feldplan",
      "Library": "Bibliothek",
      "References": "Literaturverzeichnis",
      "Code tour": "Code-Rundgang",
      "Resources": "Ressourcen",
      "Publication": "Veröffentlichung",
      "Home": "Start",
      "Present": "Präsentieren",
      "Sources": "Quellen",
      "Code": "Code",
      "Files": "Dateien",
      "ENCRYPTED FULL-TEXT INDEX": "VERSCHLÜSSELTER VOLLTEXTINDEX",
      "Search the complete research workspace": "Den gesamten Forschungsbereich durchsuchen",
      "Close search": "Suche schließen",
      "Search files, code, data, and dissertation text": "Dateien, Code, Daten und Dissertationstext durchsuchen",
      "Enter a filename, concept, statistic, platform, or phrase...": "Dateiname, Begriff, Statistik, Plattform oder Ausdruck eingeben...",
      "Search result types": "Suchergebnistypen",
      "Loading encrypted index...": "Verschlüsselter Index wird geladen...",
      "Toggle speaker notes": "Sprechernotizen ein- oder ausblenden",
      "Enter fullscreen": "Vollbild öffnen",
      "Exit fullscreen": "Vollbild verlassen",
      "Exit presentation": "Präsentation beenden",
      "Previous slide": "Vorherige Folie",
      "Next slide": "Nächste Folie",
      "Slide progress": "Folienfortschritt",
      "Document": "Dokument",
      "Close resource": "Ressource schließen",
      "Resource view": "Ressourcenansicht",
      "Formatted": "Formatiert",
      "Source": "Quelle",
      "Copy": "Kopieren",
      "Decrypted document viewer": "Betrachter für entschlüsselte Dokumente",
      "Enter the portal passphrase.": "Geben Sie die Portal-Passphrase ein.",
      "Decrypting…": "Entschlüsselung…",
      "Access could not be completed. Check the passphrase and internet connection, then try again.": "Der Zugriff konnte nicht abgeschlossen werden. Prüfen Sie Passphrase und Internetverbindung und versuchen Sie es erneut.",
      "Public Research Profile": "Öffentliches Forschungsprofil",
      "RESEARCH PROFILE": "FORSCHUNGSPROFIL",
      "DOCTORAL RESEARCH": "DOKTORARBEIT",
      "Cloud-only": "Nur Cloud",
      "Distributed": "Verteilt"
    },
    fr: {
      "Language": "Langue",
      "Private Defense Portal": "Portail privé de soutenance",
      "ENCRYPTED RESEARCH WORKSPACE": "ESPACE DE RECHERCHE CHIFFRÉ",
      "Enter the portal passphrase. Decryption happens only in this browser; the passphrase is never sent to a server.": "Saisissez la phrase secrète du portail. Le déchiffrement s'effectue uniquement dans ce navigateur; la phrase secrète n'est jamais envoyée à un serveur.",
      "Portal passphrase": "Phrase secrète du portail",
      "Show passphrase": "Afficher la phrase secrète",
      "Hide passphrase": "Masquer la phrase secrète",
      "Show or hide passphrase": "Afficher ou masquer la phrase secrète",
      "Unlock portal": "Déverrouiller le portail",
      "View public research profile": "Voir le profil public de recherche",
      "Local security": "Sécurité locale",
      "The key remains in memory until you lock or close this tab.": "La clé reste en mémoire jusqu'au verrouillage du portail ou à la fermeture de cet onglet.",
      "PRIVATE • ENCRYPTED • OFFLINE-CAPABLE": "PRIVÉ • CHIFFRÉ • DISPONIBLE HORS LIGNE",
      "PUBLIC RESEARCH PROFILE": "PROFIL PUBLIC DE RECHERCHE",
      "Selected information only": "Informations sélectionnées uniquement",
      "Private portal": "Portail privé",
      "FSS DEFENSE WORKSPACE": "ESPACE DE SOUTENANCE FSS",
      "Defense Portal": "Portail de soutenance",
      "Online": "En ligne",
      "Offline": "Hors ligne",
      "Save offline": "Enregistrer hors ligne",
      "Available offline": "Disponible hors ligne",
      "Search all private content": "Rechercher dans tout le contenu privé",
      "Lock portal": "Verrouiller le portail",
      "Portal sections": "Sections du portail",
      "Mobile portal sections": "Sections mobiles du portail",
      "Overview": "Vue d'ensemble",
      "Presentation": "Présentation",
      "Architecture": "Architecture",
      "Methods": "Méthodes",
      "Results": "Résultats",
      "Committee Q&A": "Questions du comité",
      "Field plan": "Plan de terrain",
      "Library": "Bibliothèque",
      "References": "Références",
      "Code tour": "Parcours du code",
      "Resources": "Ressources",
      "Publication": "Publication",
      "Home": "Accueil",
      "Present": "Présenter",
      "Sources": "Sources",
      "Code": "Code",
      "Files": "Fichiers",
      "ENCRYPTED FULL-TEXT INDEX": "INDEX PLEIN TEXTE CHIFFRÉ",
      "Search the complete research workspace": "Rechercher dans tout l'espace de recherche",
      "Close search": "Fermer la recherche",
      "Search files, code, data, and dissertation text": "Rechercher des fichiers, du code, des données et le texte de la dissertation",
      "Enter a filename, concept, statistic, platform, or phrase...": "Saisissez un fichier, un concept, une statistique, une plateforme ou une expression...",
      "Search result types": "Types de résultats",
      "Loading encrypted index...": "Chargement de l'index chiffré...",
      "Toggle speaker notes": "Afficher ou masquer les notes de l'orateur",
      "Enter fullscreen": "Passer en plein écran",
      "Exit fullscreen": "Quitter le plein écran",
      "Exit presentation": "Quitter la présentation",
      "Previous slide": "Diapositive précédente",
      "Next slide": "Diapositive suivante",
      "Slide progress": "Progression des diapositives",
      "Document": "Document",
      "Close resource": "Fermer la ressource",
      "Resource view": "Affichage de la ressource",
      "Formatted": "Mis en forme",
      "Source": "Source",
      "Copy": "Copier",
      "Decrypted document viewer": "Visionneuse de documents déchiffrés",
      "Enter the portal passphrase.": "Saisissez la phrase secrète du portail.",
      "Decrypting…": "Déchiffrement…",
      "Access could not be completed. Check the passphrase and internet connection, then try again.": "L'accès n'a pas pu être établi. Vérifiez la phrase secrète et la connexion Internet, puis réessayez.",
      "Public Research Profile": "Profil public de recherche",
      "RESEARCH PROFILE": "PROFIL DE RECHERCHE",
      "DOCTORAL RESEARCH": "RECHERCHE DOCTORALE",
      "Cloud-only": "Cloud uniquement",
      "Distributed": "Distribué"
    }
  };

  Object.entries(baseMessages).forEach(([locale, values]) => Object.assign(messages[locale], values));

  function normalizeLocale(value) {
    const locale = String(value || "").toLowerCase().split("-")[0];
    return supported.includes(locale) ? locale : "en";
  }

  let locale = normalizeLocale(localStorage.getItem("defense-portal-language") || navigator.language);

  function translate(value, targetLocale = locale) {
    if (targetLocale === "en") return String(value ?? "");
    return messages[targetLocale]?.[String(value ?? "")] ?? String(value ?? "");
  }

  function translateTextNode(node) {
    if (!textSources.has(node)) textSources.set(node, node.nodeValue);
    const source = textSources.get(node);
    const match = source.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match || !match[2]) return;
    node.nodeValue = `${match[1]}${translate(match[2])}${match[3]}`;
  }

  function translateAttributes(element) {
    const names = ["aria-label", "title", "placeholder"];
    if (!attributeSources.has(element)) attributeSources.set(element, {});
    const sources = attributeSources.get(element);
    names.forEach((name) => {
      if (!element.hasAttribute(name)) return;
      if (!(name in sources)) sources[name] = element.getAttribute(name);
      element.setAttribute(name, translate(sources[name]));
    });
  }

  function apply(root = document) {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    root.querySelectorAll?.(".language-select").forEach((select) => { select.value = locale; });
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateTextNode);
    if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root);
    root.querySelectorAll?.("[aria-label], [title], [placeholder]").forEach(translateAttributes);
  }

  function setLocale(nextLocale) {
    const normalized = normalizeLocale(nextLocale);
    if (normalized === locale) return;
    locale = normalized;
    localStorage.setItem("defense-portal-language", locale);
    apply(document.body);
    window.dispatchEvent(new CustomEvent("portal-language-change", { detail: { locale } }));
  }

  function addMessages(nextMessages) {
    Object.entries(nextMessages || {}).forEach(([language, values]) => {
      if (messages[language]) Object.assign(messages[language], values);
    });
  }

  function bind(root = document) {
    root.querySelectorAll(".language-select").forEach((select) => {
      if (select.dataset.i18nBound) return;
      select.dataset.i18nBound = "true";
      select.value = locale;
      select.addEventListener("change", () => setLocale(select.value));
    });
    apply(root);
    if (!root.documentElement?.dataset.i18nObserverBound) {
      const marker = root.documentElement || document.documentElement;
      marker.dataset.i18nObserverBound = "true";
      const observer = new MutationObserver((records) => {
        records.forEach((record) => record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
          else if (node.nodeType === Node.ELEMENT_NODE) apply(node);
        }));
      });
      observer.observe(root.body || root, { childList: true, subtree: true });
    }
  }

  window.portalI18n = { addMessages, apply, bind, getLocale: () => locale, setLocale, t: translate };
})();
