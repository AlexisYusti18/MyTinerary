const cities=[
    {
        name:"Berlin",
        country:"Germany",
        image:"https://images.unsplash.com/photo-1587330979470-3595ac045ab0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        imagebanner: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/200px-Flag_of_Germany.svg.png",
        currency:"Euro",
        language:"German",
        description:"Berlin, the capital city of Germany, is renowned for its exceptional range of landmarks, vibrant cultural scene and way of life that's somehow all go yet relaxed. In fact, the city is best known for its striking contrasts. Historical buildings stand alongside modern architecture as the past and present intermingle."
    },
    {
        name:"Dhërmi",
        country:' Albania',
        image:"https://images.unsplash.com/photo-1595190588814-ae94398addf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        imagebanner: "https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg",
        currency:"Albanian lek",
        language:"Albanian",
        description:"A small spa town, Dhermi has a coastline with both wild and very touristy areas, you choose! The narrow streets and stone houses are the charm of this quiet and pleasant town. Nestled on a hillside, Dhermi is a most bewitching stopover on a trip to Albania."
    },
    {
        name:"Moscow",
        country:'Russia',
        image:"https://images.unsplash.com/photo-1523509433743-6f42a58221df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80",
        imagebanner: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/200px-Flag_of_Russia.svg.png",
        currency:"Russian ruble",
        language:"Russian",
        description:"In this capital, everyone can find leisure activities that suit their tastes. There is always something to see and visit in Moscow throughout the year, such as exhibitions, concerts or admire the architecture of its streets while we take a walk."
    },
    {
        name:"Hallstat",
        country:'Austria',
        image:"https://images.unsplash.com/photo-1597086831879-756db15e81d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        imagebanner: "https://www.lifeder.com/wp-content/uploads/2017/08/bandera-austria.jpg",
        currency:"Euro",
        language:"German",
        description:"Hallstatt is a town located on the west shore of Lake Hallstatt, in the mountainous region of Salzkammergut, Austria. There are alpine houses from the 16th century and alleys with cafes and shops. A funicular connects it to Salzwelten, a former salt mine with an underground salt lake and a viewpoint over the lake. To the west, a trail leads to the Echern valley, which has glacial caves and the Waldbachstrub waterfall."
    },
    {
        name:"Brussels",
        country:" Belgium",
        image:"https://images.unsplash.com/photo-1526997237335-45a11b46ecb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80",
        imagebanner: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Belgium_%28civil%29.svg/1200px-Flag_of_Belgium_%28civil%29.svg.png",
        currency:"Euro",
        language:"Dutch, French, German",
        description:"Brussels is a city with a multitude of museums, some of them the best in Europe in their subject matter. This is the case of the army museum or the museum of musical instruments. Also in the center of the city is the Magritte Museum, dedicated to this great Belgian surrealist painter that is well worth a visit."
    },
    {
        name:"London",
        country:'England',
        image:"https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        imagebanner: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/200px-Flag_of_England.svg.png",
        currency:"Pound sterling",
        language:"English",
        description:"London is the capital of the United Kingdom, the city has an air of grandeur, as it is one of the most important financial centers in Europe, not to mention being the home of one of the most important aristocratic families in the world, not because of its power but by popularity. The English royal family gives a special touch to the capital, as do the many museums in the city, which are considered to be very complete and well organized."
    },
    {
        name:"Porto",
        country:'Portugal',
        image:"https://images.unsplash.com/photo-1569959220744-ff553533f492?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1164&q=80",
        imagebanner: "https://www.lifeder.com/wp-content/uploads/2019/11/PortugalActual.png",
        currency:"Euro",
        language:"Portuguese",
        description:"Known for its bridges over the Douro River and for its famous wine, Porto is a small city that is easily covered in a weekend and that has nothing to envy its neighbor Lisbon. Strolling through the Ribeira at sunset, getting lost in the Bolhao Market, climbing the Clérigos Tower, watching the sunset from the Luis I bridge, eating a francesinha or a Bacalhau a Brás or having a glass of wine in one of the the Vila Nova de Gaia wineries are just some of the many things to do in Porto that we are sure will be some of the reasons to visit the city."
    },
    {
        name:"Visovac",
        country:'Croatia',
        image:"https://images.unsplash.com/photo-1554585343-acd99e31977b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        imagebanner: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",
        currency:"Croatian kuna",
        language:"Croatian",
        description:"It is a natural park declared in 1985, which covers about 100 square kilometers around the Krka River and has up to 7 waterfalls. In addition to its obvious natural value, it has monasteries, churches, remains of Roman buildings... and many other examples that also demonstrate its cultural value. The most advisable thing is to go early in the morning and spend the whole day there to make the most of the park, there is plenty to visit. There are even people who stay to sleep in some lodging near the park and spend more than one or two days exploring it. That is everyone's decision!"
    },
    {
        name:"Sevilla",
        country:'Spain',
        image:"https://images.unsplash.com/photo-1559564477-6e8582270002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        imagebanner: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png",
        currency:"Euro",
        language:"Spanish",
        description:"Everyone knows that Seville is one of the most beautiful cities in Spain. Its climate, the joy of its people and its art, its monuments or its gastronomy, make it the fourth largest city in Spain in population, one of the most visited places by national and international tourism."
    },
    {
        name:"Dinan",
        country:'France',
        image:"https://images.unsplash.com/photo-1473951574080-01fe45ec8643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1204&q=80",
        imagebanner: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/270px-Flag_of_France.svg.png",
        currency:"Euro",
        language:"French",
        description:"Rising 75 meters above the banks of the River Rance is the hill of Dinan, where 12th-century walls jealously guard one of the most beautiful medieval towns in French Brittany. The castle, the cobbled streets, the half-timbered houses and its heritage make this idyllic city a delight to stroll through at a leisurely pace. Here I help you organize your visit and tell you what to see in Dinan."
    },
    {
        name:"Athens",
        country:'Greece',
        image:"https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        imagebanner: "https://www.sitographics.com/enciclog/banderas/europa/image_2012/Grecia.gif",
        currency:"Euro",
        language:"Greek",
        description:"The city is a place chosen by thousands of tourists a year who enjoy its culture, its museums, its spectacular views, its neighborhoods, its gastronomy and traditions. As it is a fascinating place full of history, traveling to Athens is a plan that you have to do at some point in your life."
    },
    {
        name:"Italy",
        country:'Rome',
        image:"https://img.freepik.com/foto-gratis/coliseo-roma-italia-noche_31965-4991.jpg?w=2000",
        imagebanner: "https://s1.significados.com/foto/italy-162326-1280_sm.png",
        currency:"Euro",
        language:"Italian",
        description:"There are very few cities (if any) with a history as vivid as Rome, which is why it has earned the nickname of eternal città. It was the capital of the Roman Empire and remains of that time can still be seen in many corners, since it is the city with the highest concentration of historical and architectural assets in the world. It has endless things to visit: the Colosseum, the remains of the Aurelian wall, the Pantheon, the Arch of Constantine."
    }
];
export default cities