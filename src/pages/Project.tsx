import { useEffect } from "react"
import { SmoothScrolling } from "./Home"

export default function Project() {
  useEffect(() => {
    SmoothScrolling("root")
  }, [])
  return (<div id="projectDetails">
    <section className="py-10 md:py-20 lg:p-32">
      <div className="container px-5 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-10 text-gray-500">
            Le projet AQ54
          </h2>
          <li className="flex mb-4 items-center">
            <span className="flex-shrink-0 flex mr-4 items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-gray-50 font-bold font-heading">
              1
            </span>
            <h3 className="text-2xl font-bold">
              Une ambition globale
            </h3>
          </li>
          <p className="mb-6 p-3 bg-stone-100">
            L’objectif du projet AQ54 est de déployer un réseau de capteurs de qualité de l’air dans Abidjan suffisant pour obtenir une
            véritable cartographie de la qualité de l’air dans la ville. Les données collectées seront traitées, analysées et diffusées
            aux décideurs, aux organisations non-gouvernementales, aux entreprises et aux citoyens de manière ouverte via une plateforme dédiée.
            Combler le manque d’information constitue la première étape, cruciale, dans la lutte contre la pollution de l’air.
          </p>
          <p className="mb-6">
            Pour faire face à la pollution de l’air et à ses dangers, data354 a mis au point le projet AQ54. L’objectif du projet : déployer un
            réseau de capteurs de qualité de l’air à travers toute la ville d’Abidjan, en nombre suffisant pour mettre au point une réelle cartographie
            de la pollution de l’air dans la ville. Notre plus-value : gérer efficacement la collecte des données qui proviendront des capteurs, les analyser,
            les afficher et les partager de manière ouverte et en temps réel, avec tous les acteurs concernés : les politiques et législateurs, entreprises,
            organisations non-gouvernementales, et bien sûr les citoyens. De plus en plus d’autres villes africaines (Nairobi, Accra, Addis Abbaba…) se dotent
            de tels réseaux de capteurs. Le but de ce projet, c’est de doter Abidjan d’une infrastructure moderne pour piloter sa qualité d’air - comme la ville
            a pu s’y engager dans le cadre du C40 Cities [1]. Nous sommes convaincus que cela permettra d’accélérer non seulement la prise de conscience, mais
            aussi l’engagement citoyen, privé et public, en termes d’actions, de mesures et de législations, dans la lutte contre la pollution de l’air.
          </p>

          <li className="flex mb-4 items-center">
            <span className="flex-shrink-0 flex mr-4 items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-gray-50 font-bold font-heading">
              2
            </span>
            <h3 className="text-2xl font-bold">
              Agir sans attendre : Lancement de notre projet pilote :
            </h3>
          </li>
          <p className="mb-6 p-3 bg-stone-100">
            Dans le cadre du projet AQ54, nous avons lancés sur fonds propre une étude pilote avec l’installation de deux capteurs
            au début du mois de mai 2023. Les données collectées seront comparées pour étudier l’impact du bitumage de route sur
            la pollution aérienne. Cette phase pilote a aussi permis le développement d’une plateforme de visualisation et de
            diffusion des données issues des capteurs.
          </p>
          <p className="mb-6">
            Un projet de grande envergure nécessite des fonds, surtout pour être pérenne et porter des bénéfices durables.
            Pour prendre action rapidement, data354 a lancé sur fonds propres une phase pilote du projet. Deux capteurs,
            prêtés par notre partenaire AirQino ont été installé en ville, où ils collectent des données de qualité de
            l’air pendant trois mois au moins. Pour montrer l’intérêt des mesures dans la lutte contre la pollution,
            nous avons choisi avec soin les deux emplacements, pour estimer l’intérêt d’une mesure de lutte à bas coût (relatif),
            le goudronnage de route. Ce projet pilote s’accompagne aussi du développement d’une plateforme de visualisation des données,
            complètement gratuite et libre d’accès. Il donnera également lieu à un rapport constitué des conclusions tirées de l’analyse
            des données sur la période de collecte.
          </p>
        </div>
      </div>
    </section>
  </div>)
}