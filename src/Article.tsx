import { IconAlertCircle } from "@tabler/icons-react";
import { useEffect } from "react";
import { SmoothScrolling } from "./Home";

export default function Article() {
  useEffect(() => {
    SmoothScrolling("article")
  }, [])
  return (<div id="article">
    <section className="py-10 md:py-20 lg:p-32">
      <div className="container px-5 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-10 text-gray-500">
            Comprendre la qualité de l'air
          </h2>
          <div className="p-3 bg-stone-100 my-5 flex items-center sm:space-x-5">
            <IconAlertCircle className="text-red-800 hidden sm:block" />
            <p> La qualité de l’air provient de la concentration en polluants </p>
          </div>
          <li className="flex mb-4 items-center">
            <span className="flex-shrink-0 flex mr-4 items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-gray-50 font-bold font-heading">
              1
            </span>
            <h3 className="text-2xl font-bold">
              Les polluants et leurs sources
            </h3>
          </li>
          <p className="mb-6">
            La pollution de l’air est un phénomène large qui désigne la présence en plus ou moins grande quantité, dans l’air respirable, de polluants atmosphériques. Ces polluants sont des espèces chimiques gazeuses, liquides ou solides de petite taille, de natures et d’origines variées, qui ont des effets différents sur la santé ou le climat. Parmi les polluants principaux, on retrouve :
          </p>
          <ul className="list-inside list-disc space-y-5 my-10 text-justify leading-loose">
            <li>La <b>matière particulaire</b> (ou particulate matter, PM en anglais) est composée de particules de petites tailles, inférieures à 10 µm pour les <b>PM10</b> (particules respirables), à 2.5 µm pour les <b>PM2.5</b> (particules fines), ou encore à 1 µm pour les <b>PM1</b> (particules ultrafines).
              Ces particules non spécifiques sont dangereuses car elles pénètrent les voies respiratoires, et pour les plus fines peuvent aussi passer les barrières vers la circulation sanguine et les organes. Ses composants principaux sont les nitrates, les sulfates, l’ammoniac, le chlorure de sodium, la poussière minérale,
              le carbone noir et l’eau. Les PM proviennent de nombreuses sources : le trafic, le soulèvement de poussière naturelle, les activités domestiques avec peu de ventilation, les activités industrielles, dans le désordre et pour n’en citer qu’une partie. Les effets sur la santé des PM sont <b>bien étudiés et établis</b>,
              c’est  <b>l’indicateur le plus observé pour analyser la qualité de l’air</b>.
            </li>
            <li>Le <b>monoxyde de carbone (CO)</b> est un gaz toxique, incolore, inodore, insipide, qui est un résidu de combustions incomplètes, et provient le plus souvent des véhicules motorisés. En intérieur, l’exposition à de hautes concentrations peut provoquer des intoxications et même être mortel.</li>
            <li>L’<b>ozone (O3)</b> est un gaz qu’on retrouve dans l’atmosphère (couche d’ozone) mais aussi au niveau du sol : il est produit par la réaction de gaz avec les rayonnements solaires. Il dérive notamment des oxydes d’azote, et une exposition excessive peut provoquer des problèmes respiratoires de différents ordres.</li>
            <li>Les <b>oxydes d’azote (NOx)</b> et particulièrement le <b>dioxyde d’azote (NO2)</b>, sont des gaz souvent libérés avec la combustion de combustibles qu’on retrouve dans les secteurs des transports et de l’industrie. Ces oxydes proviennent aussi de combustibles utilisés en intérieur via des fourneaux traditionnels ou des cuisinières au gaz.</li>
            <li>Le <b>dioxyde de soufre (SO2)</b> est un gaz incolore d’odeur désagréable, dégagé par la combustion de pétrole ou charbon par exemple. L’exposition excessive peut mener à des crises d’asthme aïgues.</li>
            <li>Parmi <b>d’autres polluants</b>, on peut citer le plomb (Pb), des hydrocarbures, le formaldehyde…</li>
          </ul>
          <p className="">
            Les polluants de l’air proviennent de nombreuses sources. On peut citer quelques-unes des plus importantes:
          </p>

          <ul className="list-inside list-disc space-y-5 my-10">
            <li>Le trafic des <b>véhicules à moteur</b>,</li>
            <li><b>Les activités industrielles</b>,</li>
            <li><b>L’incinération de déchets</b> (à l’air libre),</li>
            <li>Les <b>activités domestiques</b>, notamment la cuisine au charbon, bois ou gaz.</li>
          </ul>

          <p className="mb-6">
            La pollution de l’air est souvent divisée en pollution de <b>l’air ambient</b> (air extérieur) et pollution de <b>l’air intérieur</b> (dans les bâtiments, habitations et enceintes fermées), qui sert de source secondaire à la pollution de l’air extérieur. Il faut agir contre ces deux types de pollution qui posent d’importants problèmes pour la société, la santé, et le climat.
          </p>
          <li className="flex mb-4 items-center">
            <span className="flex-shrink-0 flex mr-4 items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-gray-50 font-bold font-heading">
              2
            </span>
            <h3 className="text-2xl font-bold">
              Impact sur la santé
            </h3>
          </li>
          <p className="mb-6">
            La pollution de l’air est avant tout un <b>enjeu de santé publique majeure</b>. En effet, les polluants ont un effet nocif sur la santé des
            populations qui sont exposées, à la fois sur le <b>court terme et le long terme</b>. Selon l’OMS, <b>99%</b> de la population mondiale respire un air
            trop pollué et dangereux : les effets cumulés de pollution de l’air ambiant et de pollution de l’air à l’intérieur des habitations sont liés à
            <b>7 millions de morts prématurées par an</b> (soit environ une sur huit). En Côte d’Ivoire, on estime ce nombre à 23 100. La pollution de l’air
            est le <b>2e facteur de risque de mortalité et handicap du pays</b>.
          </p>
          <p className="mb-6">
            Les polluants de petite taille en passant dans les voies respiratoires impactent presque tous les organes de différentes manières. La pollution de
            l’air peut causer, entre autres : accidents vasculaires cérébraux (AVC), cardiopathies ischémiques, cancers des poumons, pneumonie, bronchopneumopathie
            chronique obstructive… Elle est aussi particulièrement nocive pour certaines populations vulnérables, comme les femmes enceintes (risques liés à la
            grossesse tel qu’un poids faible du nouveau-né, diabète) ou les enfants en bas-âge, chez qui elle augmente le risque de pneumonie : parmi les décès
            attribués à la pollution de l’air en 2016, les enfants de moins de 5 ans en représentent 8%, alors que les enfants âgés entre 5 et 15 ans en représentent 1% [<a href="#source1" className="link">3</a>].
          </p>
          <p className="mb-6">
            L’impact de la pollution de l’air sur la santé est aussi économique, car ses conséquences ont un coût.
            L’Organisation de Coopération et de Développement Economique (OCDE) et la Banque Mondiale [<a href="#source1" className="link">4</a>] (<a className="link" href="https://www.oecd.org/env/the-economic-consequences-of-outdoor-air-pollution-9789264257474-en.htm" target="_blank">ici</a>)
            estiment qu’en 2060, les coûts annuels, pour l’économie globale, de la protection et de l’aide liées à ces décès prématurés pourraient atteindre environ 20 mille milliards de dollars.
          </p>
          <div id="source1" className="bg-stone-100 my-6 p-5 ">
            <p className="leading-10 font-bold">Source : </p>
            <p className="text-gray-400"> [3] United Nations Environment Program (UNEP) ; <a className="text-blue-500 hover:text-blue-600" href="https://www.unep.org/news-and-stories/blogpost/young-and-old-air-pollution-affects-most-vulnerable" target="_blank" rel="noopener noreferrer">Young and old, air pollution affects the most vulnerable ; 2018</a><br />
            </p>
            <p className="text-gray-400"> [4] Organisation de coopération et de développement économiques (OCDE) ; <a className="text-blue-500 hover:text-blue-600" href="https://www.oecd.org/env/the-economic-consequences-of-outdoor-air-pollution-9789264257474-en.htm" target="_blank" rel="noopener noreferrer">The Economic Consequences of Outdoor Air Pollution ; 2016</a><br />
            </p>
          </div>
          <li className="mb-6 flex items-center">
            <span className="flex-shrink-0 flex mr-4 items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-gray-50 font-bold font-heading">
              3
            </span>
            <h3 className="text-2xl font-bold">
              Impact climatique
            </h3>
          </li>
          <p className="mb-6">
            Si on parle plus souvent de l’impact néfaste sur la santé de la pollution de l’air, il ne faut pas négliger qu’elle a également des effets climatiques importants. En effet, lutter contre les polluants climatiques de courte durée (Short-Lived Climate Pollutants, ou SLCP) permettrait à la fois d’agir pour améliorer la santé publique et contre le changement climatique. Les SLCP sont des polluants atmosphériques qui restent moins longtemps dans l’atmosphère que le dioxyde de carbone (CO2), mais ont un <b>potentiel de réchauffement global (PRG)</b> important. Ce potentiel désigne le rapport du pouvoir réchauffant d’un polluant rapporté à celui de référence du CO2 à masse égale, pour une durée considérée. On estime le PRG du méthane (CH4) à 84 pour une période de 20 ans, celui du carbone suie (ou black carbon, BC, qui fait partie des PM2.5) entre 400 et 1500 (en fonction des durées et du type), et celui des hydrofluocarbures (HFCs) environ 3800 sur 20 ans. Même en faible concentration, la présence de ces polluants dans l’air a un effet de réchauffement local très important. La lutte contre le changement climatique étant une priorité pour l’ensemble des acteurs de la société aujourd’hui, la contribution de la pollution de l’air à ce phénomène ne doit pas être négligée.
            Ces polluants sont par définition, à courte durée de vie : ainsi, le carbone suie ne reste qu’environ deux semaines dans l’atmosphère. Cela veut dire que prendre et appliquer des mesures de réduction adéquates aujourd’hui aurait un effet bénéfique immédiat.
            Enfin, les polluants atmosphériques en trop forte concentration ont également des effets néfastes pour l’environnement : par exemple, l’ozone est toxique pour une grande partie des plantes et cultures, le carbone suie diminue la capacité des végétaux à séquestrer du CO2. Les cycles climatiques pourraient aussi être perturbés par une hausse de la concentration en aérosols par exemple, et cela mérite aussi l’attention des décideurs et de la communauté scientifique [<a href="#source2" className="link">7</a>].
          </p>
          <div id="source2" className="bg-stone-100 my-6 p-5 ">
            <p className="leading-10 font-bold">Source : </p>
            <p className="text-gray-400"> [5] Climate & Clean Air Coalition (CCAC) ; <a className="link" href="https://www.ccacoalition.org/en/content/short-lived-climate-pollutants-slcps" target="_blank" rel="noopener noreferrer">Short-Lived Climate Pollutants (SLCPs)</a><br />
            </p>
            <p className="text-gray-400"> [6] Environmental Protection Agency (EPA) ; <a className="link" href="https://www.epa.gov/ghgemissions/understanding-global-warming-potentials" target="_blank" rel="noopener noreferrer">Understanding Global Warming Potentials ; 2023</a><br />
            </p>
            <p className="text-gray-400"> [7] Evans, M. J., et al., ; <a className="link" href="https://zenodo.org/record/1476843" target="_blank" rel="noopener noreferrer">Policy-relevant findings of the DACCIWA project ; 2018 ; doi:10.5281/zenodo.1476843</a><br />
            </p>
          </div>
          <li className="mb-6 flex items-center">
            <span className="flex-shrink-0 flex mr-4 items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-gray-50 font-bold font-heading">
              4
            </span>
            <h3 className="text-2xl font-bold">
              L'open data sur la qualité de l'air
            </h3>
          </li>
          <p className="mb-6">
            En 2022, l’organisation OpenAQ a publié un rapport édifiant sur l’état d’ouverture des données de qualité de l’air dans le monde : 61% des pays ont des mesures de suivi de la qualité de l’air, à un certain niveau, et dans 39% des cas il n’y a pas d’éléments témoignant de l’existence de telles mesures (sur 197 pays considérés). 53% des pays seulement partagent des données ouvertes sur leur qualité d’air.

            La multiplication et la standardisation des données ouvertes sur la qualité de l’air constitue le premier et principal levier pour enclencher le changement et la lutte contre la pollution de l’air aux échelles locale, nationale et mondiale. L’étude la plus complète sur les causes de maladies, blessures et décès repose sur des données ouvertes de qualité de l’air : c’est le Global Burden of Disease (GBD), une ressource cruciale pour développer des politiques et mesures adaptées dans le monde [source GBD].

            L’analyse continue de la qualité de l’air et la diffusion de ces données permet d’accélérer la mise en place de régulations pour combattre la pollution aérienne, et dans certains cas elle a a été suivie par une réduction de cette pollution et des bénéfices de santé globale [<a href="#source3" className="link">10</a>].
          </p>
          <div id="source2" className="bg-stone-100 my-6 p-5 ">
            <p className="leading-10 font-bold">Source : </p>
            <p className="text-gray-400"> [8] OpenAQ ; <a className="link" href="https://documents.openaq.org/reports/Open+Air+Quality+Data+Global+Landscape+2022.pdf" target="_blank" rel="noopener noreferrer">Open Air Quality Data: The Global Landscape ; 2022 </a><br />
            </p>
            <p className="text-gray-400"> [9] Institute for Health Metrics and Evaluation (IHME) ; <a className="link" href="https://www.healthdata.org/gbd " target="_blank" rel="noopener noreferrer">Global Burden of Disease</a><br />
            </p>
            <p className="text-gray-400"> [10] Jha A, Nauze A. ; <a className="link" href="https://www.pnas.org/doi/10.1073/pnas.2201092119" target="_blank" rel="noopener noreferrer">US Embassy air-quality tweets led to global health benefits. Proc Natl Acad Sci U S A. 2022 Nov;119(44):e2201092119. doi: 10.1073/pnas.2201092119. Epub 2022 Oct 24. PMID: 36279451; PMCID: PMC9636956.</a><br />
            </p>
          </div>
        </div>
      </div>
    </section >
  </div >)
}