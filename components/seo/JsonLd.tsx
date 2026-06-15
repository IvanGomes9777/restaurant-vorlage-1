/* Rendert JSON-LD als <script>. Serverseitig gerendert (im initialen HTML),
   damit KI-Crawler ohne JS-Ausführung die Daten lesen können. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify ist hier sicher: nur kontrollierte Objektdaten, kein User-Input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
