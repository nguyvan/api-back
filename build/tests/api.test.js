import request from "supertest";
import main from "../index.js";
describe("Test TicTacTrip APIs", () => {
    it("GET /", async () => {
        const result = await request(main.app).get("/");
        expect(result.text).toEqual("Welcome to API Justify text 👋");
        expect(result.statusCode).toEqual(200);
    });
    it("POST /api/signup", async () => {
        const result = await request(main.app)
            .post("/api/signup")
            .send({
            "email": "nguyvan@mail.me",
            "password": "123456"
        });
        expect(result.text).toEqual("Welcome to API Justify text, 👋");
        expect(result.statusCode).toEqual(200);
    });
    it("POST /api/token", async () => {
        const result = await request(main.app)
            .post("/api/token")
            .send({
            "email": "nguyvan@mail.me",
            "password": "123456"
        });
        expect(result.text).toEqual("User logged in ✅");
        expect(result.statusCode).toEqual(200);
    });
    it("POST /api/justify", async () => {
        const txt = 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint.\nCette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé.\n Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.';
        const output = 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,\nmes  yeux  se  fermaient  si  vite  que  je n’avais pas le temps de me dire: «Je\nm’endors»  Et, une demi-heure après, la pensée qu’il était temps de chercher le\nsommeil  m’éveillait;  je  voulais poser le volume que je croyais avoir dans les\nmains  et  souffler  ma  lumière;  je  n’avais pas cessé en dormant de faire des\nréflexions  sur  ce  que  je venais de lire, mais ces réflexions avaient pris un\ntour  un  peu  particulier;  il me semblait que j’étais moi-même ce dont parlait\nl’ouvrage:   une  église,  un  quatuor,  la  rivalité  de  François  Ier  et  de\nCharles-Quint.                                                                  \nCette  croyance  survivait  pendant  quelques  secondes  à  mon  réveil; elle ne\nchoquait  pas  ma  raison,  mais  pesait  comme des écailles sur mes yeux et les\nempêchait de se rendre compte que le bougeoir n’était plus allumé.              \n  Puis  elle commençait à me devenir inintelligible, comme après la métempsycose\nles  pensées  d’une existence antérieure; le sujet du livre se détachait de moi,\nj’étais  libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais\nbien  étonné de trouver autour de moi une obscurité, douce et reposante pour mes\nyeux,  mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme\nune  chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me\ndemandais  quelle  heure  il  pouvait être; j’entendais le sifflement des trains\nqui,  plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant\nles  distances,  me décrivait l’étendue de la campagne déserte où le voyageur se\nhâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans\nson  souvenir  par  l’excitation  qu’il  doit  à des lieux nouveaux, à des actes\ninaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le\nsuivent encore dans le silence de la nuit, à la douceur prochaine du retour.    ';
        const result = await request(main.app)
            .post("/api/justify")
            .send(txt);
        let new_limit = main.mainDB.getLimit("nguyvan@mail.me");
        expect(result.text).toEqual(output);
        expect(result.statusCode).toEqual(200);
        expect(80000 - txt.length).toEqual(new_limit);
    });
    afterAll(() => {
        main.mainDB.removeUser("nguyvan@mail.me");
    });
});
